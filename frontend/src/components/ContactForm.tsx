"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setError("Please fill out all fields.");
      setIsSubmitted(false);
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setIsSubmitted(false);
      return;
    }

    setError(null);
    setIsSubmitted(true);

    // At this point you could send data to an API route.
    // For now we just reset the form visually:
    event.currentTarget.reset();
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-sky-50/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] lg:items-start">
          <div>
            <h2
              id="contact-heading"
              className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
            >
              Come see it in person
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Share when you’d like to visit, and we’ll get back to you within
              one business day. We’re happy to help you pick the right
              membership.
            </p>

            <dl className="mt-6 space-y-3 text-sm text-slate-700">
              <div className="flex gap-3">
                <dt className="w-16 text-slate-500">Address</dt>
                <dd>Light Street 12, 3rd floor · City Center</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 text-slate-500">Email</dt>
                <dd>
                  <a
                    href="mailto:hello@daylightcowork.com"
                    className="focus-ring rounded-sm text-brand-700 underline-offset-2 hover:underline"
                  >
                    hello@daylightcowork.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 text-slate-500">Hours</dt>
                <dd>Mon – Fri · 9:00 – 18:00 (members 24/7)</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white/90 p-5 shadow-sm sm:p-6">
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
              Send us a message
            </h3>
            <form
              className="mt-4 space-y-4"
              noValidate
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-slate-700 sm:text-sm"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="focus-ring mt-1 block w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-brand-300"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-slate-700 sm:text-sm"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus-ring mt-1 block w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-brand-300"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-slate-700 sm:text-sm"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="focus-ring mt-1 block w-full resize-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-brand-300"
                  placeholder="Tell us about your ideal workday or visit time…"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="text-xs font-medium text-red-600 sm:text-sm"
                >
                  {error}
                </p>
              )}
              {isSubmitted && !error && (
                <p
                  role="status"
                  className="text-xs font-medium text-emerald-700 sm:text-sm"
                >
                  Thanks for reaching out! We’ll reply soon.
                </p>
              )}

              <div className="pt-1">
                <button
                  type="submit"
                  className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
