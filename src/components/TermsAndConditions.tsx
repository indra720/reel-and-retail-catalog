import { ChevronDown, FileText, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { TERMS_AND_CONDITIONS } from "@/data/catalog";
import { cn } from "@/lib/utils";

/**
 * 7a. TERMS & CONDITIONS OF SELLER:
 * - Clean card at the very end of the catalog (above the footer).
 * - Numbered list of seller's terms for clients (payment, delivery, returns, MOQ, GST, price validity).
 * - Central array in catalog.ts so the owner can edit easily.
 * - Collapsible on mobile ("View all terms" / "View fewer terms").
 */
export function TermsAndConditions() {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <section className="my-8 rounded-3xl border border-[#E8E2D8] bg-white p-5 sm:p-7 lg:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EBE1] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-[#F5EFE6] text-[#9C733E] border border-[#E8DFC9]">
            <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900">
              Terms & Conditions
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Official seller terms & procurement guidelines for wholesale and hotel clients
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#9C733E] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#EFE9DF]">
          <FileText className="h-3.5 w-3.5" />
          <span>Client Procurement Policy</span>
        </div>
      </div>

      {/* Numbered Terms Grid */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TERMS_AND_CONDITIONS.map((term, index) => {
          const isHiddenOnMobile = !mobileExpanded && index >= 3;
          return (
            <div
              key={term.id}
              className={cn(
                "rounded-2xl border border-[#EFEAE2] bg-[#FBF9F5] p-4 transition-all duration-200 hover:border-[#D5C7B2] hover:bg-[#FAF6EE]",
                isHiddenOnMobile && "hidden sm:block",
              )}
            >
              <div className="flex items-baseline gap-2.5 mb-1.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EFE6D8] text-[11px] font-bold text-[#8A6331]">
                  {String(term.id).padStart(2, "0")}
                </span>
                <h4 className="text-xs sm:text-[13px] font-bold text-stone-900">
                  {term.title}
                </h4>
              </div>
              <p className="text-[11px] sm:text-xs leading-relaxed text-stone-600 pl-8">
                {term.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile Collapsible Button */}
      <div className="mt-4 flex justify-center sm:hidden">
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#F5EFE6] px-4 py-2 text-xs font-bold text-[#9C733E] border border-[#E8DFC9] active:scale-95 transition-all cursor-pointer"
        >
          <span>{mobileExpanded ? "View fewer terms" : "View all terms (6)"}</span>
          <ChevronDown
            size={14}
            className={cn("transition-transform duration-200", mobileExpanded && "rotate-180")}
          />
        </button>
      </div>
    </section>
  );
}

