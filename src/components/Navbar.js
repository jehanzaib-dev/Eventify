"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();
    window.addEventListener("userChange", loadUser);

    return () => {
      window.removeEventListener("userChange", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        🎫 Eventify
      </Link>
      <div className={styles.links}>
        <Link href="/about" className={styles.link}>About</Link>
        <Link href="/contact" className={styles.link}>Contact
        </Link>

        {user ? (
          <>
            <span className={styles.userName}>Hi, {user.name.split(" ")[0]}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.loginButton}>Login</Link>
            <Link href="/signup" className={styles.link}>Signup</Link>
          </>
        )}
      </div>
      </div>
    </nav>
  );
}
