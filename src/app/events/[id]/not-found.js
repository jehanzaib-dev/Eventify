// src/app/events/[id]/not-found.js

import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: "3rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>404 — Event Not Found</h1>
      <p style={{ marginBottom: "2rem", color: "#555" }}>
        Sorry, the event you're looking for doesn't exist.
      </p>

      <Link
        href="/">
        <span style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        ← Back to Home
        </span>
      </Link>
    </main>
  );
}
