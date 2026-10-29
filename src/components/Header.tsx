import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { BUSINESS } from "@/data/catalog";

import { Magnetic } from "./Magnetic";

function LogoOrb() {
  const gradient =
    "conic-gradient(from 0deg, var(--primary), var(--violet-glow), var(--cyan-glow), var(--primary))";
  return (
    <div className="relative h-14 w-14 shrink-0 md:h-16 md:w-16">
      {/* halo */}
      <div
        aria-hidden
        className="absolute -inset-2 rounded-full opacity-40 blur-lg"
        style={{ background: gradient }}
      />
      {/* spinning ring */}
      <div
        aria-hidden
        className="absolute inset-0 animate-spin-slow rounded-full"
        style={{ background: gradient, WebkitMask: "radial-gradient(circle, transparent 62%, black 64%)", mask: "radial-gradient(circle, transparent 62%, black 64%)" }}
      />
      {/* sphere */}
      <div
        className="absolute inset-[5px] flex items-center justify-center rounded-full shadow-glow"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, var(--cyan-glow), var(--primary) 45%, oklch(0.16 0.05 275) 95%)",
        }}
      >
        <span className="font-display text-xl font-bold text-foreground md:text-2xl">
          {BUSINESS.name.charAt(0)}
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
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.92 }}
        className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground hover:shadow-glow"
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

  return (
    <header className="glass-strong sticky top-0 z-40 border-b border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:gap-6 md:px-8 md:py-4">
        <div className="flex items-center gap-4">
          <LogoOrb />
          <div className="min-w-0">
            <p className="font-display text-lg font-bold leading-tight tracking-tight md:text-xl">
              {BUSINESS.name}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] leading-snug text-muted-foreground md:text-xs">
              <MapPin size={12} className="shrink-0" />
              <span className="truncate">{BUSINESS.address}</span>
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground md:text-xs">
              <Phone size={12} className="shrink-0" />
              {BUSINESS.phone}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 md:ml-auto md:justify-end">
          <div className="flex items-center gap-1.5">
            <SocialLink href={BUSINESS.email ? `mailto:${BUSINESS.email}` : "#"} label="Email us">
              <Mail size={16} />
            </SocialLink>
            <SocialLink href={BUSINESS.social.instagram} label="Instagram">
              <Instagram size={16} />
            </SocialLink>
            <SocialLink href={BUSINESS.social.facebook} label="Facebook">
              <Facebook size={16} />
            </SocialLink>
            <SocialLink href={BUSINESS.social.youtube} label="YouTube">
              <Youtube size={16} />
            </SocialLink>
          </div>
          <span className="glass hidden rounded-full px-3.5 py-1.5 text-xs text-muted-foreground sm:inline-block">
            {dateStr || "\u00A0"}
          </span>
        </div>
      </div>
    </header>
  );
}
