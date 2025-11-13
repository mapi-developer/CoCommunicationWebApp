const features = [
  {
    title: "Light-filled desks",
    description:
      "Floor-to-ceiling windows, ergonomic chairs, and quiet zones for deep work.",
    icon: "☀️",
  },
  {
    title: "Fast Wi-Fi & focus booths",
    description:
      "Fiber internet, phone booths for calls, and meeting rooms with big screens.",
    icon: "⚡",
  },
  {
    title: "Community events",
    description:
      "Weekly coffees, skill swaps, and gentle networking — no hard sells.",
    icon: "🤝",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="bg-white/70"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="features-heading"
            className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            What makes us different
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            We designed Daylight CoWork to feel like a calm studio — bright,
            soft, and focused — instead of a noisy office.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm/0 transition hover:border-brand-100 hover:bg-brand-50/60"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-lg">
                <span aria-hidden="true">{feature.icon}</span>
                <span className="sr-only">{feature.title}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
