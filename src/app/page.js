// app/page.js

"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "./Landing.module.css";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className={styles.wrapper}>
        <section className={styles.hero}>
          <h1 className={styles.heading}>Welcome to <span>Eventify</span></h1>
          <p className={styles.tagline}>Discover and explore amazing events around the world — tailored for you.</p>
          <div className={styles.buttonGroup}>
            <Link href="/login" className={styles.button}>Login</Link>
            <Link href="/signup" className={styles.buttonSecondary}>Sign Up</Link>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureBox}>
            <h3>🌍 Global Reach</h3>
            <p>Browse events from over 7 countries with real-time updates.</p>
          </div>
          <div className={styles.featureBox}>
            <h3>🎯 Personalized</h3>
            <p>Set your country to get events that matter most to you.</p>
          </div>
          <div className={styles.featureBox}>
            <h3>🚀 Fast & Easy</h3>
            <p>Mock login and signup make exploring events a breeze.</p>
          </div>
        </section>
      </main>
    </>
  );
}
