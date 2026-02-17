import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Heart, Package, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { listings, bookings } from "@/data/listings";

const tabs = [
  { id: "bookings", label: "My Bookings", icon: CalendarDays },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "listings", label: "My Listings", icon: Package },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-rentora py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-border mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors ${
              activeTab === tab.id ? "tab-active" : "tab-inactive"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const listing = listings.find((l) => l.id === booking.listingId);
            if (!listing) return null;
            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-rentora p-4 flex gap-4"
              >
                <img src={listing.image} alt={listing.title} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm">{listing.title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {listing.location}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{booking.date} · {booking.duration}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      booking.status === "Confirmed" ? "bg-green-100 text-green-700" :
                      booking.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {booking.status}
                    </span>
                    <span className="text-sm font-semibold text-foreground">₹{booking.total}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Wishlist Tab */}
      {activeTab === "wishlist" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.slice(0, 4).map((listing) => (
            <Link key={listing.id} to={`/listing/${listing.id}`} className="card-rentora overflow-hidden group">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm">{listing.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{listing.location}</p>
                <p className="text-sm font-semibold text-foreground mt-2">₹{listing.priceHourly}/hr</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* My Listings Tab */}
      {activeTab === "listings" && (
        <div className="text-center py-16">
          <Package size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-foreground font-medium">No listings yet</p>
          <p className="text-sm text-muted-foreground mt-1">Start earning by listing your space</p>
          <Link to="/add-listing" className="btn-primary inline-block mt-4">Add Listing</Link>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
