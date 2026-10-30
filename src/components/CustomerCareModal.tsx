import { Clock, Headphones, Mail, MapPin, MessageSquare, Phone, ShieldCheck, X } from "lucide-react";

import { BUSINESS, buildWhatsAppLink } from "@/data/catalog";

import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Customer Care & Help Modal — "Customer Care with Sign and Help also + Whatsapp icon of Customer Service"
 */
export function CustomerCareModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  const directWhatsapp = buildWhatsAppLink(
    `Hi ${BUSINESS.name} Customer Care! I need help with an order/product catalog inquiry.`,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#E8DFC9] bg-[#FAF8F5] p-5 sm:p-7 shadow-2xl">
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
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Headphones size={22} />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Customer Care & Help Desk
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Direct assistance for wholesale buyers, hotels & retail clients
            </p>
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="mt-5 space-y-3">
          {/* WhatsApp Primary Support */}
          <a
            href={directWhatsapp}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between rounded-2xl bg-[#25D366] p-4 text-white shadow-md hover:bg-[#20bd5a] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <WhatsAppIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm">WhatsApp Priority Support</p>
                <p className="text-xs text-emerald-100">Average response time: &lt; 5 minutes</p>
              </div>
            </div>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold group-hover:bg-white group-hover:text-emerald-800 transition-colors">
              Chat Now
            </span>
          </a>

          {/* Phone Call */}
          <a
            href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 rounded-2xl border border-[#E8DFC9] bg-white p-3.5 text-stone-800 hover:border-amber-400 transition-colors"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF4EB] text-amber-800">
              <Phone size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">Telephone Helpline</p>
              <p className="text-xs text-stone-500">{BUSINESS.phone}</p>
            </div>
          </a>

          {/* Email Support */}
          <a
            href={`mailto:${BUSINESS.email}`}
            className="flex items-center gap-3 rounded-2xl border border-[#E8DFC9] bg-white p-3.5 text-stone-800 hover:border-amber-400 transition-colors"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF4EB] text-amber-800">
              <Mail size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">Email Inquiries</p>
              <p className="text-xs text-stone-500">{BUSINESS.email}</p>
            </div>
          </a>
        </div>

        {/* Operating Hours */}
        <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#EFE8DC] p-3 text-xs text-stone-700">
          <Clock size={15} className="text-amber-800 shrink-0" />
          <span>Showroom & Support: Mon – Sat, 10:00 AM – 8:00 PM IST</span>
        </div>
      </div>
    </div>
  );
}

