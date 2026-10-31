import { motion } from "framer-motion";
import {
  ExternalLink,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

import { Magnetic } from "@/components/Magnetic";
import { BUSINESS } from "@/data/catalog";

function LuxuryLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-stone-900 to-stone-800 text-amber-200 shadow-sm border border-stone-700/50">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" aria-hidden="true">
          <path d="M12 2L2 9.5L12 17L22 9.5L12 2Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 14.5L12 22L22 14.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-serif text-base sm:text-lg font-bold tracking-[0.22em] text-stone-900 leading-tight">
          LUMINA
        </span>
        <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.38em] text-amber-800 uppercase leading-none">
          LIVING
        </span>
      </div>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <Magnetic>
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.94 }}
        className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full border border-stone-200/90 bg-white/95 text-stone-600 shadow-xs transition-colors duration-200 hover:border-amber-400 hover:text-stone-950"
      >
        {children}
      </motion.a>
    </Magnetic>
  );
}

export function Header() {
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    );
  }, []);

  const googleMapsLink =
    BUSINESS.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.hotelAddress)}`;

  return (
    <header className="sticky top-0 z-40 border-b border-[#E8E2D8] bg-[#FBF9F5]/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto max-w-[1500px] px-3.5 py-2 sm:px-5 sm:py-2.5 lg:px-5">
        {/* Main Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Desktop Hotel Address with Google Map link */}
          <div className="flex items-center gap-5">
            <LuxuryLogo />

            {/* Desktop: Hotel Address + Google Map link */}
            {BUSINESS.hotelAddress && (
              <div className="hidden border-l border-stone-300/60 pl-4 lg:flex lg:items-center lg:gap-2 text-[10.5px] text-stone-600">
                <p className="flex items-center gap-1.5">
                  <MapPin size={11} className="shrink-0 text-amber-700" />
                  <span className="rounded bg-amber-100/90 px-1.5 py-0.2 text-[8.5px] font-bold uppercase tracking-wider text-amber-900 border border-amber-200/80">
                    {BUSINESS.hotelAddressLabel || "Hotel"}
                  </span>
                  <span className="truncate max-w-md">{BUSINESS.hotelAddress}</span>
                </p>

                {/* Google Map Link */}
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noreferrer"
                  title="Open Hotel in Google Maps"
                  className="inline-flex items-center gap-1 rounded-full bg-amber-100/80 hover:bg-amber-200 text-[#7A5323] px-2.5 py-0.5 text-[9.5px] font-bold border border-amber-300/80 shadow-2xs transition-all cursor-pointer hover:scale-102"
                >
                  <MapPin size={10} className="text-[#8A6331]" />
                  <span>Google Map</span>
                  <ExternalLink size={9} />
                </a>

                {/* Clickable Mobile / Phone Number */}
                {BUSINESS.phone && (
                  <a
                    href={`tel:${BUSINESS.phone.replace(/[^+\d]/g, "")}`}
                    title={`Call ${BUSINESS.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-amber-50 text-stone-800 hover:text-amber-950 px-2.5 py-0.5 text-[10px] font-bold border border-stone-200/90 shadow-2xs transition-all cursor-pointer hover:scale-102"
                  >
                    <Phone size={10} className="text-amber-700" />
                    <span>{BUSINESS.phone}</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right Side: 4 Social Links + Date Pill */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex items-center gap-1">
              <SocialLink href={BUSINESS.email ? `mailto:${BUSINESS.email}` : "#"} label="Email us">
                <Mail size={14} />
              </SocialLink>
              <SocialLink href={BUSINESS.social.instagram} label="Instagram">
                <Instagram size={14} />
              </SocialLink>
              <SocialLink href={BUSINESS.social.facebook} label="Facebook">
                <Facebook size={14} />
              </SocialLink>
              <SocialLink href={BUSINESS.social.youtube} label="YouTube">
                <Youtube size={14} />
              </SocialLink>
            </div>
            <span className="rounded-full border border-stone-200/90 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-stone-700 shadow-xs hidden sm:inline-block">
              {dateStr || "\u00A0"}
            </span>
          </div>
        </div>

        {/* Mobile: Hotel Address + Google Map Link */}
        {BUSINESS.hotelAddress && (
          <div className="flex sm:hidden items-center justify-between gap-2 border-t border-stone-200/60 pt-1.5 mt-1.5 text-[10px] text-stone-600">
            <div className="flex items-center gap-1.5 min-w-0">
              <MapPin size={10} className="shrink-0 text-amber-700" />
              <span className="shrink-0 rounded bg-amber-100/90 px-1.5 py-0.2 text-[8.5px] font-bold text-amber-900 border border-amber-200/70">
                {BUSINESS.hotelAddressLabel || "Hotel"}
              </span>
              <span className="truncate">{BUSINESS.hotelAddress}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-amber-100/90 text-[#7A5323] px-2 py-0.5 text-[9px] font-bold border border-amber-300/80"
              >
                <span>Map</span>
                <ExternalLink size={8} />
              </a>
              {BUSINESS.phone && (
                <a
                  href={`tel:${BUSINESS.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-1 rounded-full bg-white text-stone-800 px-2 py-0.5 text-[9px] font-bold border border-stone-200"
                >
                  <Phone size={8} className="text-amber-700" />
                  <span>Call</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
