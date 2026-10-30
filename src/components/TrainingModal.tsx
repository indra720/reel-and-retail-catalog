import {
  BookOpen,
  Check,
  ChevronRight,
  GraduationCap,
  Layers,
  Sparkles,
  ToggleRight,
  Video,
  X,
} from "lucide-react";

import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Training Modal — "How to Use and Features on website"
 * Interactive guide for clients and sales reps to study how to navigate and use the video catalog.
 */
export function TrainingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  const trainingSteps = [
    {
      icon: Video,
      title: "1. 4:3 Video & Photo Showcase",
      desc: "Each product features live video reels and HD photos. The media automatically glides smoothly from right to left so you can inspect finish, texture, and light reflection.",
    },
    {
      icon: ToggleRight,
      title: "2. Hotel & Commercial Pricing Toggle",
      desc: "Planning a bulk project? Switch between 'Exclusive' (excluding taxes) and 'Inclusive' (including 18% GST & delivery) with the animated toggle on each product.",
    },
    {
      icon: WhatsAppIcon,
      isCustomIcon: true,
      title: "3. 1-Click WhatsApp Inquiries",
      desc: "Click 'Inquire on WhatsApp' on any product. It automatically drafts the model name, selected pricing option, and SKU directly to our wholesale sales team.",
    },
    {
      icon: Layers,
      title: "4. Category Filtering & MOQ",
      desc: "Use the top Category bar to filter by Lighting, Furniture, Decor, or Textiles. Check the MOQ badge on each card for minimum order packaging.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-[#E8DFC9] bg-[#FAF8F5] p-5 sm:p-7 shadow-2xl">
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
            <GraduationCap size={22} />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Catalog Training & How to Use
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              A quick guide to navigating product videos, specs, and wholesale quotes
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {trainingSteps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#EFEAE2] bg-white p-4 shadow-2xs"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAF4EB] text-[#9C733E]">
                  {step.isCustomIcon ? (
                    <WhatsAppIcon className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <step.icon size={16} />
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                  {step.title}
                </h4>
              </div>
              <p className="text-xs leading-relaxed text-stone-600 pl-10.5">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#F0E9DC] p-3.5 text-xs text-[#7A5323]">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-amber-700 shrink-0" />
            <span>Need personalized staff training? Our team provides live zoom walkthroughs.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#1C1917] px-4 py-1.5 font-bold text-white shadow-xs hover:bg-stone-800 cursor-pointer"
          >
            Got it, Let's Explore
          </button>
        </div>
      </div>
    </div>
  );
}

