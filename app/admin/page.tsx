"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ALL_NATURES_LABEL,
  capitalizeWord,
  getExamplesText,
  NATURE_OPTIONS,
  normalizeWord,
  type Word,
} from "../dictionary-shared";

const ADMIN_WORDS_API_URL = "http://localhost:8000/words?include_pending=true";
const BASE_WORDS_API_URL = "http://localhost:8000/words";
const ALL_EXAMPLES_LABEL = "Tous";
const ALL_STATUS_LABEL = "Tous";
const INITIAL_EDIT_STATE = {
  word: "",
  nature: "nom",
  definition: "",
  example: "",
  status: "pending",
};
const tableHeaderClass =
  "sticky top-0 z-20 bg-gray-100 px-4 py-3 dark:bg-gray-800";

const getQualityAlerts = (word: Word) => {
  const alerts: string[] = [];

  if (word.definition.trim().length < 8) {
    alerts.push("Definition courte");
  }

  if (!word.examples?.length) {
    alerts.push("Pas d'exemple");
  }

  if (word.word.trim().length < 2) {
    alerts.push("Mot tres court");
  }

  return alerts;
};

const matchesAdminFilters = (
  item: Word,
  searchQuery: string,
  natureFilter: string,
  exampleFilter: string,
  statusFilter: string,
) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const matchesSearch =
    !normalizedQuery ||
    item.word.toLowerCase().includes(normalizedQuery) ||
    item.definition.toLowerCase().includes(normalizedQuery) ||
    getExamplesText(item.examples).toLowerCase().includes(normalizedQuery);

  const matchesNature =
    natureFilter === ALL_NATURES_LABEL || item.nature === natureFilter;

  const hasExample = Boolean(item.examples?.length);
  const matchesExample =
    exampleFilter === ALL_EXAMPLES_LABEL ||
    (exampleFilter === "Avec exemple" && hasExample) ||
    (exampleFilter === "Sans exemple" && !hasExample);

  const matchesStatus =
    statusFilter === ALL_STATUS_LABEL || item.status === statusFilter;

  return matchesSearch && matchesNature && matchesExample && matchesStatus;
};

const getStatusBadgeClass = (status: string) =>
  status === "approved"
    ? "bg-green-100 text-green-700"
    : "bg-amber-100 text-amber-700";

export default function AdminDashboard() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editWord, setEditWord] = useState(INITIAL_EDIT_STATE.word);
  const [editNature, setEditNature] = useState(INITIAL_EDIT_STATE.nature);
  const [editDefinition, setEditDefinition] = useState(
    INITIAL_EDIT_STATE.definition,
  );
  const [editExample, setEditExample] = useState(INITIAL_EDIT_STATE.example);
  const [editStatus, setEditStatus] = useState(INITIAL_EDIT_STATE.status);
  const [searchQuery, setSearchQuery] = useState("");
  const [natureFilter, setNatureFilter] = useState(ALL_NATURES_LABEL);
  const [exampleFilter, setExampleFilter] = useState(ALL_EXAMPLES_LABEL);
  const [statusFilter, setStatusFilter] = useState(ALL_STATUS_LABEL);

  const fetchWords = async () => {
    setLoading(true);
    try {
      const res = await fetch(ADMIN_WORDS_API_URL);
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const data = (await res.json()) as Word[];
      setWords(data);
    } catch (err) {
      console.error(err);
      setError("Impossible de récupérer les mots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const startEdit = (item: Word) => {
    setEditingId(item.id);
    setEditWord(item.word);
    setEditNature(item.nature);
    setEditDefinition(item.definition);
    setEditExample(item.examples?.[0]?.example || "");
    setEditStatus(item.status);
    setError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditWord(INITIAL_EDIT_STATE.word);
    setEditNature(INITIAL_EDIT_STATE.nature);
    setEditDefinition(INITIAL_EDIT_STATE.definition);
    setEditExample(INITIAL_EDIT_STATE.example);
    setEditStatus(INITIAL_EDIT_STATE.status);
  };

  const saveEdit = async (id: number) => {
    if (!editWord.trim() || !editDefinition.trim()) {
      setError("Mot et définition sont requis.");
      return;
    }

    try {
      const res = await fetch(`${BASE_WORDS_API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: editWord.trim(),
          nature: editNature,
          status: editStatus,
          definition: editDefinition.trim(),
          example: editExample,
        }),
      });
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      await fetchWords();
      cancelEdit();
    } catch (err) {
      console.error(err);
      setError("Impossible de modifier le mot");
    }
  };

  const deleteWord = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce mot ?")) return;

    try {
      const res = await fetch(`${BASE_WORDS_API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      await fetchWords();
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
      if (editingId === id) cancelEdit();
    } catch (err) {
      console.error(err);
      setError("Impossible de supprimer le mot");
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  };

  const toggleSelectAllFiltered = () => {
    const filteredIds = filteredWords.map((item) => item.id);
    const allSelected =
      filteredIds.length > 0 &&
      filteredIds.every((id) => selectedIds.includes(id));

    setSelectedIds((prev) =>
      allSelected
        ? prev.filter((id) => !filteredIds.includes(id))
        : [...new Set([...prev, ...filteredIds])],
    );
  };

  const deleteSelectedWords = async () => {
    if (selectedIds.length === 0) return;
    if (
      !confirm(
        `Voulez-vous vraiment supprimer ${selectedIds.length} mot(s) ?`,
      )
    ) {
      return;
    }

    try {
      await Promise.all(
        selectedIds.map(async (id) => {
          const res = await fetch(`${BASE_WORDS_API_URL}/${id}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error(`Erreur ${res.status}`);
        }),
      );
      await fetchWords();
      setSelectedIds([]);
      if (editingId && selectedIds.includes(editingId)) cancelEdit();
    } catch (err) {
      console.error(err);
      setError("Impossible de supprimer les mots sélectionnés");
    }
  };

  const approveWord = async (id: number) => {
    try {
      const res = await fetch(`${BASE_WORDS_API_URL}/${id}/approve`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      await fetchWords();
    } catch (err) {
      console.error(err);
      setError("Impossible de valider le mot");
    }
  };

  const duplicateMap = useMemo(() => {
    const groups = new Map<string, number[]>();

    for (const item of words) {
      const key = normalizeWord(item.word);
      const group = groups.get(key) || [];
      group.push(item.id);
      groups.set(key, group);
    }

    return groups;
  }, [words]);

  const filteredWords = useMemo(() => {
    return words.filter((item) =>
      matchesAdminFilters(
        item,
        searchQuery,
        natureFilter,
        exampleFilter,
        statusFilter,
      ),
    );
  }, [words, searchQuery, natureFilter, exampleFilter, statusFilter]);

  const allFilteredSelected =
    filteredWords.length > 0 &&
    filteredWords.every((item) => selectedIds.includes(item.id));

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="sticky top-0 z-30 mb-0 rounded-2xl border border-gray-200 bg-background/95 p-4 backdrop-blur dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gérez directement les mots, définitions et actions.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={deleteSelectedWords}
                disabled={selectedIds.length === 0}
                className="px-4 py-2 rounded-xl bg-red-500 text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-red-600"
              >
                Supprimer la sélection
              </button>
              <Link
                href="/"
                className="px-4 py-2 bg-white text-primary rounded-xl border border-primary hover:bg-primary/10 transition"
              >
                Retour au dictionnaire
              </Link>
              <Link
                href="/word/1"
                className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition"
              >
                Voir un détail
              </Link>
            </div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un mot, une definition, un exemple..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm"
            />
            <select
              value={natureFilter}
              onChange={(e) => setNatureFilter(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm"
            >
              <option value={ALL_NATURES_LABEL}>Toutes les natures</option>
              {NATURE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={exampleFilter}
              onChange={(e) => setExampleFilter(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm"
            >
              <option value={ALL_EXAMPLES_LABEL}>Tous les mots</option>
              <option value="Avec exemple">Avec exemple</option>
              <option value="Sans exemple">Sans exemple</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm"
            >
              <option value={ALL_STATUS_LABEL}>Tous les statuts</option>
              <option value="approved">Valide</option>
              <option value="pending">En attente</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Chargement...</div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 px-5 py-3 rounded-lg mb-4">
            {error}
          </div>
        ) : (
          <div className="max-h-[70vh] overflow-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className={tableHeaderClass}>
                    <input
                      type="checkbox"
                      checked={allFilteredSelected}
                      onChange={toggleSelectAllFiltered}
                      aria-label="Sélectionner tous les mots filtrés"
                    />
                  </th>
                  <th className={tableHeaderClass}>ID</th>
                  <th className={tableHeaderClass}>Mot</th>
                  <th className={tableHeaderClass}>Nature</th>
                  <th className={tableHeaderClass}>Statut</th>
                  <th className={tableHeaderClass}>Définition</th>
                  <th className={tableHeaderClass}>Exemple en shimaorais</th>
                  <th className={tableHeaderClass}>Alertes</th>
                  <th className={tableHeaderClass}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWords.map((item) => {
                  const qualityAlerts = getQualityAlerts(item);
                  const isDuplicate =
                    (duplicateMap.get(normalizeWord(item.word)) || []).length > 1;
                  const alerts = isDuplicate
                    ? [...qualityAlerts, "Doublon proche"]
                    : qualityAlerts;

                  return (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 dark:border-gray-800"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => toggleSelection(item.id)}
                          aria-label={`Sélectionner ${item.word}`}
                        />
                      </td>
                      <td className="px-4 py-3">{item.id}</td>
                      <td className="px-4 py-3">
                        {editingId === item.id ? (
                          <input
                            type="text"
                            value={editWord}
                            onChange={(e) => setEditWord(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        ) : (
                          capitalizeWord(item.word)
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {editingId === item.id ? (
                          <select
                            value={editNature}
                            onChange={(e) => setEditNature(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                          >
                            {NATURE_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          item.nature
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {editingId === item.id ? (
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                          >
                            <option value="pending">En attente</option>
                            <option value="approved">Valide</option>
                          </select>
                        ) : (
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(item.status)}`}
                          >
                            {item.status === "approved" ? "Valide" : "En attente"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {editingId === item.id ? (
                          <textarea
                            value={editDefinition}
                            onChange={(e) => setEditDefinition(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows={2}
                          />
                        ) : (
                          item.definition
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {editingId === item.id ? (
                          <textarea
                            value={editExample}
                            onChange={(e) => setEditExample(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows={2}
                            placeholder="Exemple en shimaorais"
                          />
                        ) : (
                          getExamplesText(item.examples)
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {alerts.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {alerts.map((alert) => (
                              <span
                                key={alert}
                                className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700"
                              >
                                {alert}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-green-600">
                            Complet
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {editingId === item.id ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => saveEdit(item.id)}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => cancelEdit()}
                              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                              Annuler
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-wrap items-center gap-2">
                            {item.status !== "approved" && (
                              <button
                                onClick={() => approveWord(item.id)}
                                className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                              >
                                Valider
                              </button>
                            )}
                            <button
                              onClick={() => startEdit(item)}
                              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Editer
                            </button>
                            <button
                              onClick={() => deleteWord(item.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Supprimer
                            </button>
                            <Link
                              href={`/word/${item.id}`}
                              className="inline-flex items-center px-3 py-1 bg-primary text-white rounded hover:bg-primary/90"
                            >
                              Détails
                            </Link>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
