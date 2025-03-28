import { useState, useEffect } from "react";
import "./App.css";


function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


export default function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); 

  useEffect(() => {
    if (debouncedQuery) {
      console.log("Fetching results for:", debouncedQuery);
      
    }
  }, [debouncedQuery]);

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="debounced-text">Debounced Value: {debouncedQuery}</p>
    </div>
  );
}
