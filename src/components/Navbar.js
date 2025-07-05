// components/Navbar.jsx
"use client";

import { Suspense } from "react";
import NavbarInner from "./NavbarInner";

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarInner />
    </Suspense>
  );
}
