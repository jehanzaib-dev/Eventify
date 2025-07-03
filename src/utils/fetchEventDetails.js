// utils/fetchEventDetails.js
export default async function fetchEventDetails(id) {
  const apiKey = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;

  const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apiKey}`);

  if (!res.ok) {
    console.log("API failed for id:", id);
    throw new Error("Failed to fetch event details.");
  }

  const event = await res.json();

  if (event.errors || !event.name) {
    console.log("No event found:", event);
    throw new Error("Invalid event data.");
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
