// app/not-found.js
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import NotFoundPage from "@/components/shared/NotFoundPage";

export default function NotFoundWrapper() {
  return (
    <Suspense fallback={null}>
      <NotFoundPage />
    </Suspense>
  );
}
