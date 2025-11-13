import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section
          aria-labelledby="about-hero-heading"
          className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-16 lg:px-8"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] lg:items-center">
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-brand-700 shadow-sm ring-1 ring-brand-100">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Meet the space
              </p>
              <h1
                id="about-hero-heading"
                className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
              >
                A bright, human-sized coworking space for deep focus and soft
                collaboration.
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Daylight CoWork was created for people who care about{" "}
                <span className="font-medium text-slate-900">
                  how their workday feels
                </span>{" "}
                — natural light, quiet energy, and a small community that you
                actually get to know.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="/#contact"
                  className="focus-ring inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Book a visit
                </a>
                <p className="text-xs text-slate-500 sm:text-sm">
                  Tours every Monday &amp; Friday · 10:00 &amp; 16:00
                </p>
              </div>
            </div>

            {/* Minimal media collage */}
            <div className="relative hidden h-full min-h-[260px] lg:block">
              <div className="absolute -inset-4 rounded-4xl bg-linear-to-tr from-brand-100/70 via-indigo-100/60 to-white blur-2xl" />
              <div className="relative grid h-full grid-cols-2 gap-3">
                <div className="col-span-2 overflow-hidden rounded-3xl border border-slate-100 bg-white/50 shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1"
                    alt="Main coworking lounge with natural light and people working."
                    width={100}
                    height={40}
                    className="h-100 w-full object-cover"
                    sizes="(min-width: 10px) 420px, 100vw"
                  />
                </div>
                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white/60 shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
                    alt="Desk area with laptops and plants in a bright room."
                    width={400}
                    height={260}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 30px) 200px, 50vw"
                  />
                </div>
                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white/60 shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
                    alt="Small meeting room with wooden table and chairs."
                    width={400}
                    height={260}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 200px, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section aria-label="Space highlights" className="bg-white/80">
          <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
            <div className="grid gap-4 rounded-3xl border border-slate-100 bg-sky-50/50 px-4 py-4 text-sm text-slate-700 shadow-sm sm:grid-cols-3 sm:px-6 sm:py-5">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Members
                </p>
                <p className="font-display text-2xl font-semibold text-slate-900">
                  45
                </p>
                <p className="text-xs text-slate-500">
                  Freelancers, founders &amp; remote teams.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Natural light
                </p>
                <p className="font-display text-2xl font-semibold text-slate-900">
                  9 hrs/day
                </p>
                <p className="text-xs text-slate-500">
                  South-facing windows in all main areas.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Community events
                </p>
                <p className="font-display text-2xl font-semibold text-slate-900">
                  4 / month
                </p>
                <p className="text-xs text-slate-500">
                  Light-touch meetups, breakfasts &amp; skill-shares.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Media section: video + photos */}
        <section
          aria-labelledby="about-media-heading"
          className="bg-white/90"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="about-media-heading"
                  className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
                >
                  Walk through the space
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  A quick look at the lounge, hot desks and quiet rooms — no
                  staging, just the space on a normal workday.
                </p>
              </div>
              <p className="text-xs text-slate-500 sm:text-sm">
                Videos are muted by default — unmute for ambient sound.
              </p>
            </div>

            <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)]">
              {/* Main video */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/70 shadow-sm">
                <video
                  className="h-120 w-full object-cover"
                  controls
                  playsInline
                  poster="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1"
                >
                  {/* Replace with your own hosted video */}
                  <source
                    src="https://videos.pexels.com/video-files/3184301/3184301-uhd_2560_1440_25fps.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute left-4 top-4 rounded-2xl bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
                  2-minute studio walkthrough
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How space is organised */}
        <section
          aria-labelledby="about-layout-heading"
          className="bg-sky-50/60"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <div className="max-w-2xl">
              <h2
                id="about-layout-heading"
                className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
              >
                How the space is organised
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                We keep things simple: three main zones, each with a clear
                purpose, so you always know where to go for the type of work
                you’re doing.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <article className="flex flex-col gap-2 rounded-3xl border border-slate-100 bg-white/90 p-5 text-sm text-slate-700 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Lounge &amp; hot desks
                </h3>
                <p>
                  Bright, open work area with shared tables, plenty of outlets
                  and soft background music during the day.
                </p>
                <ul className="mt-2 space-y-1 text-xs text-slate-500">
                  <li>• Best for solo work, laptops, light collaboration</li>
                  <li>• Phone booths nearby for quick calls</li>
                </ul>
              </article>

              <article className="flex flex-col gap-2 rounded-3xl border border-slate-100 bg-white/90 p-5 text-sm text-slate-700 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Quiet rooms
                </h3>
                <p>
                  Smaller enclosed rooms with softer lighting, acoustic panels
                  and minimal decoration for focus.
                </p>
                <ul className="mt-2 space-y-1 text-xs text-slate-500">
                  <li>• Ideal for calls, interviews, deep work sprints</li>
                  <li>• Bookable in small blocks via member app</li>
                </ul>
              </article>

              <article className="flex flex-col gap-2 rounded-3xl border border-slate-100 bg-white/90 p-5 text-sm text-slate-700 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Loft &amp; event corner
                </h3>
                <p>
                  Flexible loft space used for breakfasts, show-and-tells and
                  evening meetups with the community.
                </p>
                <ul className="mt-2 space-y-1 text-xs text-slate-500">
                  <li>• Flip from work area to event setup in minutes</li>
                  <li>• Available for member-led events</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* Values */}
        <section
          aria-labelledby="about-values-heading"
          className="bg-white/80"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <div className="max-w-2xl">
              <h2
                id="about-values-heading"
                className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
              >
                What we value as a space
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Behind the furniture and floor plan, there are a few principles
                that shape how we run Daylight CoWork every day.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-sky-50/60 p-4 text-sm text-slate-700">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  01 · Calm by default
                </p>
                <p>
                  We protect quiet hours and keep “loud” activities in the
                  right rooms so the main space stays peaceful.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-sky-50/60 p-4 text-sm text-slate-700">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  02 · Small community
                </p>
                <p>
                  We stay intentionally small so members recognise each other,
                  say hi and naturally build trust over time.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-sky-50/60 p-4 text-sm text-slate-700">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  03 · Gentle sustainability
                </p>
                <p>
                  Long-lasting furniture, shared resources and low-waste
                  everyday habits instead of throwaway convenience.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-brand-100 bg-brand-50/40 px-4 py-4 text-xs text-slate-600 sm:px-5 sm:py-4 sm:text-sm">
              Curious if this matches how you like to work?{" "}
              <a
                href="/#contact"
                className="focus-ring rounded-sm font-medium text-brand-700 underline-offset-2 hover:underline"
              >
                Reach out to book a short visit
              </a>{" "}
              and we’ll walk you through the space in person.
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
