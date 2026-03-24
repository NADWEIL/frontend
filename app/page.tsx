"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ALL_NATURES_LABEL,
  NATURE_OPTIONS,
  type Word,
} from "./dictionary-shared";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { WordCard } from "./word-card";

const WORDS_API_URL = "http://localhost:8000/words";
const INITIAL_FORM_STATE = {
  word: "",
  nature: "nom",
  definition: "",
  example: "",
};
const FORM_MESSAGE_TIMEOUT_MS = 2000;

const matchesSearch = (word: Word, query: string) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return true;
  }

  return (
    word.word.toLowerCase().includes(normalizedQuery) ||
    word.definition.toLowerCase().includes(normalizedQuery)
  );
};

const getResultsLabel = (
  count: number,
  searchQuery: string,
  natureFilter: string,
  showFavorites: boolean,
) => {
  let label = `${count} mot${count !== 1 ? "s" : ""} trouvé${count !== 1 ? "s" : ""}`;

  if (searchQuery) {
    label += ` pour "${searchQuery}"`;
  }
  if (natureFilter !== ALL_NATURES_LABEL) {
    label += ` en ${natureFilter}`;
  }
  if (showFavorites) {
    label += " dans vos favoris";
  }

  return label;
};

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [word, setWord] = useState(INITIAL_FORM_STATE.word);
  const [nature, setNature] = useState(INITIAL_FORM_STATE.nature);
  const [definition, setDefinition] = useState(INITIAL_FORM_STATE.definition);
  const [example, setExample] = useState(INITIAL_FORM_STATE.example);
  const [searchQuery, setSearchQuery] = useState("");
  const [natureFilter, setNatureFilter] = useState(ALL_NATURES_LABEL);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWords = async () => {
    try {
      const res = await fetch(WORDS_API_URL);
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const data = (await res.json()) as Word[];
      setWords(data);
    } catch (error) {
      console.error("fetchWords failed", error);
    } finally {
      setLoading(false);
    }
  };

  const addWord = async () => {
    if (!word.trim() || !definition.trim()) return;

    try {
      setFormMessage(null);
      const res = await fetch(WORDS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: word.trim(),
          nature,
          definition: definition.trim(),
          example: example.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error(`Erreur ${res.status}`);

      resetForm();
      setFormMessage("Mot envoye pour validation par l’admin.");
      await fetchWords();
    } catch (error) {
      console.error("addWord failed", error);
      setFormMessage("Impossible d'envoyer le mot pour validation.");
    }
  };

  const resetForm = () => {
    setWord(INITIAL_FORM_STATE.word);
    setNature(INITIAL_FORM_STATE.nature);
    setDefinition(INITIAL_FORM_STATE.definition);
    setExample(INITIAL_FORM_STATE.example);
    setShowForm(false);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const filteredWords = useMemo(() => {
    let filtered = words.filter((item) => matchesSearch(item, searchQuery));

    if (natureFilter !== ALL_NATURES_LABEL) {
      filtered = filtered.filter((w) => w.nature === natureFilter);
    }

    if (showFavorites) {
      filtered = filtered.filter((w) => favorites.includes(w.id));
    }

    return filtered.sort((a, b) => a.word.localeCompare(b.word, "fr"));
  }, [words, searchQuery, natureFilter, showFavorites, favorites]);

  useEffect(() => {
    fetchWords();
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    if (!formMessage) return;

    const timeoutId = window.setTimeout(() => {
      setFormMessage(null);
    }, FORM_MESSAGE_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [formMessage]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFavorites={showFavorites}
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
        onAddWord={() => setShowForm((value) => !value)}
        natureFilter={natureFilter}
        natureOptions={NATURE_OPTIONS}
        onNatureFilterChange={setNatureFilter}
        allNaturesLabel={ALL_NATURES_LABEL}
      />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6 lg:flex-row lg:items-start">
        <Sidebar />

        <section className="min-w-0 flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Chargement du dictionnaire...
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {getResultsLabel(
                    filteredWords.length,
                    searchQuery,
                    natureFilter,
                    showFavorites,
                  )}
                </p>
              </div>

              {showForm && (
                <div className="mx-auto max-w-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 shadow-2xl mb-6 border border-gray-200 dark:border-gray-700 animate-slide-in-from-top">
                  <h2 className="text-lg font-bold mb-3 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ✨ Ajouter un nouveau mot
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                        Mot
                      </label>
                      <input
                        className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-sm text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 shadow-sm"
                        placeholder="Entrez le mot..."
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                        Nature du mot
                      </label>
                      <select
                        className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-sm text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 shadow-sm"
                        value={nature}
                        onChange={(e) => setNature(e.target.value)}
                      >
                        {NATURE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                        Définition
                      </label>
                      <textarea
                        className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-sm text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200 shadow-sm"
                        placeholder="Entrez la définition..."
                        rows={2}
                        value={definition}
                        onChange={(e) => setDefinition(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
                        Exemple en shimaorais
                      </label>
                      <textarea
                        className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-sm text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-200 shadow-sm"
                        placeholder="Entrez une phrase d'utilisation..."
                        rows={1}
                        value={example}
                        onChange={(e) => setExample(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={resetForm}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={addWord}
                        className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                      >
                        Ajouter ✨
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredWords.map((w, index) => (
                  <div
                    key={w.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <WordCard
                      word={w}
                      isFavorite={favorites.includes(w.id)}
                      onToggleFavorite={toggleFavorite}
                      onOpenDetails={setSelectedWord}
                      isHighlighted={natureFilter !== ALL_NATURES_LABEL}
                    />
                  </div>
                ))}
              </div>

              {filteredWords.length === 0 && searchQuery && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Aucun résultat trouvé
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Essayez avec des termes differents ou verifiez l’orthographe
                  </p>
                </div>
              )}

              {words.length === 0 && !searchQuery && !showFavorites && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Bienvenue dans votre dictionnaire !
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Commencez par ajouter votre premier mot
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    ➕ Ajouter un mot
                  </button>
                </div>
              )}

              {showFavorites && filteredWords.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">❤️</div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Aucun favori encore
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Cliquez sur le cœur des mots que vous aimez pour les retrouver
                    ici
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {formMessage && (
        <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-primary/20 bg-white px-5 py-4 text-sm text-primary shadow-2xl dark:bg-gray-900">
          {formMessage}
        </div>
      )}

      {selectedWord && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedWord(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto dark:from-gray-800 dark:to-gray-900 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedWord(null)}
              className="absolute right-4 top-4 rounded-full px-3 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Fermer
            </button>

            <div className="mb-8 pr-16">
              <h2 className="mb-3 text-4xl font-bold text-primary">
                {selectedWord.word}
              </h2>
              <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                {selectedWord.nature}
              </span>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-xl font-bold text-gray-800 dark:text-gray-200">
                Definition
              </h3>
              <div className="rounded-2xl border border-gray-200 bg-white/70 p-5 dark:border-gray-600 dark:bg-gray-700/50">
                <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200">
                  {selectedWord.definition}
                </p>
              </div>
            </div>

            {selectedWord.examples && selectedWord.examples.length > 0 && (
              <div>
                <h3 className="mb-3 text-xl font-bold text-gray-800 dark:text-gray-200">
                  Exemple en shimaorais
                </h3>
                <div className="space-y-3">
                  {selectedWord.examples.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-secondary/20 bg-secondary/10 p-5"
                    >
                      <p className="text-base italic leading-relaxed text-gray-800 dark:text-gray-200">
                        &ldquo;{item.example}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
