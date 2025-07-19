"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        404 — Page Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Sorry, we couldn’t find the page you were looking for.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 dark:bg-indigo-500 dark:hover:bg-indigo-400"
      >
        🏠 Go to Home
      </Link>
    </main>
  );
}
