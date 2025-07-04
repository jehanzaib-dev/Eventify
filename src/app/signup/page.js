"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Signup.module.css";
import { findUserByEmail, addUser } from "@/utils/mockUsers";
import {toast} from "react-toastify";
import { Eye, EyeOff } from "lucide-react";



export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (findUserByEmail(email)) {
      setError("User with this email already exists");
      return;
    }
    if (!name || !email || !password) {
  toast.error("All fields are required");
  return;
  }

    const newUser = { name, email, password };
    const savedUser=addUser(newUser);
    localStorage.setItem("user", JSON.stringify(savedUser));
    toast.success("Account created! You can now log in.");

    window.dispatchEvent(new Event("userChange"));

    router.push("/");
  };

  return (
    <main className={styles.wrapper}>
    <div className={styles.card}>
      <h2 className={styles.heading}>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.passwordCntnr}>
        <input
          type={showPassword ? "text":"password"}
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeButton}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
    </main>
  );
}
