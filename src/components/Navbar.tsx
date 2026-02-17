import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, User, Search, MapPin, Map as MapIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[5000] border-b transition-all duration-300 ${scrolled
        ? "bg-background/80 backdrop-blur-xl shadow-lg border-border/50 py-2"
        : "bg-transparent border-transparent py-4"
        }`}
    >
      <div className="container-rentora flex items-center justify-between gap-4">
        {/* Logo with gradient */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <img
            src="/rentora.gif"
            alt="Rentora Logo"
            className="w-9 h-9 rounded-xl shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-105"
          />
          <span className="logo-text text-xl font-bold text-foreground hidden sm:block group-hover:text-primary transition-colors">
            RENTORA
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <SearchBar />
        </div>

        {/* Mobile Search Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSearch(!showSearch)}
          className="md:hidden p-2.5 rounded-full border-2 border-border hover:border-primary/50 hover:bg-secondary transition-all shadow-sm"
        >
          <Search size={18} className="text-foreground" />
        </motion.button>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link
            to="/map"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            <MapIcon size={18} />
            <span>Map View</span>
          </Link>
          <Link
            to="/add-listing"
            className="hidden md:block text-sm font-semibold text-foreground hover:text-primary bg-secondary hover:bg-secondary/80 rounded-full px-5 py-2.5 transition-all duration-300 border border-border/50 hover:border-primary/30 hover:shadow-md"
          >
            List Your Space
          </Link>

          {/* Avatar / Menu */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 border-2 border-border rounded-full py-2 px-3 hover:shadow-lg hover:border-primary/30 transition-all duration-300 bg-card"
          >
            <Menu size={16} className="text-muted-foreground" />
            <div className="w-7 h-7 gradient-accent rounded-full flex items-center justify-center shadow-md">
              <User size={14} className="text-white" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden px-4 pb-3 pt-2"
        >
          <SearchBar />
        </motion.div>
      )}

      {/* Dropdown Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute right-4 top-full mt-2 w-64 glass-card py-2 z-50 overflow-hidden"
        >
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all"
          >
            Dashboard
          </Link>
          <Link
            to="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all"
          >
            Wishlist
          </Link>
          <Link
            to="/add-listing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all"
          >
            List Your Space
          </Link>
          <div className="border-t border-border/30 my-2" />
          <Link
            to="/signup"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
          >
            Log In
          </Link>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
