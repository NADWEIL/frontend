"use client";

import Link from "next/link";
import { useTheme } from "./theme-provider";
import { capitalizeWord } from "./dictionary-shared";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
  onAddWord: () => void;
  natureFilter: string;
  natureOptions: readonly string[];
  onNatureFilterChange: (value: string) => void;
  allNaturesLabel: string;
}

const filterButtonClass = (isActive: boolean) =>
  `rounded-full px-4.5 py-2 text-[13px] font-semibold transition-all ${
    isActive
      ? "bg-amber-100 text-slate-900 ring-1 ring-amber-200"
      : "bg-white/85 text-black hover:bg-white"
  }`;

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.8A8.9 8.9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2" />
      <path d="M12 19.3v2.2" />
      <path d="m4.93 4.93 1.56 1.56" />
      <path d="m17.51 17.51 1.56 1.56" />
      <path d="M2.5 12h2.2" />
      <path d="M19.3 12h2.2" />
      <path d="m4.93 19.07 1.56-1.56" />
      <path d="m17.51 6.49 1.56-1.56" />
    </svg>
  );
}

export function Header({
  searchQuery,
  onSearchChange,
  showFavorites,
  onToggleFavorites,
  onAddWord,
  natureFilter,
  natureOptions,
  onNatureFilterChange,
  allNaturesLabel,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const sortedNatureOptions = [...natureOptions].sort((a, b) =>
    a.localeCompare(b, "fr"),
  );

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-primary/95 via-primary/95 to-secondary/95 text-white px-6 py-4 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-24 -translate-x-24"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-center md:text-left">
              <h1 className="text-base md:text-lg font-bold mb-1 drop-shadow-lg">
                📚 Shimaorais Dictionnaire
              </h1>
              <p className="text-white/90 text-[10px] md:text-xs">
                Découvrez et maîtrisez de nouveaux mots
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 w-full md:w-auto min-w-0">
              <button
                onClick={onAddWord}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white text-primary"
              >
                ➕ Ajouter
              </button>
              <Link
                href="/admin"
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              >
                🛠️ Admin
              </Link>
              <Link
                href="/sort"
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              >
                🔤 Dictionnaire
              </Link>
              <button
                onClick={onToggleFavorites}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  showFavorites
                    ? "bg-white text-primary shadow-white/25"
                    : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                }`}
              >
                ❤️ Favoris
              </button>

              <div className="relative w-full md:w-80 min-w-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <span className="flex h-7 w-7 items-center justify-center text-[14px]">
                    🔎
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un mot..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-12 pr-3 py-1.5 rounded-full text-xs text-black bg-white/95 backdrop-blur-sm border-0 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white shadow-lg transition-all duration-300"
                />
              </div>

              <button
                onClick={toggleTheme}
                className={`group flex h-10 w-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-xl ${
                  theme === "light"
                    ? "border-white/45 bg-slate-900/85 text-amber-200 hover:bg-slate-900"
                    : "border-white/55 bg-white/92 text-amber-500 hover:bg-white"
                }`}
                aria-label={
                  theme === "light"
                    ? "Activer le mode nuit"
                    : "Activer le mode jour"
                }
                title={
                  theme === "light"
                    ? "Activer le mode nuit"
                    : "Activer le mode jour"
                }
              >
                <span className="transition-transform duration-300 group-hover:rotate-12">
                  {theme === "light" ? <MoonIcon /> : <SunIcon />}
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => onNatureFilterChange(allNaturesLabel)}
              className={filterButtonClass(natureFilter === allNaturesLabel)}
            >
              {allNaturesLabel}
            </button>
            {sortedNatureOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onNatureFilterChange(option)}
                className={filterButtonClass(natureFilter === option)}
              >
                {capitalizeWord(option)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
