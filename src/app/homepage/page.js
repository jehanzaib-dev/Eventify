"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/ErrorPage"; // ✅ Added
import fetchEventsByCountry from "@/utils/fetchEvents";

const countryOptions = [
  { label: "Canada", code: "CA" },
  { label: "Pakistan", code: "PK" },
  { label: "UAE", code: "AE" },
  { label: "United States", code: "US" },
  { label: "United Kingdom", code: "GB" },
  { label: "Germany", code: "DE" },
  { label: "India", code: "IN" },
];

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCountry = searchParams.get("country") || "CA";
  const [selectedCountry, setSelectedCountry] = useState(urlCountry);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------- Auth Gate ---------- */
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        router.push("/login");
      }
    } catch {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- Sync country from URL ---------- */
  useEffect(() => {
    const newCountry = searchParams.get("country") || "CA";
    if (newCountry !== selectedCountry) {
      setSelectedCountry(newCountry);
    }
  }, [searchParams, selectedCountry]);

  /* ---------- Fetch Events ---------- */
  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEventsByCountry(selectedCountry);
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(new Error(err?.message || "Something went wrong while fetching events."));
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCountry]);

  useEffect(() => {
    loadEvents();
  }, [selectedCountry, loadEvents]);

  /* ---------- Handlers ---------- */
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    router.replace(`/homepage?country=${country}`);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      {/* Header + Filter */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Events
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Browse live events by country.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="country" className="sr-only">
            Select Country
          </label>
          <div className="relative">
            <select
              id="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="
                appearance-none rounded-md border border-gray-300 bg-white
                px-3 py-2 pr-9 text-sm font-medium text-gray-700 shadow-sm
                transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500
                dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200
                dark:focus:border-indigo-400 dark:focus:ring-indigo-400
              "
            >
              {countryOptions.map(({ label, code }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex items-center justify-center py-20" role="status" aria-live="polite">
          <Loading />
        </div>
      ) : error ? (
        <ErrorPage error={error} reset={loadEvents} />
      ) : events.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No events available for this country.
          </p>
        </div>
      )}
    </div>
  );
}
