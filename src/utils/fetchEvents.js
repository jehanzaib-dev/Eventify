export default async function fetchEvents() {
  const apiKey = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;

  const res = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=UK&size=10&apikey=${apiKey}`
  );

  if (!res.ok) {
    console.error("API error:", res.status);
    throw new Error("Failed to fetch from Ticketmaster");
  }

  const data = await res.json();

  const events = data._embedded?.events?.map((event) => ({
    id: event.id,
    name: event.name,
    city: event._embedded?.venues?.[0]?.city?.name || "",
    venue: event._embedded?.venues?.[0]?.name || "",
    date: event.dates?.start?.localDate || "",
    image: event.images?.[0]?.url || "",
  })) || [];

  return events;
}
