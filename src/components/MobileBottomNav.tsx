import { Link, useLocation } from "react-router-dom";
import { Compass, Heart, CalendarDays, User, Map } from "lucide-react";

const items = [
  { to: "/", icon: Compass, label: "Explore" },
  { to: "/map", icon: Map, label: "Map" },
  { to: "/wishlist", icon: Heart, label: "Wishlist" },
  { to: "/dashboard", icon: User, label: "Profile" },
];

const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="mobile-bottom-nav">
      {items.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.label}
            to={item.to}
            className={`mobile-bottom-nav-item ${isActive ? "mobile-bottom-nav-item-active" : ""}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
