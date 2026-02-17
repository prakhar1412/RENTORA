import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Monitor, Users, Camera, Wrench, PartyPopper, Car,
  ChefHat, Warehouse, Dumbbell, Music, Aperture, GraduationCap,
} from "lucide-react";
import { categories } from "@/data/listings";

const iconMap: Record<string, React.ElementType> = {
  Monitor, Users, Camera, Wrench, PartyPopper, Car,
  ChefHat, Warehouse, Dumbbell, Music, Aperture, GraduationCap,
};

interface CategoryBarProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

const CategoryBar = ({ activeCategory, onCategoryChange }: CategoryBarProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="border-b border-border/50 bg-card/95 backdrop-blur-lg sticky top-[57px] z-40 shadow-sm">
      <div className="container-rentora relative group">

        {/* Left Arrow */}
        {showLeftArrow && (
          <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pr-10 bg-gradient-to-r from-card to-transparent pl-2">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 rounded-full border border-border bg-background shadow-md hover:scale-110 transition-transform"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <motion.button
            onClick={() => onCategoryChange("all")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`category-pill shrink-0 ${activeCategory === "all"
              ? "category-pill-active text-white"
              : ""
              }`}
          >
            <div className={`px-4 py-2 rounded-xl transition-all duration-300 ${activeCategory === "all"
              ? "gradient-primary shadow-lg"
              : "hover:bg-secondary"
              }`}>
              <span className="text-xs font-semibold whitespace-nowrap">All Spaces</span>
            </div>
          </motion.button>
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon];
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`category-pill shrink-0 ${isActive ? "category-pill-active" : ""}`}
              >
                <div className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-300 ${isActive
                  ? "gradient-primary shadow-lg text-white"
                  : "hover:bg-secondary"
                  }`}>
                  {Icon && <Icon size={20} className={isActive ? "text-white" : ""} />}
                  <span className="text-xs font-medium whitespace-nowrap">{cat.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center pl-10 bg-gradient-to-l from-card to-transparent pr-2">
            <button
              onClick={() => scroll("right")}
              className="p-1.5 rounded-full border border-border bg-background shadow-md hover:scale-110 transition-transform"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryBar;
