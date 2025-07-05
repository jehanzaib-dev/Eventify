"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import fetchEventDetails from "@/utils/fetchEventDetails";
import Spinner from '@/components/Spinner';
import styles from "./EventDetails.module.css";

export default function EventDetailsPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const country = searchParams.get("country") || "CA";

  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    router.push("/login");
  }
}, []);

  const loadEvent = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEventDetails(id);
      setEvent(data);
    } catch (err) {
      if (err.message === "failed to fetch") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvent();
  }, [id]);

  if (loading) {
  return (
    <main className={styles.wrapper}>
      <Spinner />
    </main>
  );
}  

  if (error) {
    return (
      <main className={styles.wrapper}>
  <div className={styles.errorCard}>
    <h2 className={styles.errorHeading}>⚠️ Failed to load event</h2>
    <p className={styles.errorMessage}>{error}</p>
    <div className={styles.buttonGroup}>
      <button onClick={loadEvent} className={styles.retryButton}>
      Retry
      </button>
      <Link href={`/homepage?country=${country}`} className={styles.errorbackButton}>
        ← Back to Home
      </Link>
    </div>
  </div>
</main>

    );
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>{event.name}</h1>
        <p className={styles.meta}>📍 {event.city} — {event.venue}</p>
        <p className={styles.meta}>📅 {event.date}</p>
        <img src={event.image} alt={event.name} className={styles.image} />
        <p className={styles.description}>{event.description}</p>
        <Link href={`/homepage?country=${country}`} className={styles.backButton}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
