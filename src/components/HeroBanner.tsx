import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2, GraduationCap, Headphones, Sparkles, Video } from "lucide-react";
import { useState } from "react";

import { BUSINESS, buildWhatsAppLink } from "@/data/catalog";

import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Hero Banner — First Impression Section
 * "Double Your Sales by Showing Videos of your Products"
 * "Sales - Jo dikhta hai wo bikta hai"
 * "Increase your sales by showing videos and pics to your clients"
 * Includes a small front-and-centre video preview demonstrating the power of video catalogs.
 */
export function HeroBanner({
  onOpenTraining,
  onOpenPricing,
  onOpenCustomerCare,
}: {
  onOpenTraining: () => void;
  onOpenPricing?: () => void;
  onOpenCustomerCare: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(true);

  const customerCareWhatsapp = buildWhatsAppLink(
    `Hi ${BUSINESS.name}! I need assistance regarding the digital video catalog and product inquiry.`,
  );

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#E8DFC9] bg-gradient-to-b from-[#FAF6EE] via-[#FDFBF7] to-[#F7F2E7] p-5 sm:p-8 lg:p-10 shadow-sm mb-6">
      {/* Decorative luxury background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12">
        {/* Left Column: First Impression Sales Copy */}
        <div className="space-y-4 lg:col-span-7">
          {/* Eyebrow badge: "Sales - Jo dikhta hai wo bikta hai" */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EFE4D0] px-3.5 py-1 text-xs font-bold text-[#7A5323] border border-[#DFCBB0] shadow-2xs">
            <Sparkles size={13} className="text-amber-700 animate-pulse" />
            <span>Sales — Jo Dikhta Hai Wo Bikta Hai</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15]">
            Double Your Sales by Showing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C733E] via-[#B68B59] to-[#7A5323] underline decoration-[#B68B59]/40 underline-offset-4">
              Videos
            </span>{" "}
            of your Products
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base leading-relaxed text-stone-600 max-w-xl font-normal">
            Increase your conversions dramatically by showing high-definition live videos and crisp photos to your clients. Bring luxury furniture, lighting, and decor to life with instant WhatsApp wholesale inquiries.
          </p>

          {/* Value Props Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-stone-700">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1 font-medium border border-stone-200/70 shadow-2xs">
              <CheckCircle2 size={13} className="text-emerald-600" />
              <span>4:3 Video & Photo Reels</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1 font-medium border border-stone-200/70 shadow-2xs">
              <CheckCircle2 size={13} className="text-emerald-600" />
              <span>Direct WhatsApp Buying</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1 font-medium border border-stone-200/70 shadow-2xs">
              <CheckCircle2 size={13} className="text-emerald-600" />
              <span>Commercial & Hotel Pricing</span>
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href="#product-01"
              className="inline-flex items-center gap-2 rounded-full bg-[#1C1917] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-stone-800 active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore Products</span>
              <ArrowDown size={14} />
            </a>

            <a
              href={customerCareWhatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#20bd5a] active:scale-95 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="h-4 w-4 text-white" />
              <span>Customer Care</span>
            </a>

            <button
              type="button"
              onClick={onOpenTraining}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-[#8A6331] border border-[#DECDB3] hover:bg-[#FBF8F2] active:scale-95 transition-all cursor-pointer shadow-2xs"
            >
              <GraduationCap size={15} />
              <span>Training (Guide)</span>
            </button>

            {onOpenPricing && (
              <button
                type="button"
                onClick={onOpenPricing}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-700 border border-stone-300/80 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer shadow-2xs"
              >
                <span>Pricing Plans</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: "small video of Showing Product by videos and make Good impact on clients" */}
        <div className="lg:col-span-5">
          <div className="group relative mx-auto overflow-hidden rounded-2xl border-2 border-[#D8C7AA] bg-stone-900 shadow-xl max-w-md">
            {/* Live Impact Badge */}
            <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-stone-950/80 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md border border-white/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <Video size={13} className="text-amber-300" />
              <span>Live Video Showcase</span>
            </div>

            {/* Video preview */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <video
                src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4"
                poster="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=70"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />

              {/* Bottom overlay inside video preview */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent p-4 text-white">
                <p className="font-serif text-sm font-bold text-amber-200">
                  Impact Demo: Real Furniture & Lighting Motion
                </p>
                <p className="text-[11px] text-stone-300">
                  Clients buy 3x faster when they can see texture, lighting & scale in motion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
