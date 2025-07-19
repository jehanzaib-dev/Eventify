"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-[calc(100vh-8.5rem)]   /* account for navbar height if it's 4rem (h-16) */ overflow-hidden bg-gradient-to-b from-white via-indigo-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"
    >
      {/* Decorative blur blobs (optional, remove if you want cleaner) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-600/20" />
        <div className="absolute left-[15%] top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-pink-300/30 blur-3xl dark:bg-pink-500/20" />
        <div className="absolute right-[10%] bottom-10 h-60 w-60 rounded-full bg-violet-300/25 blur-3xl dark:bg-violet-600/20" />
      </div>

      {/* Hero Section */}
      <section
        className="
          mx-auto flex max-w-5xl flex-col items-center px-5 pt-16 pb-12
          text-center sm:px-8 md:pt-20 md:pb-16
        "
      >
        <h1
          className="
            text-3xl font-extrabold leading-tight tracking-tight
            text-gray-900 dark:text-white
            sm:text-4xl md:text-5xl
          "
        >
          Welcome to{" "}
          <span
            className="
              bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600
              bg-clip-text text-transparent
              dark:from-indigo-400 dark:via-violet-400 dark:to-pink-400
            "
          >
            Eventify
          </span>
        </h1>

        <p
          className="
            mt-5 max-w-2xl text-base sm:text-lg md:text-xl
            text-gray-600 dark:text-gray-300
          "
        >
          Discover and explore amazing events around the world — tailored for you.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/login" className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 active:scale-[0.97] dark:bg-indigo-500 dark:hover:bg-indigo-400">
            Login
          </Link>
          <Link 
          href="/signup" className="inline-flex items-center justify-center rounded-md border border-indigo-600 px-6 py-3 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500
            active:scale-[0.97] dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-400/10">
            Sign Up
            </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="
          mx-auto grid max-w-6xl gap-6 px-5 pb-20 sm:px-8
          md:grid-cols-3 md:gap-8
        "
      >
        <div
          className="group rounded-xl border border-gray-200 bg-white/70 p-6 
          shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-
          md dark:border-gray-700 dark:bg-gray-800/70"
          >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            🌍 Global Reach
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Browse events from over 7 countries with real-time updates.
          </p>
        </div>

        <div
          className="
            group rounded-xl border border-gray-200 bg-white/70 p-6 shadow-sm
            backdrop-blur transition hover:-translate-y-1 hover:shadow-md
            dark:border-gray-700 dark:bg-gray-800/70
          "
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            🎯 Personalized
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Set your country to get events that matter most to you.
          </p>
        </div>

        <div
          className="
            group rounded-xl border border-gray-200 bg-white/70 p-6 shadow-sm
            backdrop-blur transition hover:-translate-y-1 hover:shadow-md
            dark:border-gray-700 dark:bg-gray-800/70
          "
        >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              🚀 Fast & Easy
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Mock login and signup make exploring events a breeze.
            </p>
        </div>
      </section>
    </main>
  );
}
