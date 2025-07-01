"use client";

import Link from "next/link";
import styles from "./EventCard.module.css";
import { useSearchParams } from "next/navigation";

export default function EventCard({ event }) {
  const searchParams = useSearchParams();
  const country = searchParams.get("country") || "CA";

  return (
    <div className={styles.card}>
      {event.image && (
        <img src={event.image} alt={event.name} className={styles.image} />
      )}

      <div className={styles.content}>
        <h3 className={styles.title}>{event.name}</h3>
        <p className={styles.info}><strong>Date:</strong> {event.date}</p>
        <p className={styles.info}><strong>City:</strong> {event.city}</p>
        <p className={styles.info}><strong>Venue:</strong> {event.venue}</p>

        <div className={styles.buttonWrapper}>
          <Link
            href={`/events/${event.id}?country=${country}`}
            className={styles.button}
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
