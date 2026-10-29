import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import type { Product } from "@/data/catalog";

import { MediaCarousel } from "./MediaCarousel";
import { ProductDetails } from "./ProductDetails";
import { ShareButton } from "./ShareButton";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function ProductSection({ product }: { product: Product }) {
  return (
    <section id={product.id} className="scroll-mt-28 py-10 md:py-16">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="flex items-start justify-between gap-4">
          <motion.div variants={item} className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-glow">
              Product {product.index}
            </p>
            <h2 className="text-gradient font-display mt-2 text-2xl font-bold tracking-tight md:text-4xl">
              {product.name}
            </h2>
            <p className="mt-1.5 max-w-xl text-sm text-muted-foreground md:text-base">
              {product.subtitle}
            </p>
          </motion.div>
          <motion.div variants={item} className="shrink-0 pt-1">
            <ShareButton product={product} />
          </motion.div>
        </div>

        <motion.div variants={item} className="mt-7">
          <MediaCarousel media={product.media} />
        </motion.div>

        <motion.div variants={item}>
          <ProductDetails product={product} />
        </motion.div>
      </motion.div>
    </section>
  );
}
