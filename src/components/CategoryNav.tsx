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
    <div className="no-scrollbar overflow-x-auto py-1">
      <div className="flex w-max items-center gap-2">
        {categories.map((category) => {
          const isActive = category.id === active;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              aria-pressed={isActive}
              className={cn(
                "relative rounded-full px-4.5 py-1.5 text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer",
                isActive
                  ? "text-white shadow-xs"
                  : "bg-white/90 text-stone-600 border border-[#E8E2D8] hover:border-amber-400 hover:text-stone-900 shadow-xs",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="category-active-pill"
                  className="absolute inset-0 rounded-full bg-stone-900 shadow-xs"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
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
