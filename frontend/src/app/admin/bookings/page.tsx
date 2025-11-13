"use client";

import { useEffect, useState } from "react";

type Booking = {
  anny_booking_id: string;
  resource_id: string;
  starts_at: string;
  ends_at: string;
  title?: string | null;
  notes?: string | null;
  status: string;
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/admin/bookings");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Failed to load bookings");
      }
      setBookings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Bookings (anny)</h1>
        <button
          onClick={load}
          className="rounded-2xl border px-4 py-2 text-sm font-medium"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading…</p>}
      {error && <p className="text-sm text-red-500">Error: {error}</p>}

      <div className="grid gap-4">
        {bookings.map((b) => (
          <div
            key={b.anny_booking_id}
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
              Resource: {b.resource_id} · Anny ID: {b.anny_booking_id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
