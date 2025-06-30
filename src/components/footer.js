// src/components/Footer.js
export default function Footer() {
  return (
    <footer style={{
      padding: "1rem 2rem",
      background: "#f0f0f0",
      textAlign: "center",
      marginTop: "3rem",
      color: "#666"
    }}>
      © {new Date().getFullYear()} Eventify. All rights reserved.
    </footer>
  );
}
