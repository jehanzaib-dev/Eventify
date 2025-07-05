// components/shared/NotFoundPage.jsx
"use client";

import Link from "next/link";
import styles from "./NotFound.module.css";

export default function NotFoundPage() {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>404 — Page Not Found</h1>
      <p className={styles.message}>
        Sorry, we couldn’t find the page you were looking for.
      </p>
      <Link href="/" className={styles.homeLink}>
        🏠 Go to Home
      </Link>
    </main>
  );
}
