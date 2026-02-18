import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Calendar, Clock, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { getListings } from "@/lib/listings-store";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();

    const allListings = getListings();
    const listing = allListings.find((l) => l.id === Number(id));

    // Default values if state is missing (fallback)
    const bookingDetails = location.state || {
        duration: "hourly",
        hours: 2,
        date: new Date().toISOString().split('T')[0],
        price: listing ? listing.priceHourly * 2 : 0
    };

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [name, setName] = useState("");

    const serviceFee = Math.round(bookingDetails.price * 0.1);
    const total = bookingDetails.price + serviceFee;

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            toast({
                title: "Reservation Confirmed!",
                description: "Your booking has been successfully placed.",
            });
        }, 2000);
    };

    if (!listing) {
        return (
            <div className="container-rentora py-20 text-center">
                <p className="text-lg font-medium text-foreground">Listing not found</p>
                <Link to="/" className="text-primary mt-2 inline-block hover:underline">Go back home</Link>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="container-rentora py-20 flex flex-col items-center justify-center text-center min-h-[60vh]">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
                >
                    <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
                </motion.div>
                <h1 className="text-3xl font-bold text-foreground mb-4">Payment Successful!</h1>
                <p className="text-muted-foreground mb-8 max-w-md">
                    Your reservation for <span className="font-semibold text-foreground">{listing.title}</span> has been confirmed. A confirmation email has been sent to you.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/")}
                        className="btn-primary"
                    >
                        Return to Home
                    </button>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="px-6 py-3 rounded-xl border border-border font-medium hover:bg-secondary transition-all"
                    >
                        View Bookings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container-rentora py-8"
        >
            <Link to={`/listing/${id}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft size={18} /> Back to listing
            </Link>

            <h1 className="text-2xl font-bold text-foreground mb-8">Confirm and Pay</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Payment Form */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <div className="card-rentora p-6">
                            <div className="flex gap-4 mb-6">
                                <button className="flex-1 py-3 px-4 rounded-xl border-2 border-primary bg-primary/5 text-primary font-medium flex items-center justify-center gap-2">
                                    <CreditCard size={18} /> Card
                                </button>
                                <button className="flex-1 py-3 px-4 rounded-xl border border-border text-muted-foreground font-medium flex items-center justify-center gap-2 hover:bg-secondary/50">
                                    <span>UPI</span>
                                </button>
                            </div>

                            <form onSubmit={handlePayment} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        className="input-rentora"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Expiration</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="input-rentora"
                                            value={expiry}
                                            onChange={(e) => setExpiry(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">CVV</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            className="input-rentora"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Cardholder Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter name on card"
                                        className="input-rentora"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="btn-primary w-full flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" /> Processing...
                                            </>
                                        ) : (
                                            `Pay ₹${total}`
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Column - Booking Summary */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                    <div className="card-rentora p-6">
                        <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                            <img
                                src={listing.images[0]}
                                alt={listing.title}
                                className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div>
                                <h3 className="font-semibold line-clamp-2 mb-1">{listing.title}</h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                                    <MapPin size={14} /> {listing.location}
                                </p>
                                <div className="flex items-center gap-1 text-sm font-medium">
                                    <span className="text-primary">★ {listing.rating}</span>
                                    <span className="text-muted-foreground">({listing.reviews.length} reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6 pb-6 border-b border-border">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <Calendar size={16} /> Date
                                </span>
                                <span className="font-medium">{bookingDetails.date}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <Clock size={16} /> Duration
                                </span>
                                <span className="font-medium">
                                    {bookingDetails.duration === "hourly"
                                        ? `${bookingDetails.hours} Hours`
                                        : "1 Day"
                                    }
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    {bookingDetails.duration === "hourly"
                                        ? `₹${listing.priceHourly} × ${bookingDetails.hours} hours`
                                        : "Daily rate"}
                                </span>
                                <span>₹{bookingDetails.price}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Service fee</span>
                                <span>₹{serviceFee}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-4 mt-2 border-t border-border">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Payment;
