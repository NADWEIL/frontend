"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { capitalizeWord, type Word } from "../../dictionary-shared";

export default function WordDetail() {
  const params = useParams();
  const [word, setWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const id = params.id as string;

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const res = await fetch(`http://localhost:8000/words/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError("Mot non trouvé");
          } else {
            throw new Error(`Erreur ${res.status}`);
          }
          return;
        }
        const data = await res.json();
        setWord(data);
      } catch (error) {
        console.error("fetchWord failed", error);
        setError("Erreur lors du chargement du mot");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWord();
    }

    // Check if favorite
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(Number(id)));
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((fav: number) => fav !== Number(id));
    } else {
      newFavorites = [...favorites, Number(id)];
    }
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !word) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Erreur</h1>
          <p className="text-foreground mb-6">{error}</p>
          <Link
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Retour a l&rsquo;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-white hover:text-white/80 transition-colors"
          >
            ← Retour
          </Link>
          <h1 className="text-xl font-bold">Détail du mot</h1>
          <button
            onClick={toggleFavorite}
            className="text-2xl hover:scale-110 transition-transform"
            aria-label={
              isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
            }
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto p-6">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10">
            <div className="mb-8">
              <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4 drop-shadow-sm">
                {capitalizeWord(word.word)}
              </h2>
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                  {word.nature}
                </span>
              </div>
              <div className="w-24 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                📖 Définition
              </h3>
              <div className="bg-white/50 dark:bg-gray-700/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
                <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                  {word.definition}
                </p>
              </div>
            </div>

            {word.examples && word.examples.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                  💬 Exemple en shimaorais
                </h3>
                <div className="space-y-3">
                  {word.examples.map((example) => (
                    <div
                      key={example.id}
                      className="bg-white/50 dark:bg-gray-700/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-600"
                    >
                      <p className="text-gray-800 dark:text-gray-200 text-lg italic leading-relaxed">
                        &ldquo;{example.example}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional features */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                  📚 Définition complète
                </span>
                {isFavorite && (
                  <span className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold border border-red-200 dark:border-red-800">
                    ❤️ Favori
                  </span>
                )}
                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold border border-secondary/20">
                  🔤 Mot français
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
