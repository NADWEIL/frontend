"use client";

import { useState } from "react";

type Language = "shimaorais" | "french";

interface ThemeCardItem {
  french: string;
  shimaorais: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface ThemeLanguageCardsProps {
  items: ThemeCardItem[];
  labelPrefix?: string;
  labelFallback?: string;
  labels?: string[];
  columnsClassName: string;
  anchorPrefix?: string;
}

const switchButtonBaseClass =
  "rounded-full px-3 py-1.5 text-xs font-semibold transition";

const themeCardClass =
  "group rounded-[1.15rem] border border-primary/10 bg-white/92 p-2.5 shadow-[0_12px_20px_rgba(17,24,39,0.06)] transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_16px_24px_rgba(88,204,2,0.16)] dark:border-primary/15 dark:bg-gray-900/92";

const themeCardLabelClass =
  "text-[13px] font-semibold uppercase tracking-[0.18em] text-primary/85 md:text-[14px]";

const themeCardTitleClass =
  "mt-1.5 text-lg font-semibold uppercase tracking-normal text-gray-900 transition group-hover:text-primary dark:text-white";

const themeCardDividerClass =
  "mt-2.5 h-px w-full bg-gradient-to-r from-primary/40 via-primary/10 to-transparent";

const themeCardCaptionClass =
  "mt-2 text-[10px] font-medium uppercase tracking-[0.1em] text-gray-500 dark:text-gray-400";

const themeCardSecondaryValueClass =
  "mt-1 text-sm font-medium lowercase leading-5 text-gray-700 dark:text-gray-300";

export function ThemeLanguageCards({
  items,
  labelPrefix,
  labelFallback,
  labels,
  columnsClassName,
  anchorPrefix,
}: ThemeLanguageCardsProps) {
  const [language, setLanguage] = useState<Language>("shimaorais");

  const primaryLabel = language === "shimaorais" ? "Shimaorais" : "Français";
  const secondaryLabel = language === "shimaorais" ? "Français" : "Shimaorais";

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
          Affichage des cartes
        </p>
        <div className="inline-flex rounded-full border border-primary/20 bg-white/85 p-1 shadow-sm dark:border-primary/15 dark:bg-gray-900/85">
          <button
            type="button"
            onClick={() => setLanguage("shimaorais")}
            className={`${switchButtonBaseClass} ${
              language === "shimaorais"
                ? "bg-primary text-white shadow-sm"
                : "text-gray-600 hover:bg-primary/8 dark:text-gray-300 dark:hover:bg-white/6"
            }`}
          >
            Shimaorais
          </button>
          <button
            type="button"
            onClick={() => setLanguage("french")}
            className={`${switchButtonBaseClass} ${
              language === "french"
                ? "bg-primary text-white shadow-sm"
                : "text-gray-600 hover:bg-primary/8 dark:text-gray-300 dark:hover:bg-white/6"
            }`}
          >
            Français
          </button>
        </div>
      </div>

      <div className={`${columnsClassName} mt-4`}>
        {items.map((item, index) => {
          const cardLabel = labels?.[index]
            ? labels[index]
            : labelPrefix
              ? `${labelPrefix} ${index + 1}`
              : labelFallback || "";
          const anchorId = anchorPrefix ? `${anchorPrefix}-${index}` : undefined;
          const primaryValue =
            language === "shimaorais" ? item.shimaorais : item.french;
          const secondaryValue =
            language === "shimaorais" ? item.french : item.shimaorais;

          return (
            <article
              id={anchorId}
              key={`${item.french}-${item.shimaorais}`}
              className={`${themeCardClass} scroll-mt-28`}
            >
              {item.imageSrc ? (
                <div className="mb-2.5 overflow-hidden rounded-[0.95rem] border border-primary/10 bg-[linear-gradient(135deg,_rgba(225,246,211,0.85),_rgba(255,255,255,0.95))] dark:border-primary/15 dark:bg-[linear-gradient(135deg,_rgba(46,62,46,0.95),_rgba(22,28,22,0.98))]">
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt || item.french}
                    className="h-32 w-full object-cover"
                  />
                </div>
              ) : null}
              {cardLabel ? <p className={themeCardLabelClass}>{cardLabel}</p> : null}
              <h2 className={themeCardTitleClass}>{primaryValue}</h2>
              <div className={themeCardDividerClass} />
              <p className={themeCardCaptionClass}>{secondaryLabel}</p>
              <p className={themeCardSecondaryValueClass}>{secondaryValue}</p>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.1em] text-primary/70">
                Vue active: {primaryLabel}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
