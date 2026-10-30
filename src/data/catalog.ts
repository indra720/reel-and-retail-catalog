// ============================================================
// CENTRAL CATALOG CONFIG
// Everything business-specific lives here. Update this one file
// to make the site yours — no other code needs to change.
// ============================================================

export const BUSINESS = {
  // PLACEHOLDER — replace with the real WhatsApp number in E.164 digits
  // only (country code + number, no "+", no spaces). e.g. "919876543210"
  whatsappNumber: "91XXXXXXXXXX",
  name: "LUMINA Living",
  tagline: "Premium Collections for Homes, Hotels & Facilities",
  // Address config: flexible Shop, Hotel, or both
  addressLabel: "Shop", // "Shop" or "Hotel"
  address: "Shop 14, Trade Crest, MG Road, Indore, MP 452001",
  hotelAddressLabel: "Hotel",
  hotelAddress: "Suites 4-6, Grand Palm Galleria, Vijay Nagar, Indore, MP 452010",
  phone: "+91 98765 43210",
  email: "hello@luminaliving.in",
  established: "2016",
  social: {
    instagram: "https://instagram.com/luminaliving",
    facebook: "https://facebook.com/luminaliving",
    youtube: "https://youtube.com/@luminaliving",
  },
};

/** How long each IMAGE slide stays on screen before auto-advancing. */
export const MEDIA_CONFIG = {
  imageIntervalMs: 4500, // 4–5s — change to taste
};

export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

export type CategoryId = "all" | "lighting" | "furniture" | "decor" | "textiles";

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All Collections" },
  { id: "lighting", label: "Lighting" },
  { id: "furniture", label: "Furniture" },
  { id: "decor", label: "Decor" },
  { id: "textiles", label: "Textiles" },
];

export type Product = {
  id: string; // anchor id, e.g. "product-01"
  index: string; // display number, e.g. "01"
  name: string;
  subtitle: string;
  category: Exclude<CategoryId, "all">;
  price: string;
  priceNote: string;
  moq: string;
  description: string;
  features: string[];
  facilitiesLine: string;
  // 7b. Hotel / Facility Pricing Options
  hotelPriceExclusive?: string;
  hotelPriceInclusive?: string;
  hotelPriceNote?: string;
  media: MediaItem[];
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;
const poster = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

// Sample MP4s (free stock) + matching poster stills.
const V_BUNNY_2 = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4";
const V_BUNNY_5 = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_5MB.mp4";
const V_JELLY_2 = "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_2MB.mp4";
const V_JELLY_5 = "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_5MB.mp4";
const V_SINTEL = "https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_2MB.mp4";
const V_FLOWER = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const PRODUCTS: Product[] = [
  {
    id: "product-01",
    index: "01",
    name: "Aurora Halo Pendant",
    subtitle: "Sculptural layered-glass chandelier with dimmable halo core",
    category: "lighting",
    price: "₹12,499",
    priceNote: "per unit · incl. GST",
    moq: "MOQ 10 pieces",
    description:
      "The Aurora Halo Pendant is our signature statement light — three hand-blown glass rings suspended around a dimmable LED halo that shifts from warm amber to cool moonlit white. Each piece is assembled and balanced by hand, so the cascade hangs perfectly true the moment it leaves the box.",
    features: [
      "Hand-blown borosilicate glass rings",
      "Dimmable 2700K–6000K LED core (remote included)",
      "Adjustable drop height up to 1.8 m",
      "Brushed brass or matte black canopy",
      "2-year onsite warranty",
    ],
    facilitiesLine: "Also available for hotels & facilities",
    hotelPriceExclusive: "₹9,800/unit",
    hotelPriceInclusive: "₹11,564/unit",
    hotelPriceNote: "Commercial pricing (20+ units)",
    media: [
      { type: "image", src: img("photo-1507473885765-e6ed057f782c"), alt: "Aurora Halo Pendant glowing over a dining table" },
      { type: "video", src: V_BUNNY_2, poster: poster("photo-1513506003901-1e6a229e2d15"), alt: "Halo light sequence in motion" },
      { type: "image", src: img("photo-1616594039964-ae9021a400a0"), alt: "Pendant detail against a dark wall" },
      { type: "video", src: V_JELLY_2, poster: poster("photo-1524758631624-e2822e304c36"), alt: "Ambient installation footage" },
      { type: "image", src: img("photo-1513506003901-1e6a229e2d15"), alt: "Warm evening mood lighting" },
      { type: "video", src: V_SINTEL, poster: poster("photo-1616486338812-3dadae4b4ace"), alt: "Showroom walkthrough clip" },
      { type: "image", src: img("photo-1540932239986-30128078f3c5"), alt: "Luxury pendant cluster installation" },
      { type: "video", src: V_FLOWER, poster: poster("photo-1507473885765-e6ed057f782c"), alt: "Dynamic light dimming demo" },
      { type: "image", src: img("photo-1524758631624-e2822e304c36"), alt: "Architectural ceiling canopy detail" },
      { type: "video", src: V_BUNNY_5, poster: poster("photo-1540932239986-30128078f3c5"), alt: "Hotel suite illumination reel" },
    ],
  },
  {
    id: "product-02",
    index: "02",
    name: "Cloud Nine Modular Sofa",
    subtitle: "Deep-seat modular lounge in feather-touch performance bouclé",
    category: "furniture",
    price: "₹89,999",
    priceNote: "3-seat configuration",
    moq: "MOQ 5 units",
    description:
      "Cloud Nine is built around a kiln-dried hardwood frame and dual-density foam wrapped in a feather-blend topper — the sink-in feel of a hotel lobby sofa that still keeps its shape after years of daily use. Rearrange the modules into a chaise, a corner pit or a full theatre layout without tools.",
    features: [
      "Kiln-dried hardwood frame, 10-year structural warranty",
      "Removable, washable performance bouclé covers",
      "Tool-free modular reconfiguration",
      "Stain-guard treated upholstery",
      "Available in 6 weaves & 14 colours",
    ],
    facilitiesLine: "Also available for hotels & facilities",
    hotelPriceExclusive: "₹72,000/unit",
    hotelPriceInclusive: "₹84,960/unit",
    hotelPriceNote: "Hospitality grade performance bouclé",
    media: [
      { type: "image", src: img("photo-1555041469-a586c61ea9bc"), alt: "Cloud Nine sofa in a bright living room" },
      { type: "video", src: V_JELLY_5, poster: poster("photo-1493663284031-b7e3aefcae8e"), alt: "Fabric texture close-up footage" },
      { type: "image", src: img("photo-1493809842364-78817add7ffb"), alt: "Modular corner configuration" },
      { type: "video", src: V_BUNNY_2, poster: poster("photo-1524758631624-e2822e304c36"), alt: "Showroom lounge clip" },
      { type: "image", src: img("photo-1493663284031-b7e3aefcae8e"), alt: "Bouclé weave detail" },
      { type: "video", src: V_SINTEL, poster: poster("photo-1586023492125-27b2c045efd7"), alt: "Modular reconfiguration demo" },
      { type: "image", src: img("photo-1618221195710-dd6b41faaea6"), alt: "Deep-seat lounge arrangement" },
      { type: "video", src: V_FLOWER, poster: poster("photo-1555041469-a586c61ea9bc"), alt: "Cushion resilience & rebound test" },
      { type: "image", src: img("photo-1586023492125-27b2c045efd7"), alt: "Contemporary resort lobby setting" },
      { type: "video", src: V_JELLY_2, poster: poster("photo-1618221195710-dd6b41faaea6"), alt: "Full modular suite walkthrough" },
    ],
  },
  {
    id: "product-03",
    index: "03",
    name: "Obsidian Accent Chair",
    subtitle: "Sculptulated shell chair with smoked-glass lacquer finish",
    category: "furniture",
    price: "₹34,500",
    priceNote: "per unit",
    moq: "MOQ 8 pieces",
    description:
      "A single-piece moulded shell finished in seven layers of smoked lacquer, polished to a wet-look sheen. The Obsidian pairs with dining tables, reading corners and reception desks alike, and its high-gloss surface wipes clean in seconds — a favourite for high-traffic lobbies.",
    features: [
      "Seven-layer hand-polished lacquer shell",
      "Powder-coated steel swivel base",
      "Full 360° return-memory swivel",
      "High-density seat core, no sag guarantee",
      "Indoor & covered-outdoor rated",
    ],
    facilitiesLine: "Also available for hotels & facilities",
    hotelPriceExclusive: "₹27,600/unit",
    hotelPriceInclusive: "₹32,568/unit",
    hotelPriceNote: "Lobby & suite contract specifications",
    media: [
      { type: "image", src: img("photo-1567538096630-e0c55bd6374c"), alt: "Obsidian chair in a styled room" },
      { type: "video", src: V_BUNNY_5, poster: poster("photo-1586023492125-27b2c045efd7"), alt: "Swivel motion demonstration" },
      { type: "image", src: img("photo-1522708323590-d24dbb6b0267"), alt: "Chair beside a lounge window" },
      { type: "video", src: V_FLOWER, poster: poster("photo-1616486338812-3dadae4b4ace"), alt: "Gloss finish highlight reel" },
      { type: "image", src: img("photo-1586023492125-27b2c045efd7"), alt: "Armchair profile view" },
      { type: "video", src: V_JELLY_2, poster: poster("photo-1567538096630-e0c55bd6374c"), alt: "360-degree rotation reel" },
      { type: "image", src: img("photo-1580481077195-c328a37db71a"), alt: "Modern silhouette studio lighting" },
      { type: "video", src: V_SINTEL, poster: poster("photo-1522708323590-d24dbb6b0267"), alt: "Hotel reception placement clip" },
      { type: "image", src: img("photo-1503602642458-232111445657"), alt: "Sculptural shell curvature detail" },
      { type: "video", src: V_BUNNY_2, poster: poster("photo-1580481077195-c328a37db71a"), alt: "Comfort seating test" },
    ],
  },
  {
    id: "product-04",
    index: "04",
    name: "Nimbus Silk Bedding Set",
    subtitle: "22-momme mulberry silk sheets with cooling weave",
    category: "textiles",
    price: "₹18,999",
    priceNote: "king size · 5-piece set",
    moq: "MOQ 20 sets",
    description:
      "Woven from 22-momme mulberry silk with a matte sateen face, the Nimbus set feels cool on contact and regulates through the night — the same spec we supply to boutique resort suites. Channels are double-stitched, and the fitted sheet pockets up to 40 cm mattresses.",
    features: [
      "100% Grade-6A mulberry silk, 22 momme",
      "OEKO-TEX certified, skin-safe dyes",
      "Deep-pocket fitted sheet (up to 40 cm)",
      "Naturally hypoallergenic & dust-mite resistant",
      "Matching shams & runner included",
    ],
    facilitiesLine: "Also available for hotels & facilities",
    hotelPriceExclusive: "₹14,900/set",
    hotelPriceInclusive: "₹17,582/set",
    hotelPriceNote: "Resort suite linen bulk orders",
    media: [
      { type: "image", src: img("photo-1505693416388-ac5ce068fe85"), alt: "Nimbus silk bedding on a made bed" },
      { type: "video", src: V_JELLY_2, poster: poster("photo-1538688525198-9b88f6f53126"), alt: "Silk drape movement footage" },
      { type: "image", src: img("photo-1538688525198-9b88f6f53126"), alt: "Styled suite bedroom" },
      { type: "video", src: V_SINTEL, poster: poster("photo-1567016432779-094069958ea5"), alt: "Resort suite walkthrough" },
      { type: "image", src: img("photo-1567016432779-094069958ea5"), alt: "Pillow & sham detail" },
      { type: "video", src: V_BUNNY_2, poster: poster("photo-1505693416388-ac5ce068fe85"), alt: "Silk sheen in natural sunlight" },
      { type: "image", src: img("photo-1522771739844-6a9f6d5f14af"), alt: "Crisp folded luxury linens" },
      { type: "video", src: V_FLOWER, poster: poster("photo-1522771739844-6a9f6d5f14af"), alt: "Breathability & cooling weave demo" },
      { type: "image", src: img("photo-1616486338812-3dadae4b4ace"), alt: "Hotel master suite view" },
      { type: "video", src: V_JELLY_5, poster: poster("photo-1567016432779-094069958ea5"), alt: "Unboxing & packaging reveal" },
    ],
  },
  {
    id: "product-05",
    index: "05",
    name: "Prism Glass Vase Trio",
    subtitle: "Faceted crystal vases with refractive prism base",
    category: "decor",
    price: "₹6,750",
    priceNote: "set of 3",
    moq: "MOQ 24 sets",
    description:
      "Cut from lead-free crystal, each Prism vase bends candlelight and daylight into soft rainbows across your table. The trio nests as a centrepiece or scatters as accents, and every base is ground flat so glass never rings or scratches the surface beneath.",
    features: [
      "Lead-free hand-cut crystal",
      "Flat-ground, scratch-free bases",
      "Three heights: 18 / 26 / 34 cm",
      "Gift-boxed with velvet liners",
      "Dishwasher-safe (top rack)",
    ],
    facilitiesLine: "Also available for hotels & facilities",
    hotelPriceExclusive: "₹5,200/set",
    hotelPriceInclusive: "₹6,136/set",
    hotelPriceNote: "Turnkey banquet & tabletop decor",
    media: [
      { type: "image", src: img("photo-1416879595882-3373a0480b5b"), alt: "Prism vases with fresh stems" },
      { type: "video", src: V_FLOWER, poster: poster("photo-1543198126-a8ad8e47fb22"), alt: "Light refraction through crystal" },
      { type: "image", src: img("photo-1543198126-a8ad8e47fb22"), alt: "Trio on a console table" },
      { type: "video", src: V_BUNNY_2, poster: poster("photo-1513694203232-719a280e022f"), alt: "Styling ideas clip" },
      { type: "image", src: img("photo-1513694203232-719a280e022f"), alt: "Vases in a styled interior" },
      { type: "video", src: V_JELLY_5, poster: poster("photo-1524758631624-e2822e304c36"), alt: "Gift packaging reveal" },
      { type: "image", src: img("photo-1578749556568-bc2c40e68b61"), alt: "Refractive crystal close-up" },
      { type: "video", src: V_SINTEL, poster: poster("photo-1578749556568-bc2c40e68b61"), alt: "Banquet table setting clip" },
      { type: "image", src: img("photo-1600585154340-be6161a56a0c"), alt: "Luxury banquet table display" },
      { type: "video", src: V_BUNNY_5, poster: poster("photo-1416879595882-3373a0480b5b"), alt: "Daylight prism effect demo" },
    ],
  },
];

// ---------- 7a. Terms & Conditions of Seller ----------

export interface TermItem {
  id: number;
  title: string;
  detail: string;
}

export const TERMS_AND_CONDITIONS: TermItem[] = [
  {
    id: 1,
    title: "Payment Terms",
    detail: "50% advance upon order confirmation, balance 50% prior to dispatch. Direct bank transfer (NEFT/RTGS/IMPS) accepted.",
  },
  {
    id: 2,
    title: "Delivery & Lead Time",
    detail: "Standard inventory dispatched in 2–4 business days. Custom architectural / hotel orders require 12–18 business days depending on volume.",
  },
  {
    id: 3,
    title: "Returns & Replacements",
    detail: "All consignments are transit-insured. 100% replacement guaranteed for transit damage reported with unboxing video within 48 hours.",
  },
  {
    id: 4,
    title: "MOQ & Customization Policy",
    detail: "Minimum Order Quantities apply per variant. Bespoke canopy heights, finishes, and contract packaging available for bulk orders.",
  },
  {
    id: 5,
    title: "GST & Commercial Taxes",
    detail: "All quotes and orders are billed with official GST tax invoices eligible for full B2B input tax credit.",
  },
  {
    id: 6,
    title: "Validity of Prices",
    detail: "Quoted catalog and wholesale prices remain valid for 30 calendar days from the date of WhatsApp or email quote generation.",
  },
];

// ---------- helpers used across components ----------

/** Anchor URL for a product, e.g. https://site.com/#product-01 */
export function productShareUrl(product: Product): string {
  if (typeof window === "undefined") return `#${product.id}`;
  return `${window.location.origin}${window.location.pathname}#${product.id}`;
}

export function productInquiryMessage(
  product: Product,
  hotelPricingOption?: "Exclusive" | "Inclusive",
): string {
  let msg = `Hi ${BUSINESS.name}! I'm interested in *${product.name}* (${product.price}). Please share catalogue, MOQ and delivery details.`;
  if (hotelPricingOption) {
    const priceStr =
      hotelPricingOption === "Inclusive"
        ? product.hotelPriceInclusive
        : product.hotelPriceExclusive;
    msg += `\n(Hotel/Facility Pricing: ${hotelPricingOption}${priceStr ? ` · ${priceStr}` : ""})`;
  }
  return msg;
}

export function buildWhatsAppLink(text: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
