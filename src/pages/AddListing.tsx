import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Upload, MapPin, X } from "lucide-react";
import { categories } from "@/data/listings";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { addListing } from "@/lib/listings-store";

const steps = ["Basic Info", "Location", "Pricing", "Availability", "Review"];

const AddListing = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "", category: "", description: "",
    location: "", address: "",
    priceHourly: "", priceDaily: "",
    availableFrom: "", availableTo: "",
    image: "", // Base64 string for image
  });

  const updateField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        toast.error("Image too large. Please upload an image smaller than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField("image", reader.result as string);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    try {
      if (!formData.title || !formData.category || !formData.priceHourly) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const newListing = {
        title: formData.title,
        location: formData.location || "Delhi NCR", // Fallback
        category: formData.category,
        priceHourly: Number(formData.priceHourly),
        priceDaily: Number(formData.priceDaily) || Number(formData.priceHourly) * 4,
        rating: 0,
        image: formData.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
        images: formData.image ? [formData.image] : [],
        description: formData.description || "No description provided.",
        amenities: ["WiFi", "AC"], // Default amenities
        reviews: [],
        host: "You",
        coordinates: { lat: 28.6139, lng: 77.2090 }, // Default coordinates
      };

      addListing(newListing);
      toast.success("Space listed successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create listing. Please try again.");
      console.error(error);
    }
  };

  const canNext = () => {
    if (step === 1) return formData.title && formData.category;
    if (step === 2) return formData.location;
    if (step === 3) return formData.priceHourly;
    return true;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-rentora py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground mb-2">List Your Space</h1>
      <p className="text-sm text-muted-foreground mb-8">Share your space with the NCR community</p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${i + 1 <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
              {i + 1 < step ? <Check size={14} /> : i + 1}
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">{s}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i + 1 < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-5"
        >
          {step === 1 && (
            <>
              <div>
                <label className="text-sm font-medium text-foreground">Title</label>
                <input
                  className="input-rentora mt-1"
                  placeholder="e.g., Modern Coworking Space"
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateField("category", cat.id)}
                      className={`px-3 py-2.5 rounded-xl text-sm text-left transition-colors border ${formData.category === cat.id
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border text-muted-foreground hover:border-foreground"
                        }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Description</label>
                <textarea
                  className="input-rentora mt-1 min-h-[100px] resize-none"
                  placeholder="Describe your space..."
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Photos</label>
                {!formData.image ? (
                  <div className="mt-2 border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload photos</p>
                    <p className="text-xs text-muted-foreground mt-1">(Max 5MB)</p>
                  </div>
                ) : (
                  <div className="mt-2 relative rounded-2xl overflow-hidden aspect-video group">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => updateField("image", "")}
                      className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="text-sm font-medium text-foreground">Location</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                  {["Delhi", "Noida", "Greater Noida"].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => updateField("location", loc)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-colors border ${formData.location === loc
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border text-muted-foreground hover:border-foreground"
                        }`}
                    >
                      <MapPin size={16} /> {loc}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Full Address</label>
                <input
                  className="input-rentora mt-1"
                  placeholder="e.g., Sector 62, Near Metro Station"
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="text-sm font-medium text-foreground">Hourly Price (₹)</label>
                <input
                  type="number"
                  className="input-rentora mt-1"
                  placeholder="e.g., 499"
                  value={formData.priceHourly}
                  onChange={(e) => updateField("priceHourly", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Daily Price (₹)</label>
                <input
                  type="number"
                  className="input-rentora mt-1"
                  placeholder="e.g., 2999"
                  value={formData.priceDaily}
                  onChange={(e) => updateField("priceDaily", e.target.value)}
                />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div>
                <label className="text-sm font-medium text-foreground">Available From</label>
                <input
                  type="date"
                  className="input-rentora mt-1"
                  value={formData.availableFrom}
                  onChange={(e) => updateField("availableFrom", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Available To</label>
                <input
                  type="date"
                  className="input-rentora mt-1"
                  value={formData.availableTo}
                  onChange={(e) => updateField("availableTo", e.target.value)}
                />
              </div>
            </>
          )}

          {step === 5 && (
            <div className="card-rentora p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Review Your Listing</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Title</span><span className="text-foreground font-medium">{formData.title || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span className="text-foreground font-medium">{formData.category || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="text-foreground font-medium">{formData.location || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Hourly</span><span className="text-foreground font-medium">₹{formData.priceHourly || "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Daily</span><span className="text-foreground font-medium">₹{formData.priceDaily || "—"}</span></div>
                {formData.image && (
                  <div className="mt-4">
                    <span className="text-muted-foreground block mb-2">Image Preview</span>
                    <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="flex items-center gap-1 text-sm font-medium text-foreground disabled:text-muted-foreground disabled:cursor-not-allowed hover:underline"
        >
          <ChevronLeft size={16} /> Back
        </button>

        {step < 5 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext()}
            className="btn-primary flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={handleSubmit} className="btn-primary inline-flex items-center gap-1">
            <Check size={16} /> Submit Listing
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AddListing;
