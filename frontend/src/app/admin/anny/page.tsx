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
      const res = await fetch("http://localhost:8000/admin/anny/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_token: token }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Error");
      }
      setStatus("Token is valid ✅");
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
        Paste your anny API token to verify it. For now you still keep the real
        token in <code>.env</code> on the backend.
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
          className="rounded-2xl border px-4 py-2 text-sm font-medium"
        >
          {loading ? "Checking…" : "Check token"}
        </button>
      </form>
      {status && <p className="text-sm">{status}</p>}
    </div>
  );
}
