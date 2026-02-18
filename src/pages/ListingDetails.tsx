import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowLeft, Share, Heart, Wifi, Wind, Zap, Coffee, Printer, Users, Check } from "lucide-react";
import { getListings } from "@/lib/listings-store";
import BookingCard from "@/components/BookingCard";

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi, AC: Wind, "Power Backup": Zap, Cafeteria: Coffee,
  Printer: Printer, "Meeting Room": Users,
};

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allListings = getListings();
  const listing = allListings.find((l) => l.id === Number(id));

  if (!listing) {
    return (
      <div className="container-rentora py-20 text-center">
        <p className="text-lg font-medium text-foreground">Listing not found</p>
        <Link to="/" className="text-primary mt-2 inline-block hover:underline">Go back</Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-rentora py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} /> Back
        </Link>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-sm text-foreground hover:underline">
            <Share size={16} /> Share
          </button>
          <button className="flex items-center gap-1 text-sm text-foreground hover:underline">
            <Heart size={16} /> Save
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-foreground mb-1">{listing.title}</h1>
      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-5">
        <div className="flex items-center gap-1">
          <Star size={14} className="fill-foreground text-foreground" />
          <span className="text-foreground font-medium">{listing.rating}</span>
          <span>· {listing.reviews.length} reviews</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={14} /> {listing.location}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden mb-8">
        <div className="md:col-span-2 md:row-span-2">
          <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover aspect-square md:aspect-auto" />
        </div>
        {listing.images.slice(1, 5).map((img, i) => (
          <div key={i} className="hidden md:block">
            <img src={img} alt={`${listing.title} ${i + 2}`} className="w-full h-full object-cover aspect-square" />
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left - Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Host */}
          <div className="flex items-center justify-between pb-6 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Hosted by {listing.host}</h2>
              <p className="text-sm text-muted-foreground">{listing.category.replace("-", " ")} · {listing.location}</p>
            </div>
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">{listing.host[0]}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">About this space</h3>
            <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
          </div>

          {/* Amenities */}
          <div className="pb-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">What's included</h3>
            <div className="grid grid-cols-2 gap-3">
              {listing.amenities.map((amenity) => {
                const Icon = amenityIcons[amenity] || Check;
                return (
                  <div key={amenity} className="flex items-center gap-3 text-sm text-foreground">
                    <Icon size={18} className="text-muted-foreground" />
                    {amenity}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              <Star size={16} className="inline fill-foreground text-foreground mr-1" />
              {listing.rating} · {listing.reviews.length} reviews
            </h3>
            <div className="space-y-5">
              {listing.reviews.map((review, i) => (
                <div key={i} className="pb-5 border-b border-border last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-foreground">{review.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Booking Card */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <BookingCard listing={listing} />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Reserve */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 flex items-center justify-between lg:hidden z-40">
        <div>
          <span className="text-lg font-bold text-foreground">₹{listing.priceHourly}</span>
          <span className="text-muted-foreground text-sm"> /hour</span>
        </div>
        <button
          onClick={() => navigate(`/payment/${listing.id}`, {
            state: {
              duration: "hourly",
              hours: 2,
              date: new Date().toISOString().split('T')[0],
              price: listing.priceHourly * 2
            }
          })}
          className="btn-primary px-8"
        >
          Reserve
        </button>
      </div>
    </motion.div>
  );
};

export default ListingDetails;
