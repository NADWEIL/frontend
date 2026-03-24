"use client";

import { useState } from "react";
import { ThemeLanguageCards } from "./theme-language-cards";

interface ThemeCardItem {
  french: string;
  shimaorais: string;
}

type NumberGroupKey = "0-10" | "10-20" | "base-10" | "100-plus";

interface NumberThemeContentProps {
  numbers: ThemeCardItem[];
  teenNumbers: ThemeCardItem[];
  baseTenNumbers: ThemeCardItem[];
  largeNumbers: ThemeCardItem[];
}

const GROUPS: { key: NumberGroupKey; label: string; title: string }[] = [
  { key: "0-10", label: "Unités", title: "De 0 à 10" },
  { key: "10-20", label: "Dizaines", title: "De 10 à 20" },
  { key: "base-10", label: "Centaines", title: "De 10 à 100" },
  { key: "100-plus", label: "Milliers", title: "100 et plus" },
];

const NUMBER_LABELS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const TEEN_NUMBER_LABELS = [
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];
const BASE_TEN_LABELS = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];
const THOUSAND_LABELS = [
  "1000",
  "2000",
  "3000",
  "4000",
  "5000",
  "6000",
  "7000",
  "8000",
  "9000",
];

export function NumberThemeContent({
  numbers,
  teenNumbers,
  baseTenNumbers,
  largeNumbers,
}: NumberThemeContentProps) {
  const [selectedGroup, setSelectedGroup] = useState<NumberGroupKey>("0-10");

  const selectedConfig = GROUPS.find((group) => group.key === selectedGroup)!;

  const selectedContent = {
    "0-10": (
      <ThemeLanguageCards
        items={numbers}
        labels={NUMBER_LABELS}
        columnsClassName="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3"
        anchorPrefix="number"
      />
    ),
    "10-20": (
      <ThemeLanguageCards
        items={teenNumbers}
        labels={TEEN_NUMBER_LABELS}
        columnsClassName="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3"
      />
    ),
    "base-10": (
      <ThemeLanguageCards
        items={baseTenNumbers}
        labels={BASE_TEN_LABELS}
        columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
      />
    ),
    "100-plus": (
      <ThemeLanguageCards
        items={largeNumbers}
        labels={THOUSAND_LABELS}
        columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
      />
    ),
  }[selectedGroup];

  return (
    <div className="mt-5 grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
      <aside className="rounded-[1.5rem] border border-primary/10 bg-white/88 p-4 shadow-[0_14px_28px_rgba(17,24,39,0.08)] dark:border-primary/15 dark:bg-gray-900/88 lg:sticky lg:top-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">
          Raccourcis
        </p>
        <h2 className="mt-2 text-base font-semibold text-gray-900 dark:text-white">
          Groupes de nombres
        </h2>
        <nav className="mt-4 flex flex-col gap-2">
          {GROUPS.map((group, index) => (
            <button
              key={group.key}
              type="button"
              onClick={() => setSelectedGroup(group.key)}
              className={`flex items-center justify-between rounded-2xl border px-3 py-2 text-sm font-medium transition ${
                selectedGroup === group.key
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-gray-200 bg-gray-50 text-gray-700 hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-primary/40 dark:hover:bg-primary/10"
              }`}
            >
              <span>{index + 1}</span>
              <span>{group.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <section className="min-w-0">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {selectedConfig.title}
        </p>
        {selectedContent}
      </section>
    </div>
  );
}
