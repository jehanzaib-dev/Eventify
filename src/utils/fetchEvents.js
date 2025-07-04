export default async function fetchEventsByCountry(country) {
  const res = await fetch(`/api/events?country=${country}`);

  if (!res.ok) {
    throw new Error(`${res.statusText}: Please check your internet connection.`);
  }

  const data = await res.json();

  return data;
}