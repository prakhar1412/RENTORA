import { listings as staticListings, Listing } from "@/data/listings";

const STORAGE_KEY = "custom_listings";

export const getListings = (): Listing[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const customListings: Listing[] = stored ? JSON.parse(stored) : [];
        return [...staticListings, ...customListings];
    } catch (error) {
        console.error("Failed to load listings from storage:", error);
        return staticListings;
    }
};

export const addListing = (newListing: Omit<Listing, "id">): Listing => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const customListings: Listing[] = stored ? JSON.parse(stored) : [];

        // Generate a new ID (ensure it doesn't collide with static ones)
        // Static IDs go up to 22 currently. We'll start custom IDs from 1000.
        const lastId = customListings.length > 0
            ? customListings[customListings.length - 1].id
            : 999;

        const listingWithId: Listing = {
            ...newListing,
            id: lastId + 1,
        };

        const updatedListings = [...customListings, listingWithId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedListings));

        // Dispatch a custom event so components can react if they are listening (optional, but good practice)
        window.dispatchEvent(new Event("listings-updated"));

        return listingWithId;
    } catch (error) {
        console.error("Failed to save listing:", error);
        throw error;
    }
};
