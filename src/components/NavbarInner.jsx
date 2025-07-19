"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function NavbarInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const country = searchParams.get("country") || "CA";

  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ---------- User Load (on mount) ---------- */
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch {}
  }, []);

  /* ---------- Sync User Across Tabs ---------- */
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("userChange", loadUser);
    return () => window.removeEventListener("userChange", loadUser);
  }, []);

  /* ---------- Theme Initialization ---------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  /* ---------- Toggle Theme ---------- */
  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDarkMode(isDark);
  };

  /* ---------- Logout ---------- */
  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    setMobileOpen(false);
    router.push("/");
  }, [router]);

  /* ---------- Helper: Active Link Classes ---------- */
  const navLinkClass = (href) => {
    const base =
      "relative font-medium text-sm md:text-[15px] transition-colors px-1 py-2";
    const active =
      "text-indigo-600 dark:text-indigo-400";
    const inactive =
      "text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400";
    return `${base} ${pathname === href ? active : inactive}`;
  };

  const underline = (href) =>
    pathname === href ? (
      <span className="absolute left-0 -bottom-0.5 h-0.5 w-full rounded bg-indigo-600 dark:bg-indigo-400" />
    ) : null;

  /* ---------- Navigation Links Data ---------- */
  const links = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className="
        sticky top-0 z-50
        border-b border-gray-200 dark:border-gray-800
        bg-white  dark:bg-gray-900/70 shadow-sm
        backdrop-blur supports-[backdrop-filter]:bg-white/60
        dark:supports-[backdrop-filter]:bg-gray-900/60
      "
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={user ? `/homepage?country=${country}` : "/"}
          className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400"
        >
          Eventify
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={navLinkClass(l.href)}>
              {l.label}
              {underline(l.href)}
            </Link>
          ))}

          {user ? (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Hi, <span className="font-semibold">{user.name?.split(" ")[0]}</span>
              </span>
              <button
                onClick={handleLogout}
                className="
                  inline-flex items-center rounded-md bg-rose-500 px-3 py-2 text-sm
                  font-medium text-white shadow-sm
                  hover:bg-rose-600 focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-indigo-500 transition-colors
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`
                  inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm
                  font-medium text-white shadow-sm hover:bg-indigo-700
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-indigo-500 transition-colors
                  ${pathname === "/login" ? "ring-2 ring-indigo-400 ring-offset-2 dark:ring-offset-gray-900" : ""}
                `}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`
                  inline-flex items-center rounded-md border border-indigo-600 px-3 py-2 text-sm
                  font-medium text-indigo-600 hover:bg-indigo-50
                  dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-400/10
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 transition-colors
                  ${pathname === "/signup" ? "bg-indigo-50 dark:bg-indigo-400/10" : ""}
                `}
              >
                Signup
              </Link>
            </>
          )}

          {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="
                ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md
                border border-gray-300 bg-white
                hover:bg-gray-100 text-xl
                dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500
                transition-colors
              "
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
        </div>

        {/* Mobile Right Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="
              inline-flex h-9 w-9 items-center justify-center rounded-md
              border border-gray-300 bg-white hover:bg-gray-100 text-xl
              dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500
              transition-colors
            "
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="
              inline-flex h-10 w-10 items-center justify-center rounded-md
              border border-gray-300 bg-white hover:bg-gray-100
              dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500
              transition-colors
            "
          >
            {/* Icon */}
            <span className="sr-only">Menu</span>
            {mobileOpen ? (
              /* X icon */
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger */
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Panel */}
      {mobileOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
          <div className="space-y-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  block rounded-md px-3 py-2 text-sm font-medium
                  ${pathname === l.href
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-600/15 dark:text-indigo-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"}
                `}
              >
                {l.label}
              </Link>
            ))}

            {user ? (
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
                  Hi, <span className="font-semibold">{user.name?.split(" ")[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="
                    mt-1 w-full rounded-md bg-rose-500 px-3 py-2 text-sm font-medium
                    text-white hover:bg-rose-600 transition-colors
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500
                  "
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className={`
                    block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white
                    hover:bg-indigo-700 transition-colors
                    ${pathname === "/login" ? "ring-2 ring-indigo-400 ring-offset-2 dark:ring-offset-gray-900" : ""}
                  `}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className={`
                    block w-full rounded-md border border-indigo-600 px-3 py-2 text-center text-sm font-medium
                    text-indigo-600 hover:bg-indigo-50
                    dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-400/10
                    transition-colors
                    ${pathname === "/signup" ? "bg-indigo-50 dark:bg-indigo-400/10" : ""}
                  `}
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
