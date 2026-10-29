import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CategoryId } from "@/data/catalog";

export function CategoryNav({
  categories,
  active,
  onChange,
}: {
  categories: { id: CategoryId; label: string }[];
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}) {
  return (
    <div className="no-scrollbar -mx-4 overflow-x-auto px-4 pb-1 md:-mx-8 md:px-8">
      <div className="flex w-max items-center gap-2 py-2">
        {categories.map((category) => {
          const isActive = category.id === active;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              aria-pressed={isActive}
              className={cn(
                "relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "text-foreground"
                  : "glass text-muted-foreground hover:-translate-y-0.5 hover:text-foreground hover:shadow-glow",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="category-active-pill"
                  className="pill-active absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
