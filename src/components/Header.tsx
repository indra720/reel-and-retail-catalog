import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { BUSINESS } from "@/data/catalog";

import { Magnetic } from "./Magnetic";

function LuxuryLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-amber-300 shadow-md border border-amber-500/25">
        <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 text-amber-300" fill="none" stroke="currentColor">
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
        className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-stone-200/90 bg-white/95 text-stone-600 shadow-xs transition-colors duration-200 hover:border-amber-400 hover:text-stone-950"
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

  // 1. Flexible Address: Shop, Hotel, or both
  const addresses: { label: string; address: string }[] = [];
  if (BUSINESS.address) {
    addresses.push({ label: BUSINESS.addressLabel || "Shop", address: BUSINESS.address });
  }
  if (BUSINESS.hotelAddress) {
    addresses.push({ label: BUSINESS.hotelAddressLabel || "Hotel", address: BUSINESS.hotelAddress });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#E8E2D8] bg-[#FBF9F5]/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto max-w-[1500px] px-3.5 py-2 sm:px-5 sm:py-2.5 lg:px-5">
        {/* Main Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Desktop Addresses */}
          <div className="flex items-center gap-5">
            <LuxuryLogo />

            {/* Desktop: Small label chips before each address on separate lines */}
            {addresses.length > 0 && (
              <div className="hidden border-l border-stone-300/60 pl-4 lg:flex lg:flex-col lg:justify-center lg:gap-1">
                {addresses.map((item, idx) => (
                  <p key={idx} className="flex items-center gap-1.5 text-[11px] text-stone-600">
                    <MapPin size={11} className="shrink-0 text-amber-700" />
                    <span className="rounded bg-amber-100/90 px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider text-amber-900 border border-amber-200/80">
                      {item.label}
                    </span>
                    <span className="truncate max-w-sm">{item.address}</span>
                  </p>
                ))}
                <p className="flex items-center gap-1.5 text-[11px] text-stone-600">
                  <Phone size={11} className="shrink-0 text-amber-700" />
                  <span>{BUSINESS.phone}</span>
                </p>
              </div>
            )}
          </div>

          {/* Desktop Right Side: 4 Social Links + Date Pill */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <SocialLink href={BUSINESS.email ? `mailto:${BUSINESS.email}` : "#"} label="Email us">
                <Mail size={15} />
              </SocialLink>
              <SocialLink href={BUSINESS.social.instagram} label="Instagram">
                <Instagram size={15} />
              </SocialLink>
              <SocialLink href={BUSINESS.social.facebook} label="Facebook">
                <Facebook size={15} />
              </SocialLink>
              <SocialLink href={BUSINESS.social.youtube} label="YouTube">
                <Youtube size={15} />
              </SocialLink>
            </div>
            <span className="rounded-full border border-stone-200/90 bg-white/95 px-3 py-1 text-xs font-semibold text-stone-700 shadow-xs">
              {dateStr || "\u00A0"}
            </span>
          </div>

          {/* Mobile Right Side: Date Pill */}
          <div className="flex sm:hidden items-center gap-2">
            <span className="rounded-full border border-stone-200/90 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-stone-700 shadow-xs">
              {dateStr || "\u00A0"}
            </span>
          </div>
        </div>

        {/* Mobile Addresses: Small label chips on separate lines (compact on mobile) */}
        {addresses.length > 0 && (
          <div className="flex sm:hidden flex-col gap-1 border-t border-stone-200/60 pt-1.5 mt-1.5 text-[10px] text-stone-600">
            {addresses.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 min-w-0">
                <MapPin size={10} className="shrink-0 text-amber-700" />
                <span className="shrink-0 rounded bg-amber-100/90 px-1.5 py-0.2 text-[9px] font-bold text-amber-900 border border-amber-200/70">
                  {item.label}
                </span>
                <span className="truncate">{item.address}</span>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Secondary Row: All 4 Social Links (including YouTube) + Clickable Phone */}
        <div className="mt-1.5 flex sm:hidden items-center justify-between border-t border-stone-200/50 pt-1.5">
          <div className="flex items-center gap-2">
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

          <a
            href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1 rounded-full border border-stone-200/90 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-stone-700 shadow-xs"
          >
            <Phone size={11} className="text-amber-700" />
            <span>{BUSINESS.phone}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
