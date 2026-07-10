// src/components/home/FeatureSearchBar.jsx
// Quick Feature Search — a lightweight, local, Apple-Settings-style search
// bar that lets users jump directly to any feature from Home.
// No backend, no AI, no external packages. Simple substring filtering.

import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { FEATURE_SEARCH_INDEX } from "../../data/featureSearch";

export default function FeatureSearchBar() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return FEATURE_SEARCH_INDEX.filter((feature) => {
      const titleMatch = feature.title.toLowerCase().includes(trimmed);
      const keywordMatch = feature.keywords?.some((k) =>
        k.toLowerCase().includes(trimmed),
      );
      return titleMatch || keywordMatch;
    });
  }, [query]);

  // Reset highlighted result whenever the result set changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (feature) => {
    setQuery("");
    setIsOpen(false);
    navigate(feature.path);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(
        (prev) => (prev - 1 + results.length) % results.length,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = results[highlightedIndex];
      if (chosen) handleSelect(chosen);
    }
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-soft">
        <Search size={18} className="shrink-0 text-stone" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a feature"
          aria-label="Search for a feature"
          role="combobox"
          aria-expanded={isOpen && results.length > 0}
          aria-controls="feature-search-results"
          aria-autocomplete="list"
          className="min-w-0 flex-1 bg-transparent font-display text-sm text-ink placeholder:text-stone placeholder:opacity-60 focus:outline-none"
        />
        {query && (
          <button
            onClick={handleClear}
            aria-label="Clear search"
            className="shrink-0 rounded-full p-1 text-stone opacity-60 transition-opacity hover:opacity-100"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div
          id="feature-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-2xl bg-surface p-2 shadow-soft"
        >
          {results.length === 0 ? (
            <p className="px-3 py-4 text-center text-sm text-stone opacity-70">
              No matching feature found.
            </p>
          ) : (
            results.map((feature, index) => {
              const Icon = feature.icon;
              const isHighlighted = index === highlightedIndex;
              return (
                <button
                  key={feature.path}
                  role="option"
                  aria-selected={isHighlighted}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => handleSelect(feature)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    isHighlighted ? "bg-canvas" : "bg-transparent"
                  }`}
                >
                  {Icon && (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-canvas">
                      <Icon
                        size={16}
                        strokeWidth={1.5}
                        className="text-stone"
                      />
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-sm font-medium text-ink">
                      {feature.title}
                    </span>
                    {feature.description && (
                      <span className="block truncate text-xs text-stone opacity-70">
                        {feature.description}
                      </span>
                    )}
                  </span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
