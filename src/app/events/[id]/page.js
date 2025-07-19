"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import fetchEventDetails from "@/utils/fetchEventDetails";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/ErrorPage";

// Utility date formatter (same style as EventCard)
const formatDate = (dateString) => {
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return dateString;
  }
};

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const country = searchParams.get("country") || "CA";

  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ------------ Auth Gate ------------ */
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        router.push("/login");
      }
    } catch {
      router.push("/login");
    }
  }, [router]);

  /* ------------ Fetch Event ------------ */
  const loadEvent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEventDetails(id);
      setEvent(data);
    } catch (err) {
      if (err.message === "failed to fetch") {
        setError(new Error("Network error. Please check your internet connection."));
      } else {
        setError(new Error(err.message || "Failed to load the event."));
      }
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  /* ------------ Loading State ------------ */
  if (loading) {
    return (
  <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-gradient-to-b from-white via-indigo-50 to-white px-4 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <Loading text="Loading event..." />
      </main>
    );
  }

  /* ------------ Error State ------------ */
  if (error) {
    return (
      <main
        className="
          flex min-h-[calc(100vh-4rem)] items-center justify-center
          bg-gradient-to-b from-white via-indigo-50 to-white px-4
          dark:from-gray-900 dark:via-gray-900 dark:to-gray-900
        "
      >
        <ErrorPage
          error={error}
          reset={loadEvent}
          onBackHref={`/homepage?country=${country}`}
          backLabel="← Back to Home"
        />
      </main>
    );
  }

  /* ------------ No Event (edge) ------------ */
  if (!event) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Event not found.
        </p>
      </main>
    );
  }

  /* ------------ Success ------------ */
  return (
    <main className="
      min-h-[calc(100vh-10rem)] bg-gray-400
        dark:bg-gray-900
        px-4 py-10
      ">
      <div
        className="
          mx-auto flex w-full max-w-4xl flex-col gap-8
          rounded-2xl border border-gray-50 bg-white/70 p-6
          shadow-sm backdrop-blur
          dark:border-gray-700 dark:bg-gray-800/70
          md:p-10
        "
      >
        {/* Title & Meta */}
        <div>
          <h1
            className="
              text-2xl font-bold tracking-tight text-gray-900
              dark:text-white sm:text-3xl
            "
          >
            {event.name}
          </h1>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
              <span>📍</span>
              <span>
                {event.city} — {event.venue}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
              <span>📅</span>
              <span>{formatDate(event.date)}</span>
            </div>
          </div>
        </div>

        {/* Image */}
        {event.image ? (
          <div
            className="
              relative aspect-[16/9] w-full overflow-hidden rounded-xl
              border border-gray-200 bg-gray-100
              dark:border-gray-700 dark:bg-gray-700
            "
          >
            <Image
              src={event.image}
              alt={event.name}
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
            <div
              className="
                pointer-events-none absolute inset-0
                bg-gradient-to-t from-black/25 via-black/0 to-black/0
                opacity-0 transition-opacity duration-300
                hover:opacity-100
              "
            />
          </div>
        ) : (
          <div
            className="
              flex aspect-[16/9] w-full items-center justify-center
              rounded-xl border border-dashed border-gray-300
              bg-gradient-to-br from-indigo-50 to-indigo-100
              text-sm font-medium text-indigo-600
              dark:border-gray-600 dark:from-indigo-900 dark:to-indigo-800 dark:text-indigo-300
            "
          >
            No Image Available
          </div>
        )}

        {/* Description */}
        <div className="prose prose-sm max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
          <p>
            {event.description && event.description.trim().length > 0
              ? event.description
              : "No detailed description is available for this event."}
          </p>
        </div>

        {/* Back Button */}
        <div>
          <Link
            href={`/homepage?country=${country}`}
            className="
              inline-flex items-center rounded-md border border-gray-300
              bg-white px-4 py-2 text-sm font-medium text-gray-700
              shadow-sm transition hover:bg-gray-100
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500
              dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200
              dark:hover:bg-gray-700
            "
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
