import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border hidden md:block">
      <div className="container-rentora py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">R</span>
              </div>
              <span className="text-lg font-bold text-foreground">RENTORA</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Spaces, Skills & Tools On Demand. Serving Delhi-NCR.
            </p>
            <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
              <MapPin size={14} />
              <span>Delhi · Noida · Greater Noida</span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Explore</h4>
            <div className="space-y-2">
              {["Coworking Spaces", "Meeting Rooms", "Studios", "Event Spaces", "Tools"].map((item) => (
                <Link key={item} to="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Hosting */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Hosting</h4>
            <div className="space-y-2">
              {["List Your Space", "Hosting Resources", "Community Forum", "Safety Guidelines"].map((item) => (
                <Link key={item} to="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Support</h4>
            <div className="space-y-2">
              {["Help Center", "Trust & Safety", "Terms of Service", "Privacy Policy"].map((item) => (
                <Link key={item} to="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          © 2025 RENTORA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
