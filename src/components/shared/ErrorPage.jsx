"use client";

import Link from "next/link";
import styles from "./ErrorPage.module.css";

export default function ErrorPage({ error, reset }) {
  return (
    <div className={styles.wrapper}>
      <h2>⚠️ Something went wrong</h2>
      <p className={styles.message}>
        {error?.message || "Unable to load events. Please check your internet connection."}
      </p>

      <button onClick={reset} className={styles.retryButton}>
        Try Again
      </button>
    </div>
  );
}
