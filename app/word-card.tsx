"use client";

import { useState } from "react";
import type { Word } from "./dictionary-shared";

interface WordCardProps {
  word: Word;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onOpenDetails: (word: Word) => void;
  isHighlighted?: boolean;
}

export function WordCard({
  word,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  isHighlighted = false,
}: WordCardProps) {
  const [showFullDefinition, setShowFullDefinition] = useState(false);

  const shouldTruncate = word.definition.length > 150;
  const displayDefinition =
    showFullDefinition || !shouldTruncate
      ? word.definition
      : word.definition.substring(0, 150) + "...";

  return (
    <div
      className={`group bg-gradient-to-br rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border transform hover:-translate-y-1 ${
        isHighlighted
          ? "from-amber-50 to-white dark:from-amber-950/20 dark:to-gray-900 border-amber-300 ring-2 ring-amber-200/80"
          : "from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 hover:border-primary/30"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <button
          type="button"
          onClick={() => onOpenDetails(word)}
          className="text-xl font-bold text-primary hover:text-primary/80 transition-colors group-hover:scale-105 transform duration-200"
        >
          {word.word}
        </button>
        <button
          onClick={() => onToggleFavorite(word.id)}
          className="text-2xl hover:scale-125 transition-all duration-200 drop-shadow-sm"
          aria-label={
            isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
          }
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="mb-3">
        <span className="inline-block mb-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
          {word.nature}
        </span>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
          {displayDefinition}
        </p>
      </div>

      <div className="flex items-center justify-between">
        {shouldTruncate && (
          <button
            onClick={() => setShowFullDefinition(!showFullDefinition)}
            className="text-secondary hover:text-secondary/80 text-sm font-semibold transition-colors flex items-center gap-1"
          >
            {showFullDefinition ? "📖 Réduire" : "📖 Voir plus"}
          </button>
        )}

        <button
          type="button"
          onClick={() => onOpenDetails(word)}
          className="ml-auto text-accent hover:text-accent/80 text-sm font-semibold transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          Détails →
        </button>
      </div>

      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-6 translate-x-6 pointer-events-none"></div>
    </div>
  );
}
