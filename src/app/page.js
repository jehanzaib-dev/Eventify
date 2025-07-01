"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";
import Loading from "@/components/Loading";

import styles from "./Home.module.css";

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

  // ✅ Sync state if user uses Back/Forward buttons
  useEffect(() => {
    const newCountry = searchParams.get("country") || "CA";
    if (newCountry !== selectedCountry) {
      setSelectedCountry(newCountry);
    }
  }, [searchParams]);

  // ✅ Fetch on selectedCountry change
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/events?country=${selectedCountry}`);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);

    // ✅ Use replace so it adds to history and retains on back
    router.replace(`/?country=${country}`);
  };

return (
  <div className={styles.wrapper}>
    <div className={styles.filterContainer}>
      <select
        value={selectedCountry}
        onChange={handleCountryChange}
        className={styles.countrySelect}
      >
        {countryOptions.map(({ label, code }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>

    {loading ? (
      <Loading />
    ) : events.length > 0 ? (
      <div className={styles.eventGrid}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    ) : (
      <p>No events available for this country.</p>
    )}
  </div>
);
  
}
