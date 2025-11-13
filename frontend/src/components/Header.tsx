"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sectionNavItems = [
  { hash: "#spaces", label: "Spaces" },
  { hash: "#features", label: "Features" },
  { hash: "#pricing", label: "Pricing" },
  { hash: "#contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const contactHref = isHome ? "#contact" : "/#contact";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 focus-ring">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-br from-brand-300 to-brand-500">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white"
            >
              <path
                d="M4 10.5C4 7.462 6.462 5 9.5 5h5A5.5 5.5 0 0 1 20 10.5v3A5.5 5.5 0 0 1 14.5 19h-5A5.5 5.5 0 0 1 4 13.5v-3Z"
                fill="currentColor"
              />
              <path
                d="M7 10.5A2.5 2.5 0 0 1 9.5 8h5A2.5 2.5 0 0 1 17 10.5v3A2.5 2.5 0 0 1 14.5 16h-5A2.5 2.5 0 0 1 7 13.5v-3Z"
                fill="white"
                opacity="0.7"
              />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-slate-900">
            Daylight CoWork
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex"
        >
          {/* About is a normal route */}
          <Link
            href="/about"
            className="focus-ring rounded-full px-1 py-1 transition hover:text-slate-900"
          >
            About
          </Link>

          {/* Section links that point to the home page sections */}
          {sectionNavItems.map((item) => {
            const href = isHome ? item.hash : `/${item.hash}`;
            return (
              <a
                key={item.hash}
                href={href}
                className="focus-ring rounded-full px-1 py-1 transition hover:text-slate-900"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <a
            href={contactHref}
            className="focus-ring inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Book a visit
          </a>
        </div>

        {/* Simple mobile CTA */}
        <a
          href={contactHref}
          className="focus-ring inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 md:hidden"
        >
          Book
        </a>
      </div>
    </header>
  );
}
