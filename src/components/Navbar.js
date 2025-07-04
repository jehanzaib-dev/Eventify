"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import {toast} from "react-toastify";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Sync user across tabs
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();
    window.addEventListener("userChange", loadUser);
    return () => window.removeEventListener("userChange", loadUser);
  }, []);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Toggle dark/light theme
  const toggleTheme = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged Out successfully!");
    router.push("/");
  };

    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            🎫 Eventify
          </Link>

          <div className={styles.links}>
            <Link
              href="/about"
              className={`${styles.link} ${pathname === "/about" ? styles.active : ""}`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`${styles.link} ${pathname === "/contact" ? styles.active : ""}`}
            >
              Contact
            </Link>

            {user ? (
              <>
                <span className={styles.userName}>
                  Hi, {user.name.split(" ")[0]}
                </span>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`${styles.loginButton} ${pathname === "/login" ? styles.active : ""}`}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={`${styles.link} ${pathname === "/signup" ? styles.active : ""}`}
                >
                  Signup
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className={styles.themeToggle}>
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>
        </div>
      </nav>
    );
}
