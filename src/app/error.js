"use client";

import ErrorPage from "@/components/shared/ErrorPage";

export default function GlobalError({ error, reset }) {
  return <ErrorPage error={error} reset={reset} />;
}
