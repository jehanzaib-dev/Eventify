import Link from "next/link";
import { useSearchParams } from "next/navigation";


export default function EventCard({ event }) {
  const searchParams = useSearchParams();
const country = searchParams.get("country") || "CA";

  return (
    <div className="event-card">
      <div className="event-image-wrapper">
        <img src={event.image} alt={event.name} />
      </div>
      <div style={{ padding: "1rem" }}>
        <h3>{event.name}</h3>
        <p>{event.date}</p>
        <p>{event.city}</p>
        <Link
          href={`/events/${event.id}?country=${country}`}
          style={{
            display: "inline-block",
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "#0070f3",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
          }}
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
