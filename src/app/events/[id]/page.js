// src/app/events/[id]/page.js

import { notFound } from "next/navigation";
import Link from 'next/link';


export async function generateStaticParams() {
  return []; // we'll use dynamic rendering for now
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
  const country=searchParams.country || "CA";
  const { id } = params;
  const event = await getEventDetails(id);
  if(!event){
    notFound();
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{event.name}</h1>
      <p>📍 {event.city} — {event.venue}</p>
      <p>📅 {event.date}</p>
      <img
        src={event.image}
        alt={event.name}
        style={{ width: "100%", maxWidth: "600px", borderRadius: "10px", marginTop: "1rem" }}
      />
      <p style={{ marginTop: "1.5rem" }}>{event.description}</p>

      <Link href={`/?country=${country}`} style={{
        display: "inline-block",
        marginTop: "2rem",
        padding: "0.5rem 1rem",
        background: "#000",
        color: "#fff",
        borderRadius: "8px",
        textDecoration: "none"
      }}>
        ← Back to Home
      </Link>
    </main>
  );
}
