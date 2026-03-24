"use client";

import { useState } from "react";
import { ThemeLanguageCards } from "./theme-language-cards";

interface ThemeCardItem {
  french: string;
  shimaorais: string;
}

type NumberGroupKey = "0-10" | "tens" | "hundreds" | "100-plus";
type TensSubgroupKey = "10-20" | "10-100";
type HundredsSubgroupKey = "100-109" | "100-900";
type ThousandsSubgroupKey =
  | "1000-1009"
  | "1000-9000"
  | "100000-900000"
  | "1000000-10000000";

interface NumberThemeContentProps {
  numbers: ThemeCardItem[];
  teenNumbers: ThemeCardItem[];
  baseTenNumbers: ThemeCardItem[];
  hundreds: ThemeCardItem[];
  largeHundreds: ThemeCardItem[];
  thousands: ThemeCardItem[];
  largeNumbers: ThemeCardItem[];
  hundredThousands: ThemeCardItem[];
  millions: ThemeCardItem[];
}

const GROUPS: { key: NumberGroupKey; label: string; title: string }[] = [
  { key: "0-10", label: "Unités", title: "De 0 à 10" },
  { key: "tens", label: "Dizaines", title: "De 10 à 90" },
  { key: "hundreds", label: "Centaines", title: "De 100 à 900" },
  { key: "100-plus", label: "Milliers", title: "100 et plus" },
];

const TENS_SUBGROUPS: {
  key: TensSubgroupKey;
  label: string;
  title: string;
}[] = [
  { key: "10-20", label: "De 10 à 20", title: "De 10 à 20" },
  { key: "10-100", label: "De 20 à 90", title: "De 20 à 90" },
];

const HUNDREDS_SUBGROUPS: {
  key: HundredsSubgroupKey;
  label: string;
  title: string;
}[] = [
  { key: "100-109", label: "De 100 à 109", title: "De 100 à 109" },
  { key: "100-900", label: "De 100 à 900", title: "De 100 à 900" },
];

const THOUSANDS_SUBGROUPS: {
  key: ThousandsSubgroupKey;
  label: string;
  title: string;
}[] = [
  { key: "1000-1009", label: "De 1000 à 1009", title: "De 1000 à 1009" },
  { key: "1000-9000", label: "De 1000 à 9000", title: "De 1000 à 9000" },
  {
    key: "100000-900000",
    label: "De 100000 à 900000",
    title: "De 100000 à 900000",
  },
  {
    key: "1000000-10000000",
    label: "De 1000000 à 10000000",
    title: "De 1000000 à 10000000",
  },
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
const BASE_TEN_LABELS = ["10", "20", "30", "40", "50", "60", "70", "80", "90"];
const HUNDREDS_LABELS = [
  "100",
  "101",
  "102",
  "103",
  "104",
  "105",
  "106",
  "107",
  "108",
  "109",
];
const LARGE_HUNDREDS_LABELS = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];
const THOUSANDS_LABELS = [
  "1000",
  "1001",
  "1002",
  "1003",
  "1004",
  "1005",
  "1006",
  "1007",
  "1008",
  "1009",
];
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
const HUNDRED_THOUSAND_LABELS = [
  "100000",
  "200000",
  "300000",
  "400000",
  "500000",
  "600000",
  "700000",
  "800000",
  "900000",
];
const MILLION_LABELS = [
  "1000000",
  "2000000",
  "3000000",
  "4000000",
  "5000000",
  "6000000",
  "7000000",
  "8000000",
  "9000000",
  "10000000",
];

export function NumberThemeContent({
  numbers,
  teenNumbers,
  baseTenNumbers,
  hundreds,
  largeHundreds,
  thousands,
  largeNumbers,
  hundredThousands,
  millions,
}: NumberThemeContentProps) {
  const [selectedGroup, setSelectedGroup] = useState<NumberGroupKey>("0-10");
  const [selectedTensSubgroup, setSelectedTensSubgroup] =
    useState<TensSubgroupKey>("10-20");
  const [selectedHundredsSubgroup, setSelectedHundredsSubgroup] =
    useState<HundredsSubgroupKey>("100-109");
  const [selectedThousandsSubgroup, setSelectedThousandsSubgroup] =
    useState<ThousandsSubgroupKey>("1000-1009");

  const selectedConfig = GROUPS.find((group) => group.key === selectedGroup)!;
  const selectedTensConfig = TENS_SUBGROUPS.find(
    (group) => group.key === selectedTensSubgroup,
  )!;
  const selectedHundredsConfig = HUNDREDS_SUBGROUPS.find(
    (group) => group.key === selectedHundredsSubgroup,
  )!;
  const selectedThousandsConfig = THOUSANDS_SUBGROUPS.find(
    (group) => group.key === selectedThousandsSubgroup,
  )!;

  const selectedContent = {
    "0-10": (
      <ThemeLanguageCards
        items={numbers}
        labels={NUMBER_LABELS}
        columnsClassName="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3"
        anchorPrefix="number"
      />
    ),
    tens: (
      <>
        <div className="mt-5 rounded-[1.35rem] border border-primary/10 bg-white/88 p-3 shadow-[0_10px_24px_rgba(17,24,39,0.06)] dark:border-primary/15 dark:bg-gray-900/88">
          <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-primary/80 md:text-[14px]">
            Sous-groupes
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {TENS_SUBGROUPS.map((group) => (
              <button
                key={group.key}
                type="button"
                onClick={() => setSelectedTensSubgroup(group.key)}
                className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                  selectedTensSubgroup === group.key
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-primary/40 dark:hover:bg-primary/10"
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
          {selectedTensConfig.title}
        </p>

        {selectedTensSubgroup === "10-20" ? (
          <ThemeLanguageCards
            items={teenNumbers}
            labels={TEEN_NUMBER_LABELS}
            columnsClassName="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3"
          />
        ) : (
          <ThemeLanguageCards
            items={baseTenNumbers}
            labels={BASE_TEN_LABELS}
            columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
          />
        )}
      </>
    ),
    hundreds: (
      <>
        <div className="mt-5 rounded-[1.35rem] border border-primary/10 bg-white/88 p-3 shadow-[0_10px_24px_rgba(17,24,39,0.06)] dark:border-primary/15 dark:bg-gray-900/88">
          <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-primary/80 md:text-[14px]">
            Sous-groupes
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {HUNDREDS_SUBGROUPS.map((group) => (
              <button
                key={group.key}
                type="button"
                onClick={() => setSelectedHundredsSubgroup(group.key)}
                className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                  selectedHundredsSubgroup === group.key
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-primary/40 dark:hover:bg-primary/10"
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
          {selectedHundredsConfig.title}
        </p>

        {selectedHundredsSubgroup === "100-109" ? (
          <ThemeLanguageCards
            items={hundreds}
            labels={HUNDREDS_LABELS}
            columnsClassName="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3"
          />
        ) : (
          <ThemeLanguageCards
            items={largeHundreds}
            labels={LARGE_HUNDREDS_LABELS}
            columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
          />
        )}
      </>
    ),
    "100-plus": (
      <>
        <div className="mt-5 rounded-[1.35rem] border border-primary/10 bg-white/88 p-3 shadow-[0_10px_24px_rgba(17,24,39,0.06)] dark:border-primary/15 dark:bg-gray-900/88">
          <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-primary/80 md:text-[14px]">
            Sous-groupes
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {THOUSANDS_SUBGROUPS.map((group) => (
              <button
                key={group.key}
                type="button"
                onClick={() => setSelectedThousandsSubgroup(group.key)}
                className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                  selectedThousandsSubgroup === group.key
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-primary/40 dark:hover:bg-primary/10"
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
          {selectedThousandsConfig.title}
        </p>

        {selectedThousandsSubgroup === "1000-1009" ? (
          <ThemeLanguageCards
            items={thousands}
            labels={THOUSANDS_LABELS}
            columnsClassName="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3"
          />
        ) : selectedThousandsSubgroup === "1000-9000" ? (
          <ThemeLanguageCards
            items={largeNumbers}
            labels={THOUSAND_LABELS}
            columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
          />
        ) : selectedThousandsSubgroup === "100000-900000" ? (
          <ThemeLanguageCards
            items={hundredThousands}
            labels={HUNDRED_THOUSAND_LABELS}
            columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
          />
        ) : (
          <ThemeLanguageCards
            items={millions}
            labels={MILLION_LABELS}
            columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
          />
        )}
      </>
    ),
  }[selectedGroup];

  return (
    <div className="mt-5 grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
      <aside className="rounded-[1.5rem] border border-primary/10 bg-white/88 p-4 shadow-[0_14px_28px_rgba(17,24,39,0.08)] dark:border-primary/15 dark:bg-gray-900/88 lg:sticky lg:top-24">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
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
        {selectedGroup !== "tens" &&
        selectedGroup !== "hundreds" &&
        selectedGroup !== "100-plus" ? (
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {selectedConfig.title}
          </p>
        ) : null}
        {selectedContent}
      </section>
    </div>
  );
}
