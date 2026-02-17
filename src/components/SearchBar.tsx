import { Search, MapPin } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center w-full bg-secondary rounded-full border border-border hover:shadow-md transition-all">
      <div className="flex items-center gap-2 px-4 py-2.5 flex-1">
        <Search size={16} className="text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search spaces, tools, skills..."
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
        />
      </div>
      <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 border-l border-border">
        <MapPin size={16} className="text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Delhi NCR"
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-24"
        />
      </div>
      <button className="bg-primary text-primary-foreground rounded-full p-2.5 m-1 hover:bg-accent transition-colors">
        <Search size={16} />
      </button>
    </div>
  );
};

export default SearchBar;
