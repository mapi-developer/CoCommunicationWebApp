// frontend/src/app/admin/bookings/page.tsx
"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: number;
  anny_booking_id?: string;
  resource_id: string;
  starts_at: string;
  ends_at: string;
  title?: string;
  status: string;
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/bookings"); // proxy to backend
      const data = await res.json();
      setBookings(data.items ?? data);
    })();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Bookings</h1>
      <div className="grid gap-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="rounded-2xl border border-slate-200 p-4 flex flex-col gap-1"
          >
            <div className="flex justify-between">
              <span className="font-medium">{b.title || "Untitled booking"}</span>
              <span className="text-xs uppercase tracking-wide text-slate-500">
                {b.status}
              </span>
            </div>
            <div className="text-sm text-slate-600">
              {new Date(b.starts_at).toLocaleString()} –{" "}
              {new Date(b.ends_at).toLocaleString()}
            </div>
            <div className="text-xs text-slate-400">
              Resource: {b.resource_id} · Anny ID: {b.anny_booking_id || "-"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
