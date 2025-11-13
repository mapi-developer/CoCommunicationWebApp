// app/admin/page.tsx
import Link from "next/link";

type BookingStatus = "confirmed" | "pending" | "cancelled";

type Booking = {
  id: string;
  guestName: string;
  email: string;
  date: string; // ISO date
  time: string;
  resource: string; // room / desk
  status: BookingStatus;
  source: "anny" | "manual";
};

const mockBookings: Booking[] = [
  {
    id: "B-2401",
    guestName: "Anna Kovács",
    email: "anna@example.com",
    date: "2025-11-14",
    time: "09:00–13:00",
    resource: "Focus Room 1",
    status: "confirmed",
    source: "anny",
  },
  {
    id: "B-2402",
    guestName: "David Smith",
    email: "david@example.com",
    date: "2025-11-14",
    time: "10:00–18:00",
    resource: "Open Desk #3",
    status: "pending",
    source: "manual",
  },
  {
    id: "B-2403",
    guestName: "Maya Lee",
    email: "maya@example.com",
    date: "2025-11-15",
    time: "12:00–17:00",
    resource: "Meeting Room",
    status: "cancelled",
    source: "anny",
  },
];

const rooms = [
  { name: "Open Space Desks", capacity: 10, occupied: 6 },
  { name: "Meeting Room", capacity: 6, occupied: 2 },
  { name: "Focus Room 1", capacity: 2, occupied: 1 },
];

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    cancelled: "bg-rose-50 text-rose-700 border-rose-100",
  };

  const labels: Record<BookingStatus, string> = {
    confirmed: "Confirmed",
    pending: "Pending",
    cancelled: "Cancelled",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 lg:py-10">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              CoCommunication · Admin
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Check bookings, room utilization and your future Anny integration in one place.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-600 hover:border-slate-300 hover:bg-white"
            >
              ← Back to website
            </Link>
          </div>
        </header>

        {/* Top KPI cards */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm/10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
              Today&apos;s bookings
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">12</p>
            <p className="mt-1 text-xs text-slate-500">All resources combined</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm/10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
              Occupancy (today)
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">68%</p>
            <p className="mt-1 text-xs text-slate-500">Average of all rooms & desks</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm/10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
              No-shows / cancellations
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">2</p>
            <p className="mt-1 text-xs text-slate-500">In the last 7 days</p>
          </div>
        </section>

        {/* Main content */}
        <section className="grid gap-6 lg:grid-cols-[2.1fr,1.2fr]">
          {/* Bookings table */}
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm/10">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Upcoming bookings
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  This is a demo list – later it will be synced from Anny.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select className="h-9 rounded-full border border-slate-200 bg-slate-50 px-3 text-xs text-slate-600 outline-none focus:border-slate-300">
                  <option>Next 7 days</option>
                  <option>Today</option>
                  <option>This month</option>
                </select>
                <select className="h-9 rounded-full border border-slate-200 bg-slate-50 px-3 text-xs text-slate-600 outline-none focus:border-slate-300">
                  <option>All statuses</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] uppercase tracking-[0.14em] text-slate-400">
                    <th className="py-2 pr-3">Booking</th>
                    <th className="px-3 py-2">Guest</th>
                    <th className="px-3 py-2">Date / Time</th>
                    <th className="px-3 py-2">Resource</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Source</th>
                    <th className="px-3 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {mockBookings.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
                    >
                      <td className="py-2 pr-3 text-[13px] font-medium text-slate-900">
                        {b.id}
                      </td>
                      <td className="px-3 py-2 text-[13px] text-slate-700">
                        <div>{b.guestName}</div>
                        <div className="text-[11px] text-slate-400">{b.email}</div>
                      </td>
                      <td className="px-3 py-2 text-[13px] text-slate-700">
                        <div>{b.date}</div>
                        <div className="text-[11px] text-slate-400">{b.time}</div>
                      </td>
                      <td className="px-3 py-2 text-[13px] text-slate-700">
                        {b.resource}
                      </td>
                      <td className="px-3 py-2">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                        {b.source === "anny" ? "Anny" : "Manual"}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {mockBookings.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-6 text-center text-xs text-slate-500"
                      >
                        No bookings in the selected period yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column: Rooms + Anny connect */}
          <div className="flex flex-col gap-4">
            {/* Room utilization */}
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm/10">
              <h2 className="text-sm font-semibold text-slate-900">
                Room utilization
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Quick overview of how full each space is today.
              </p>

              <div className="mt-3 space-y-3">
                {rooms.map((room) => {
                  const pct =
                    room.capacity === 0
                      ? 0
                      : Math.round((room.occupied / room.capacity) * 100);

                  return (
                    <div key={room.name} className="space-y-1">
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="font-medium text-slate-800">
                          {room.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {room.occupied}/{room.capacity} · {pct}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-sky-400"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Anny integration card */}
            <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Anny booking integration
              </h2>
              <p className="mt-1 text-xs text-slate-600">
                Later you will connect your{" "}
                <span className="font-medium">anny.co</span> account here to
                sync bookings and availability directly into this dashboard.
              </p>

              <ul className="mt-3 space-y-1 text-xs text-slate-600">
                <li>• Import bookings from Anny (public / protected API).</li>
                <li>• See live occupancy and upcoming bookings.</li>
                <li>• Open Anny booking widget in your brand design.</li>
              </ul>

              <button
                type="button"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
              >
                Connect Anny account (coming soon)
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
