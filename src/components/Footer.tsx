import { ExternalLink, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { BUSINESS } from "@/data/catalog";

export function Footer() {
  const year = new Date().getFullYear();
  const googleMapsLink =
    BUSINESS.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.hotelAddress)}`;

  return (
    <footer className="relative z-10 border-t border-stone-200 bg-stone-100/70">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-3.5 py-14 sm:px-5 lg:px-5 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight text-stone-900">
            {BUSINESS.name}
          </p>
          <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-stone-600">
            {BUSINESS.tagline}. Handcrafted pieces and architectural decor delivered across India
            since {BUSINESS.established}.
          </p>
        </div>

        <div className="space-y-3 text-sm text-stone-600">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900">
            Details & Inquiries
          </p>
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-2.5 transition-colors hover:text-stone-950"
            title="Open in Google Maps"
          >
            <MapPin
              size={16}
              className="mt-0.5 shrink-0 text-amber-700 group-hover:scale-110 transition-transform"
            />
            <div>
              <span className="block leading-snug">{BUSINESS.hotelAddress}</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8A6331] hover:underline mt-1">
                <span>View on Google Maps</span>
                <ExternalLink size={11} />
              </span>
            </div>
          </a>
          <a
            href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2.5 font-medium transition-colors hover:text-stone-900"
          >
            <Phone size={16} className="shrink-0 text-amber-700" />
            <span>{BUSINESS.phone}</span>
          </a>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="flex items-center gap-2.5 font-medium transition-colors hover:text-stone-900"
          >
            <Mail size={16} className="shrink-0 text-amber-700" />
            <span>{BUSINESS.email}</span>
          </a>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900">
            Connect With Us
          </p>
          <div className="mt-3 flex items-center gap-3">
            {[
              { href: BUSINESS.social.instagram, label: "Instagram", icon: Instagram },
              { href: BUSINESS.social.facebook, label: "Facebook", icon: Facebook },
              { href: BUSINESS.social.youtube, label: "YouTube", icon: Youtube },
              { href: `mailto:${BUSINESS.email}`, label: "Email", icon: Mail },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200/90 bg-white text-stone-600 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-stone-400 hover:text-stone-900 hover:shadow-md"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200/80 bg-stone-200/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs font-medium text-stone-600 sm:flex-row md:px-8">
          <p>
            © {year} {BUSINESS.name}. All rights reserved.
          </p>
          <p>Curated Luxury Wholesale & Retail Catalog</p>
        </div>
      </div>
    </footer>
  );
}
