import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CalendarDays, Clock, ChevronDown } from "lucide-react";
import type { Listing } from "@/data/listings";

interface BookingCardProps {
  listing: Listing;
}

const BookingCard = ({ listing }: BookingCardProps) => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState<"hourly" | "daily">("hourly");
  const [hours, setHours] = useState(2);
  const price = duration === "hourly" ? listing.priceHourly * hours : listing.priceDaily;
  const serviceFee = Math.round(price * 0.1);

  return (
    <div className="card-rentora p-6 space-y-5">
      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">
          ₹{duration === "hourly" ? listing.priceHourly : listing.priceDaily}
        </span>
        <span className="text-muted-foreground">/{duration === "hourly" ? "hour" : "day"}</span>
      </div>

      {/* Duration Toggle */}
      <div className="flex rounded-xl border border-border overflow-hidden">
        <button
          onClick={() => setDuration("hourly")}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${duration === "hourly" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
            }`}
        >
          Hourly
        </button>
        <button
          onClick={() => setDuration("daily")}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${duration === "daily" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
            }`}
        >
          Daily
        </button>
      </div>

      {/* Date */}
      <div className="space-y-3">
        <div className="relative">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</label>
          <div className="mt-1 relative">
            <CalendarDays size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="date"
              className="input-rentora pl-10"
              defaultValue="2025-02-20"
            />
          </div>
        </div>

        {/* Duration */}
        {duration === "hourly" && (
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Hours</label>
            <div className="mt-1 relative">
              <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <select
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="input-rentora pl-10 appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((h) => (
                  <option key={h} value={h}>{h} hour{h > 1 ? "s" : ""}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 pt-3 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {duration === "hourly" ? `₹${listing.priceHourly} × ${hours} hours` : "Daily rate"}
          </span>
          <span className="text-foreground">₹{price}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Service fee</span>
          <span className="text-foreground">₹{serviceFee}</span>
        </div>
        <div className="flex justify-between font-semibold text-foreground pt-2 border-t border-border">
          <span>Total</span>
          <span>₹{price + serviceFee}</span>
        </div>
      </div>

      {/* Reserve Button */}
      <button
        onClick={() => navigate(`/payment/${listing.id}`, {
          state: {
            duration,
            hours,
            date: "2025-02-20", // In a real app this would be state
            price
          }
        })}
        className="btn-primary w-full text-center"
      >
        Reserve
      </button>

      <p className="text-center text-xs text-muted-foreground">You won't be charged yet</p>
    </div>
  );
};

export default BookingCard;
