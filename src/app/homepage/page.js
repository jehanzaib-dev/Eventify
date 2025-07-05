"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";
import Loading from "@/components/Loading";
import fetchEventsByCountry from "@/utils/fetchEvents";

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
  const [error, setError] = useState(null);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    router.push("/login");
  }
}, []);

  useEffect(() => {
    const newCountry = searchParams.get("country") || "CA";
    if (newCountry !== selectedCountry) {
      setSelectedCountry(newCountry);
    }
  }, [searchParams]);

  const loadEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchEventsByCountry(selectedCountry);
      setEvents(data);
    } catch (err) {
      setError(err.message || "Something went wrong while fetching events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    router.replace(`/homepage?country=${country}`);
  };

return (
  <div className={styles.wrapper}>
    <div className={styles.filterContainer}>
      <select
        value={selectedCountry}
        onChange={handleCountryChange}
        className={styles.countrySelect}
      >
      {
        countryOptions.map(({ label, code }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>

    {loading ? (
      <Loading />
    ): error ? (
  <div className={styles.errorBox}>
  <p className={styles.errorMessage}>{error}</p>
  <button onClick={loadEvents} className={styles.retryButton}>
    Try Again
    </button>
    </div> 
    ): 

    events.length > 0 ? (
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
