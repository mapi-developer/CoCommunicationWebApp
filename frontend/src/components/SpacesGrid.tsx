import Image from "next/image";

const spaces = [
  {
    name: "Sunlit Desk Lounge",
    capacity: "Up to 20 people",
    price: "From €18 / day",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
    alt: "Rows of bright desks with laptops and plants in a modern coworking space.",
  },
  {
    name: "Quiet Focus Room",
    capacity: "Up to 6 people",
    price: "From €29 / day",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a1d8988c3a",
    alt: "Minimal meeting room with a wooden table and chairs in front of large windows.",
  },
  {
    name: "Loft Studio",
    capacity: "Up to 16 people",
    price: "From €35 / day",
    image:
      "https://images.unsplash.com/photo-1499914485622-a88fac536764",
    alt: "Loft-style office with sofas, desks, and large industrial windows.",
  },
];

export default function SpacesGrid() {
  return (
    <section
      id="spaces"
      aria-labelledby="spaces-heading"
      className="bg-sky-50/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="spaces-heading"
              className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
            >
              Spaces for every workday
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Whether you need a quiet spot for deep work or a cosy room for
              your team, we’ve got a light-filled space for you.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {spaces.map((space) => (
            <article
              key={space.name}
              className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white/80 shadow-sm/0 transition hover:border-brand-100 hover:bg-white"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={space.image}
                  alt={space.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
                <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                  {space.name}
                </h3>
                <p className="text-xs font-medium text-slate-500 sm:text-sm">
                  {space.capacity}
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {space.price}
                </p>
                <div className="mt-3">
                  <a
                    href="#contact"
                    className="focus-ring inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:border-brand-200 hover:bg-brand-50/80 sm:text-sm"
                  >
                    Enquire
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
