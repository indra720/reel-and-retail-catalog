# Reel And Retail Catalog

most important ui show honi chiye okk

Build an ultra-premium, animated, futuristic 3D Product Catalog website. It must look like an Awwwards-winning site, not a normal e-commerce template. Follow the attached handwritten sketch for structure; only upgrade the visuals.

STACK: React + Vite + TypeScript + Tailwind + Framer Motion + Lucide icons. Reusable components: Header, CategoryNav, ProductSection, MediaCarousel, ProductDetails, ShareButton, WhatsAppButton, Footer. Keep all product data and the WhatsApp number in one central data/config file.

COLORS (dark premium): background midnight navy #080B1A, indigo #4F46E5, violet #8B5CF6, cyan #22D3EE, text #F8FAFC, muted #94A3B8. Use glassmorphism, soft glows, animated gradient borders, subtle floating background orbs. Controlled neon only, no childish effects. Fonts: Space Grotesk (headings) + Inter (body).

HEADER (from sketch): big round 3D logo on the left; business name; address; contact; email, Instagram, Facebook, YouTube icons with hover animation; current date on the top right. Sticky with backdrop blur. Clean stacked layout on mobile.

CATEGORY NAV: horizontally scrollable glass pill buttons. Active pill = animated gradient border + glow. Hover = 3D lift. Clicking filters products with smooth animated transition.

PRODUCT SECTIONS (most important): products stack vertically (scroll up/down). Each product has: "Product 01" label, name, subtitle, a prominent Share button, then ONE very large cinematic media box divided into 4 connected panels (like my sketch), then Price, Description (expandable), MOQ badge, features/specs, and a line "Also available for hotels & facilities", plus a WhatsApp inquiry button. Each product has its own independent gallery.

MEDIA BOX — CRITICAL: Each product has a mixed playlist of multiple images AND multiple videos.
- Auto-slides: images advance every 4-5 seconds (configurable).
- Videos autoplay automatically when their slide becomes active (muted, inline, playsInline).
- While a video plays, the image timer is paused. When the video ends, auto-advance to the next slide. Never cut a video halfway.
- Only the active video plays; previous video pauses and resets. No hidden background playback.
- Smooth crossfade + subtle zoom transitions, progress bar/indicators, counter (e.g. 2/6), prev/next arrows, swipe on mobile, keyboard arrows, fullscreen option, mute/unmute toggle.
- Pause when the tab is hidden, respect prefers-reduced-motion, handle autoplay failure gracefully, show a fallback if media fails to load.
- The 4 panels should feel like ONE unified cinematic gallery: the active/centre panel is biggest, the others show adjacent previews with perspective depth. On mobile: larger active area, smaller previews.

3D & MOTION: subtle pointer-based 3D tilt on cards (disabled on mobile), hover lift, glow, scroll-triggered staggered reveals, magnetic buttons (restrained). Smooth and fast, no heavy particles.

WHATSAPP: floating pulsing WhatsApp button + per-product button. Use https://wa.me/<number>?text=<encoded message with the product name>. Put a clearly marked placeholder number in config (e.g. 91XXXXXXXXXX).

SHARE: per-product Share button using the Web Share API with that product's own URL (anchor like #product-01), fallback copy-to-clipboard with a small "Link copied" toast.

FOOTER: business details, contact links, social icons.

RESPONSIVE: perfect on mobile, tablet, desktop; no horizontal overflow.

DEMO DATA: at least 4 products, each with different name, price, description, MOQ, and 4-6 media items (mix of Unsplash images and free sample MP4 videos with poster images). Every control must actually work; no dead buttons.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://reel-and-retail-catalog.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f71bd125-249c-424c-8960-8289c2df9c12).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
