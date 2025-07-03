"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Signup.module.css";
import { findUserByEmail, addUser } from "@/utils/mockUsers";
import {toast} from "react-toastify";


export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    addUser(newUser);

    // Automatically log in the new user
    localStorage.setItem("user", JSON.stringify({ ...newUser, id: Date.now() }));
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
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
    </main>
  );
}
