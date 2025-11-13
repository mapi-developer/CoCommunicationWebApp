import Image from "next/image";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:flex lg:items-center lg:gap-12 lg:px-8 lg:pb-20"
    >
      <div className="flex-1 space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-brand-700 shadow-sm ring-1 ring-brand-100">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          Quiet, light-filled coworking in the heart of the city
        </p>

        <h1
          id="hero-heading"
          className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Bright spaces for focused work and calm collaboration.
        </h1>

        <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Daylight CoWork was designed for people who do their best work in
          natural light. Flexible desks, private rooms, and a warm community —
          all in one airy, plant-friendly space.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#contact"
            className="focus-ring inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Book a visit
          </a>
          <a
            href="#spaces"
            className="focus-ring inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm/0 transition hover:border-brand-200 hover:bg-brand-50/80"
          >
            View spaces
          </a>
          <p className="w-full text-xs text-slate-500 sm:w-auto">
            Flexible memberships. Guided tours every Mon &amp; Fri.
          </p>
        </div>
      </div>

      <div className="mt-10 flex-1 lg:mt-0">
        <div className="relative">
          <div className="absolute -inset-4 rounded-4xl bg-linear-to-tr from-brand-100/70 via-indigo-100/60 to-white blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/40 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1"
              alt="Bright, airy coworking lounge with large windows and people working."
              width={900}
              height={650}
              priority
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 480px, 100vw"
            />

            {/* Floating info card */}
            <div className="pointer-events-none absolute left-4 top-4 sm:left-6 sm:top-6">
              <div className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 text-xs text-slate-700 shadow-sm ring-1 ring-slate-100 backdrop-blur">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <span aria-hidden="true">🌤️</span>
                </div>
                <div>
                  <p className="font-semibold">Guided tours</p>
                  <p className="text-[11px] text-slate-500">
                    Mondays &amp; Fridays · 10:00 &amp; 16:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Small stat chip */}
          <div className="pointer-events-none absolute -bottom-4 right-4 sm:-bottom-5 sm:right-6">
            <div className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-slate-900 text-xs text-slate-100 shadow-lg/20 shadow-slate-900/25 ring-1 ring-slate-800/40 px-3.5 py-2.5">
              <div>
                <p className="font-semibold">92%</p>
                <p className="text-[11px] text-slate-300">
                  members say they feel more focused here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
