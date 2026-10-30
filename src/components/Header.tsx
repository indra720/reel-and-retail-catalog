import { motion } from "framer-motion";
import {
  Facebook,
  GraduationCap,
  Headphones,
  HelpCircle,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Tag,
  Youtube,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

import { CustomerCareModal } from "@/components/CustomerCareModal";
import { PricingPlansModal } from "@/components/PricingPlansModal";
import { TrainingModal } from "@/components/TrainingModal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { BUSINESS } from "@/data/catalog";
import { Magnetic } from "@/components/Magnetic";

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

export function Header({
  isTrainingOpen,
  setIsTrainingOpen,
  isPricingOpen,
  setIsPricingOpen,
  isCustomerCareOpen,
  setIsCustomerCareOpen,
}: {
  isTrainingOpen?: boolean;
  setIsTrainingOpen?: (v: boolean) => void;
  isPricingOpen?: boolean;
  setIsPricingOpen?: (v: boolean) => void;
  isCustomerCareOpen?: boolean;
  setIsCustomerCareOpen?: (v: boolean) => void;
}) {
  const [dateStr, setDateStr] = useState("");
  const [localTrainingOpen, setLocalTrainingOpen] = useState(false);
  const [localPricingOpen, setLocalPricingOpen] = useState(false);
  const [localCustomerCareOpen, setLocalCustomerCareOpen] = useState(false);

  const trainingOpen = isTrainingOpen ?? localTrainingOpen;
  const setTraining = setIsTrainingOpen ?? setLocalTrainingOpen;

  const pricingOpen = isPricingOpen ?? localPricingOpen;
  const setPricing = setIsPricingOpen ?? setLocalPricingOpen;

  const careOpen = isCustomerCareOpen ?? localCustomerCareOpen;
  const setCare = setIsCustomerCareOpen ?? setLocalCustomerCareOpen;

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
    <>
      <header className="sticky top-0 z-40 border-b border-[#E8E2D8] bg-[#FBF9F5]/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto max-w-[1500px] px-3.5 py-2 sm:px-5 sm:py-2.5 lg:px-5">
          {/* Main Row */}
          <div className="flex items-center justify-between gap-3">
            {/* Logo & Desktop Addresses */}
            <div className="flex items-center gap-5">
              <LuxuryLogo />

              {/* Desktop: Small label chips before each address on separate lines */}
              {addresses.length > 0 && (
                <div className="hidden border-l border-stone-300/60 pl-4 lg:flex lg:flex-col lg:justify-center lg:gap-0.5">
                  {addresses.map((item, idx) => (
                    <p key={idx} className="flex items-center gap-1.5 text-[10.5px] text-stone-600">
                      <MapPin size={10} className="shrink-0 text-amber-700" />
                      <span className="rounded bg-amber-100/90 px-1.5 py-0.2 text-[8.5px] font-bold uppercase tracking-wider text-amber-900 border border-amber-200/80">
                        {item.label}
                      </span>
                      <span className="truncate max-w-xs">{item.address}</span>
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Middle Nav Items: "On up side: Pricing Plans, Solutions, Training, Customer Care" */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="#solutions"
                className="rounded-full px-3 py-1 text-xs font-semibold text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 transition-colors"
              >
                Solutions
              </a>

              <button
                type="button"
                onClick={() => setPricing(true)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 transition-colors cursor-pointer"
              >
                <Tag size={13} className="text-[#8A6331]" />
                <span>Pricing Plans</span>
              </button>

              <button
                type="button"
                onClick={() => setTraining(true)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-[#8A6331] bg-[#F5EFE6] border border-[#E8DFC9] hover:bg-[#EFE5D7] transition-colors cursor-pointer"
              >
                <GraduationCap size={13} />
                <span>Training</span>
              </button>

              <button
                type="button"
                onClick={() => setCare(true)}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <Headphones size={13} className="text-emerald-700" />
                <span>Customer Care</span>
                <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-600" />
              </button>
            </div>

            {/* Desktop Right Side: 4 Social Links + Date Pill */}
            <div className="hidden sm:flex items-center gap-2.5">
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
              <span className="rounded-full border border-stone-200/90 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-stone-700 shadow-xs">
                {dateStr || "\u00A0"}
              </span>
            </div>

            {/* Mobile Right Side: Quick Action Pills */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCare(true)}
                className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-800 border border-emerald-200"
              >
                <Headphones size={11} />
                <WhatsAppIcon className="h-3 w-3 text-emerald-600" />
              </button>
              <button
                type="button"
                onClick={() => setTraining(true)}
                className="inline-flex items-center gap-1 rounded-full bg-[#F5EFE6] px-2 py-1 text-[10px] font-bold text-[#8A6331] border border-[#E8DFC9]"
              >
                <GraduationCap size={11} />
                <span>Guide</span>
              </button>
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
        </div>
      </header>

      {/* Global Modals */}
      <TrainingModal isOpen={trainingOpen} onClose={() => setTraining(false)} />
      <PricingPlansModal isOpen={pricingOpen} onClose={() => setPricing(false)} />
      <CustomerCareModal isOpen={careOpen} onClose={() => setCare(false)} />
    </>
  );
}
