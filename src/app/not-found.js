// src/app/not-found.js
import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: "4rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>404 — Page Not Found</h1>
      <p style={{ color: "#555", marginBottom: "2rem" }}>
        Sorry, we couldn’t find the page you were looking for.
      </p>

      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          borderRadius: "8px",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        🏠 Go to Home
      </Link>
    </main>
  );
}
