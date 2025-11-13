"use client";

import { useState } from "react";

export default function AnnyConnectPage() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/anny/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_token: token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Error");
      setStatus("Connected successfully ✅");
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Connect anny</h1>
      <p className="text-sm text-slate-600">
        Paste your anny API token here to let the admin panel sync bookings.
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="anny API token"
          className="w-full rounded-2xl border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl px-4 py-2 text-sm font-medium border"
        >
          {loading ? "Connecting..." : "Connect"}
        </button>
      </form>
      {status && <div className="text-sm">{status}</div>}
    </div>
  );
}
