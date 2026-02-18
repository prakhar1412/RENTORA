import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CategoryBar from "@/components/CategoryBar";
import ListingCard from "@/components/ListingCard";
import SidebarFilters from "@/components/SidebarFilters";
import { AuroraBackgroundDemo } from "@/components/AuroraBackgroundDemo";
import { getListings } from "@/lib/listings-store";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [listingData, setListingData] = useState(() => getListings());

  useEffect(() => {
    // Re-fetch listings whenever component mounts to ensure fresh data
    setListingData(getListings());

    // Listen for updates
    const handleUpdate = () => setListingData(getListings());
    window.addEventListener("listings-updated", handleUpdate);
    return () => window.removeEventListener("listings-updated", handleUpdate);
  }, []);

  const filteredListings =
    activeCategory === "all"
      ? listingData
      : listingData.filter((l) => l.category === activeCategory);

  return (
    <>
      <AuroraBackgroundDemo />
      <CategoryBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <section className="container-rentora py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl font-bold">
              <span className="gradient-text">{filteredListings.length} spaces</span>
              <span className="text-foreground"> available</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Delhi · Noida · Greater Noida
            </p>
          </div>
          <SidebarFilters />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredListings.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>

        {filteredListings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block p-6 rounded-2xl glass-card">
              <p className="text-xl font-bold gradient-text">No listings found</p>
              <p className="text-sm text-muted-foreground mt-2">Try selecting a different category</p>
            </div>
          </motion.div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary/30 py-16 border-t border-border/50">
        <div className="container-rentora">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Creators & Professionals</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of people in Delhi NCR who are finding the perfect space for their next big idea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Found the perfect photography studio in South Delhi within minutes. The booking process was seamless!",
                author: "Priya Sharma",
                role: "Freelance Photographer"
              },
              {
                text: "Rentora helped our startup find affordable meeting rooms for client presentations without a long-term lease.",
                author: "Rahul Verma",
                role: "Startup Founder"
              },
              {
                text: "I rent out my recording equipment on weekends. Ideally easiest way to earn side income from my idle gear.",
                author: "Amit Kapoor",
                role: "Music Producer"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-2xl shadow-sm border border-border/50"
              >
                <div className="flex gap-1 mb-4 text-yellow-500">
                  {"★".repeat(5)}
                </div>
                <p className="text-foreground/80 mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-rentora py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mb-6">
              Have questions? We're here to help you find the answers you need.
            </p>
            <div className="relative h-64 w-full rounded-2xl overflow-hidden hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="FAQ Help"
                className="object-cover w-full h-full opacity-80"
              />
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does the booking process work?",
                a: "Simply browse for a space or tool, select your required dates and time, and click 'Reserve'. You'll be guided to a payment page to confirm your booking instantly."
              },
              {
                q: "Is there a cancellation policy?",
                a: "Yes, hosts set their own cancellation policies. Most spaces offer free cancellation up to 24 hours before the booking time. Check the listing details for specifics."
              },
              {
                q: "Can I list my own space?",
                a: "Absolutely! Click on 'List Your Space' in the menu, create an account, and follow the simple steps to add your property details and photos."
              },
              {
                q: "Are the payments secure?",
                a: "We use industry-standard encryption and trusted payment gateways to ensure your transaction details are always safe and secure."
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="border border-border rounded-xl p-5 hover:border-primary/50 transition-colors bg-card"
              >
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
