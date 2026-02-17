import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star, MapPin } from "lucide-react";
import type { Listing } from "@/data/listings";
import { useState } from "react";

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

const ListingCard = ({ listing, index = 0 }: ListingCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link to={`/listing/${listing.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg group-hover:shadow-2xl transition-all duration-500">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Glassmorphism wishlist button */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              setWishlisted(!wishlisted);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-card/70 backdrop-blur-md hover:bg-card/90 transition-all duration-300 shadow-lg border border-white/20"
          >
            <motion.div
              animate={wishlisted ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Heart
                size={18}
                className={wishlisted ? "fill-red-500 text-red-500" : "text-foreground"}
              />
            </motion.div>
          </motion.button>
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
              {listing.title}
            </h3>
            <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full bg-primary/10">
              <Star size={14} className="fill-primary text-primary" />
              <span className="text-sm font-semibold text-primary">{listing.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin size={13} />
            <span className="text-sm">{listing.location}</span>
          </div>
          <div className="pt-1">
            <p className="text-sm text-foreground font-medium">
              <span className="text-base font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ₹{listing.priceHourly}
              </span>
              <span className="text-muted-foreground"> /hour</span>
              <span className="text-muted-foreground mx-1.5">•</span>
              <span className="font-semibold">₹{listing.priceDaily}</span>
              <span className="text-muted-foreground"> /day</span>
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
