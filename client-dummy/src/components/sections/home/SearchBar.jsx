import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="max-w-md">
      <div className="flex items-center gap-2 px-3 py-2 border border-border/50 surface-muted backdrop-blur-sm focus-within:ring-2 focus-within:ring-ring/50">
        <Search size={16} className="text-muted-foreground" />
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search workflows..." className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground" />
      </div>
    </div>
  );
};

export default SearchBar;