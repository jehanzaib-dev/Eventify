// src/components/Navbar.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItemStyle = (href) => ({
    color: pathname === href ? "#00bfff" : "#fff",
    textDecoration: "none",
    fontWeight: pathname === href ? "bold" : "normal",
    borderBottom: pathname === href ? "2px solid #00bfff" : "none",
    paddingBottom: "4px",
  });

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#000",
        color: "#fff",
        padding: "2rem 2rem",
        fontSize:"1.1rem",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <span style={{ fontSize: "3rem", fontWeight: "bold", color: "#fff" }}>Eventify</span>
        </Link>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link href="/" style={navItemStyle("/")}>Home</Link>
          <Link href="/about" style={navItemStyle("/about")}>About</Link>
          <Link href="/contact" style={navItemStyle("/contact")}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}
