import { Check, Sparkles, Tag, X } from "lucide-react";

import { BUSINESS, buildWhatsAppLink } from "@/data/catalog";

import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Pricing Plans Modal — "On up side: Pricing Plans"
 * Showcases B2B catalog packages and wholesale pricing tiers for clients.
 */
export function PricingPlansModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  const plans = [
    {
      name: "Retail & Studio",
      badge: "Single Orders",
      price: "Catalog List",
      desc: "For interior designers, boutique retail showrooms and home projects.",
      features: [
        "Standard Catalog Pricing",
        "Individual variant orders",
        "Direct door delivery",
        "GST Invoicing",
        "Standard 1-year warranty",
      ],
      isPopular: false,
    },
    {
      name: "Wholesale & Stockist",
      badge: "Most Popular",
      price: "15% – 25% Off",
      desc: "For multi-brand distributors, regional showrooms and retail partners.",
      features: [
        "Tiered Volume Discounts",
        "MOQ packaging per variant",
        "Priority dispatch (48 hours)",
        "B2B GST Input Credit",
        "Dedicated account manager",
      ],
      isPopular: true,
    },
    {
      name: "Hospitality & Hotels",
      badge: "Contract Tier",
      price: "Custom Contract",
      desc: "For luxury resorts, hotel chains, banquet halls & commercial buildings.",
      features: [
        "Exclusive & Inclusive pricing",
        "Custom finishes & canopy heights",
        "Turnkey installation support",
        "Stain-guard & fire-rated bouclé",
        "Onsite replacement guarantee",
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl border border-[#E8DFC9] bg-[#FAF8F5] p-5 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-200/70 text-stone-700 hover:bg-stone-300 transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#EAE2D5] pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EFE6D8] text-[#8A6331]">
            <Tag size={22} />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Pricing Plans & Wholesale Tiers
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Flexible purchasing tiers designed for studios, stockists, and luxury hotel projects
            </p>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all ${
                plan.isPopular
                  ? "border-[#B68B59] bg-white shadow-md ring-1 ring-[#B68B59]/30"
                  : "border-[#EFEAE2] bg-[#FCFAF6] shadow-2xs"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-[#B68B59] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                  {plan.badge}
                </span>
              )}

              <div>
                <h4 className="font-serif text-base font-bold text-stone-900">
                  {plan.name}
                </h4>
                <div className="mt-2 text-xl font-bold text-[#8A6331]">
                  {plan.price}
                </div>
                <p className="mt-1 text-xs text-stone-500 leading-snug">
                  {plan.desc}
                </p>

                <div className="my-4 border-t border-stone-200/70" />

                <ul className="space-y-2 text-xs text-stone-700">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check size={13} className="shrink-0 text-emerald-600 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={buildWhatsAppLink(
                  `Hi ${BUSINESS.name}! I would like to inquire about the *${plan.name}* pricing plan.`,
                )}
                target="_blank"
                rel="noreferrer"
                className={`mt-5 flex items-center justify-center gap-2 rounded-full py-2 text-xs font-bold transition-all ${
                  plan.isPopular
                    ? "bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-xs"
                    : "bg-[#1C1917] text-white hover:bg-stone-800"
                }`}
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

