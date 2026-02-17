import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { listings } from "@/data/listings";
import { Star, MapPin, IndianRupee } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current);
    mapInstanceRef.current = map;

    // Calculate bounds from all listings
    const bounds = L.latLngBounds(listings.map(l => [l.coordinates.lat, l.coordinates.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Custom icon
    const customIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Add markers
    listings.forEach((listing) => {
      const marker = L.marker([listing.coordinates.lat, listing.coordinates.lng], {
        icon: customIcon,
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 280px;">
          <img 
            src="${listing.image}" 
            alt="${listing.title}"
            style="width: 100%; height: 160px; object-fit: cover; border-radius: 8px; margin-bottom: 12px;"
          />
          <h3 style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">${listing.title}</h3>
          <div style="display: flex; align-items: center; gap: 4px; font-size: 14px; color: #666; margin-bottom: 8px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>${listing.location}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span style="font-size: 14px; font-weight: 500;">${listing.rating}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px; font-size: 14px; font-weight: 600; color: #8b5cf6;">
              <span>₹${listing.priceHourly}/hr</span>
            </div>
          </div>
          <a 
            href="/listing/${listing.id}"
            style="display: block; width: 100%; text-align: center; background: #8b5cf6; color: white; border-radius: 8px; padding: 8px; font-size: 14px; font-weight: 500; text-decoration: none;"
            onclick="event.preventDefault(); window.location.href='/listing/${listing.id}';"
          >
            View Details
          </a>
        </div>
      `;

      marker.bindPopup(popupContent, { minWidth: 280 });
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <div className="container-rentora py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Explore Listings on Map
          </h1>
          <p className="text-muted-foreground">
            Click on markers to view listing details
          </p>
        </div>

        <div
          ref={mapRef}
          className="w-full bg-white rounded-xl shadow-lg"
          style={{ height: "600px" }}
        />
      </div>
    </div>
  );
};

export default Map;
