"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
  onBackHref,
  backLabel = "← Back",
}) {
  const message =
    error?.message ||
    "Something went wrong. Please check your internet connection.";
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-6 text-center">
      <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
        ⚠️ Something went wrong
      </h2>
      <p
        className="text-gray-700 dark:text-gray-300 mb-6 max-w-md"
        aria-live="assertive"
      >
        {message}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {reset && (
          <button
            onClick={reset}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Try Again
          </button>
        )}
        {onBackHref && (
          <Link
            href={onBackHref}
            className="px-5 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition"
          >
            {backLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
