import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { BUSINESS } from "@/data/catalog";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-xl font-bold tracking-tight">{BUSINESS.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {BUSINESS.tagline}. Curated pieces delivered across India since {BUSINESS.established}.
          </p>
        </div>

        <div className="space-y-2.5 text-sm text-muted-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">
            Contact
          </p>
          <p className="flex items-start gap-2">
            <MapPin size={15} className="mt-0.5 shrink-0" />
            {BUSINESS.address}
          </p>
          <a href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 transition-colors hover:text-foreground">
            <Phone size={15} className="shrink-0" />
            {BUSINESS.phone}
          </a>
          <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 transition-colors hover:text-foreground">
            <Mail size={15} className="shrink-0" />
            {BUSINESS.email}
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80">Follow</p>
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
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:text-foreground hover:shadow-glow"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row md:px-8">
          <p>
            © {year} {BUSINESS.name}. All rights reserved.
          </p>
          <p>Demo catalog — business details & WhatsApp number live in one config file.</p>
        </div>
      </div>
    </footer>
  );
}
