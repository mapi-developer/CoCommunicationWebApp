"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: number;
  anny_booking_id?: string | null;
  resource_id: string;
  starts_at: string;
  ends_at: string;
  title?: string | null;
  notes?: string | null;
  status: string;
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const load = async () => {
    const res = await fetch("/api/admin/bookings");
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    load();
  }, []);

  const sync = async () => {
    await fetch("/api/admin/bookings/sync-from-anny", { method: "POST" });
    await load();
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Bookings</h1>
        <button
          onClick={sync}
          className="rounded-2xl px-4 py-2 text-sm font-medium border"
        >
          Sync from anny
        </button>
      </div>
      <div className="grid gap-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="rounded-2xl border px-4 py-3 text-sm space-y-1"
          >
            <div className="flex justify-between">
              <span className="font-medium">
                {b.title || "Untitled booking"}
              </span>
              <span className="text-xs uppercase tracking-wide text-slate-500">
                {b.status}
              </span>
            </div>
            <div className="text-slate-600">
              {new Date(b.starts_at).toLocaleString()} –{" "}
              {new Date(b.ends_at).toLocaleString()}
            </div>
            <div className="text-xs text-slate-400">
              Resource: {b.resource_id} · Anny ID: {b.anny_booking_id || "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
