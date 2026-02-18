import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { getListings } from "@/lib/listings-store";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const listings = getListings();
  const wishlistItems = listings.slice(0, 6);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-rentora py-8">
      <h1 className="text-2xl font-bold text-foreground mb-1">Wishlist</h1>
      <p className="text-sm text-muted-foreground mb-8">{wishlistItems.length} saved spaces</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((listing, i) => (
          <ListingCard key={listing.id} listing={listing} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

export default Wishlist;
