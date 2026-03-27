import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="w-full max-w-md">
      <div
        className="
          flex items-center gap-2 px-3 py-2 surface-muted
          backdrop-blur-sm transition
          focus-within:ring-2 focus-within:ring-ring/50"
      >
        <Search size={16} className="text-muted-foreground" />

        <input
          type="text"
          placeholder="Search workflows..."
          className="
            w-full bg-transparent
            outline-none text-sm
            placeholder:text-muted-foreground
          "
        />
      </div>
    </div>
  );
};

export default SearchBar;