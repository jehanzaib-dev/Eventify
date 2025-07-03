"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { findUserByEmail } from "@/utils/mockUsers";
import {toast} from "react-toastify";


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
      setError("Invalid email or password");
      return;
    }
    if (!email || !password) {
  toast.error("Please fill in all fields");
  return;
}

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Logged in successfully!");
    // Dispatch event to sync across tabs
    window.dispatchEvent(new Event("userChange"));

    router.push("/");
  };

  return (
    <main className={styles.wrapper}>
    <div className={styles.card}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleLogin}>
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
          Login
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
    </main>
  );
}
