const tiers = [
  {
    name: "Day pass",
    price: "€22",
    period: "per day",
    description: "Perfect for a one-off deep work sprint or a day in the city.",
    features: ["9:00 – 18:00 access", "Any hot desk", "Coffee & tea included"],
    highlighted: false,
  },
  {
    name: "Hot desk",
    price: "€190",
    period: "per month",
    description: "Flexible access to our shared desks and community events.",
    features: [
      "24/7 access",
      "All open areas",
      "Meeting room credits",
      "Community events",
    ],
    highlighted: true,
  },
  {
    name: "Private room",
    price: "From €480",
    period: "per month",
    description: "Your own lockable, light-filled room for small teams.",
    features: ["24/7 access", "Furnished room", "Meeting room credits"],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-white/70"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center">
          <h2
            id="pricing-heading"
            className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Simple, flexible pricing
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            No long-term contracts, no surprise fees. Choose the level of
            commitment that suits your rhythm.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`flex flex-col rounded-3xl border bg-white/80 p-5 shadow-sm/0 ${
                tier.highlighted
                  ? "border-brand-300 shadow-sm shadow-brand-100"
                  : "border-slate-100"
              }`}
            >
              <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                {tier.name}
              </h3>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
                  {tier.price}
                </span>
                <span className="text-xs text-slate-500 sm:text-sm">
                  {tier.period}
                </span>
              </p>
              <p className="mt-2 text-sm text-slate-600">{tier.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-100 text-[10px] text-brand-700"
                    >
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <a
                  href="#contact"
                  className={`focus-ring inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                    tier.highlighted
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "border border-slate-200 bg-white text-slate-800 hover:border-brand-200 hover:bg-brand-50/80"
                  }`}
                >
                  Talk to us
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
