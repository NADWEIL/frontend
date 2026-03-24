"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { NATURE_OPTIONS, type Word } from "../dictionary-shared";

export default function SortPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [letter, setLetter] = useState<string>("Tous");
  const [nature, setNature] = useState<string>("Tous");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/words");
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const data = (await res.json()) as Word[];
        setWords(data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des mots");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const sortedWords = useMemo(
    () =>
      [...words].sort((a, b) =>
        a.word.localeCompare(b.word, "fr", { sensitivity: "base" }),
      ),
    [words],
  );

  const filteredWords = useMemo(() => {
    return sortedWords.filter((w) => {
      const letterMatches =
        letter === "Tous" || w.word.toUpperCase().startsWith(letter);
      const natureMatches = nature === "Tous" || w.nature === nature;
      return letterMatches && natureMatches;
    });
  }, [sortedWords, letter, nature]);

  const letters = [
    "Tous",
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Tri alphabétique
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Par lettre et nature grammaticale
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Retour
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Admin
            </Link>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="font-semibold mb-2">Filtre par lettre</p>
            <div className="flex flex-wrap gap-2">
              {letters.map((item) => (
                <button
                  key={item}
                  onClick={() => setLetter(item)}
                  className={`px-3 py-1 rounded-md text-sm ${letter === item ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="font-semibold mb-2">Filtre par nature grammaticale</p>
            <select
              value={nature}
              onChange={(e) => setNature(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Tous">Tous</option>
              {NATURE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Chargement...</div>
        ) : (
          <>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {filteredWords.length} mot{filteredWords.length > 1 ? "s" : ""}{" "}
              affiché{filteredWords.length > 1 ? "s" : ""}
            </p>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
              {filteredWords.map((w) => (
                <div
                  key={w.id}
                  className="flex flex-col gap-1.5 border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-gray-800 lg:flex-row lg:items-center lg:gap-3"
                >
                  <div className="min-w-0 lg:w-44 lg:flex-none">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h2 className="text-base font-bold text-primary">
                        {w.word}
                      </h2>
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                        {w.nature}
                      </span>
                    </div>
                  </div>

                  <p className="min-w-0 flex-1 text-sm leading-5 text-gray-700 dark:text-gray-300">
                    {w.definition}
                  </p>

                  <div className="flex items-center lg:flex-none">
                    <Link
                      href={`/word/${w.id}`}
                      className="text-sm font-semibold text-secondary transition hover:text-secondary/80"
                    >
                      Voir détails {"->"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
