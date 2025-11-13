"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const spacesHref = isHome ? "#spaces" : "/#spaces";
  const pricingHref = isHome ? "#pricing" : "/#pricing";
  const contactHref = isHome ? "#contact" : "/#contact";

  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Daylight CoWork. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <nav
            aria-label="Footer"
            className="flex items-center gap-3 text-xs sm:text-sm"
          >
            <Link
              href="/about"
              className="focus-ring rounded-sm hover:text-slate-700"
            >
              About
            </Link>
            <a
              href={spacesHref}
              className="focus-ring rounded-sm hover:text-slate-700"
            >
              Spaces
            </a>
            <a
              href={pricingHref}
              className="focus-ring rounded-sm hover:text-slate-700"
            >
              Pricing
            </a>
            <a
              href={contactHref}
              className="focus-ring rounded-sm hover:text-slate-700"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="https://www.instagram.com"
              aria-label="Daylight CoWork on Instagram"
              className="focus-ring inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-[13px] text-slate-600 hover:border-brand-200 hover:text-brand-700"
            >
              IG
            </Link>
            <Link
              href="https://www.linkedin.com"
              aria-label="Daylight CoWork on LinkedIn"
              className="focus-ring inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-[13px] text-slate-600 hover:border-brand-200 hover:text-brand-700"
            >
              in
            </Link>
            <Link
              href="https://www.facebook.com"
              aria-label="Daylight CoWork on Facebook"
              className="focus-ring inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-[13px] text-slate-600 hover:border-brand-200 hover:text-brand-700"
            >
              facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
