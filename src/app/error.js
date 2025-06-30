// src/app/events/[id]/error.js

"use client"; // must be a client component

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Event page error:", error);
  }, [error]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>⚠️ Something went wrong</h2>
      <p style={{ color: "#555", marginBottom: "2rem" }}>
        {error?.message || "Unable to load this event. Please try again later."}
      </p>
      <button
        onClick={() => reset()}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Try Again
      </button>
       <Link
          href="/"
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "#444",
            color: "#fff",
            borderRadius: "6px",
            textDecoration: "none",
            display: "inline-block",
            lineHeight: "1.2rem",
          }}
        >
          🏠 Go to Home
        </Link>
    </div>
  );
}
