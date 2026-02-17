import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarFiltersProps {
  onFilterChange?: (filters: Record<string, string>) => void;
}

const locations = ["All Locations", "Delhi", "Noida", "Greater Noida"];
const priceRanges = ["Any Price", "Under ₹500", "₹500 - ₹2000", "₹2000+"];

const SidebarFilters = ({ onFilterChange }: SidebarFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("All Locations");
  const [priceRange, setPriceRange] = useState("Any Price");

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-foreground/20 z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-card shadow-2xl z-50 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-secondary rounded-full transition-colors">
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>

              {/* Location */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Location</h3>
                <div className="space-y-2">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setLocation(loc)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                        location === loc
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setPriceRange(range)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                        priceRange === range
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full text-center mt-4"
              >
                Show Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarFilters;
