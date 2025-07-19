"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Utility function to format date
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch (error) {
    return dateString; // fallback if parsing fails
  }
};

export default function EventCard({ event }) {
  const searchParams = useSearchParams();
  const country = searchParams.get("country") || "CA";

  return (
    <div
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-2xl border border-gray-200 bg-white/90
        shadow-sm ring-1 ring-gray-200/50
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        dark:border-gray-700 dark:bg-gray-800/80 dark:ring-gray-700
        focus-within:ring-2 focus-within:ring-indigo-500
      "
    >
      {/* Image */}
      {event.image ? (
        <div
          className="
            relative w-full overflow-hidden
            aspect-[16/9] bg-gray-100 dark:bg-gray-700
          "
        >
          <Image
            src={event.image}
            alt={event.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="
              object-cover transition-transform duration-500
              group-hover:scale-[1.05]
            "
            priority={false}
          />
          <div
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-t from-black/30 via-black/0 to-black/0
              opacity-0 transition-opacity duration-300
              group-hover:opacity-100
            "
          />
        </div>
      ) : (
        <div
          className="
            flex aspect-[16/9] w-full items-center justify-center
            bg-gradient-to-br from-indigo-100 to-indigo-200
            text-indigo-600 text-sm font-medium
            dark:from-indigo-900 dark:to-indigo-800 dark:text-indigo-300
          "
        >
          No Image
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 py-5">
        <h3
          className="
            line-clamp-2 text-lg font-semibold tracking-tight
            text-gray-900 dark:text-white
            transition-colors
            group-hover:text-indigo-600 dark:group-hover:text-indigo-400
          "
          title={event.name}
        >
          {event.name}
        </h3>

        <ul className="mt-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
          <li>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Date:
            </span>{" "}
            {formatDate(event.date)}
          </li>
          <li>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              City:
            </span>{" "}
            {event.city}
          </li>
          <li>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Venue:
            </span>{" "}
            {event.venue}
          </li>
        </ul>

        <div className="flex-1" />

        <div className="mt-4">
          <Link
            href={`/events/${event.id}?country=${country}`}
            aria-label={`View details for ${event.name}`}
            className="
              inline-flex items-center gap-1.5 rounded-lg
              bg-indigo-600 px-4 py-2 text-sm font-medium text-white
              shadow-sm transition
              hover:bg-indigo-700 hover:shadow
              active:translate-y-px active:bg-indigo-700
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500
              dark:bg-indigo-500 dark:hover:bg-indigo-400
            "
          >
            View Details
            <span
              className="
                translate-x-0 transition-transform duration-300
                group-hover:translate-x-0.5
              "
            >
              →
            </span>
          </Link>
        </div>
      </div>

      <span
        className="
          pointer-events-none absolute left-0 top-0 h-1 w-0
          bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600
          transition-all duration-500 group-hover:w-full
          dark:from-indigo-400 dark:via-violet-400 dark:to-pink-400
        "
      />
    </div>
  );
}
