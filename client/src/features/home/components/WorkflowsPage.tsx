import React, { useMemo, useState } from "react";
import debounce from "lodash.debounce";
import SearchBar from "./SearchBar";
import WorkflowsList from "./WorkflowsList";

const WorkflowsPage = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const debounceSearch = useMemo(
    () =>
      debounce((value) => {
        setDebouncedQuery(value);
      }, 300),
    [],
  );

  const handleSearch = (value) => {
    setQuery(value);
    debounceSearch(value);
  };

  return (
    <section className="space-y-6 border border-border/50 p-3 rounded-xl">
      <SearchBar query={query} setQuery={handleSearch} />
      <WorkflowsList query={debouncedQuery} />
    </section>
  );
};

export default WorkflowsPage;
