import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./EventDetails.module.css";

export async function generateStaticParams() {
  return [];
}

async function getEventDetails(id) {
  const apiKey = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;
  const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apiKey}`);

  if (!res.ok) {
    console.log("API failed for id:", id);
    return null;
  }

  const event = await res.json();
  if (event.errors || !event.name) {
    console.log("No event found:", event);
    return null;
  }

  return {
    id: event.id,
    name: event.name,
    date: event.dates?.start?.localDate || "",
    city: event._embedded?.venues?.[0]?.city?.name || "",
    venue: event._embedded?.venues?.[0]?.name || "",
    description: event.info || "No description provided.",
    image: event.images?.[0]?.url || "",
  };
}

export default async function EventDetailsPage({ params, searchParams }) {
  const country = searchParams.country || "CA";
  const { id } = params;
  const event = await getEventDetails(id);

  if (!event) {
    notFound();
  }

  return (
    <main className={styles.wrapper}>
    <div className={styles.card}>
      <h1 className={styles.heading}>{event.name}</h1>
      <p className={styles.meta}>📍 {event.city} — {event.venue}</p>
      <p className={styles.meta}>📅 {event.date}</p>

      <img src={event.image} alt={event.name} className={styles.image} />

      <p className={styles.description}>{event.description}</p>

      <Link href={`/?country=${country}`} className={styles.backButton}>
        ← Back to Home
      </Link>
      </div>
    </main>
  );
}
