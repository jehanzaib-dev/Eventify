// src/app/api/events/route.js

import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country") || "PK";

  const API_KEY = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?size=12&countryCode=${country}&apikey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const events = data._embedded?.events?.map((event) => ({
      id: event.id,
      name: event.name,
      image: event.images?.[0]?.url,
      date: event.dates?.start?.localDate,
      city: event._embedded?.venues?.[0]?.city?.name || "",
      country: event._embedded?.venues?.[0]?.country?.name || "",
      venue: event._embedded?.venues?.[0]?.name || "",
    })) || [];

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
