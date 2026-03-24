import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLearningCategory,
  LEARNING_CATEGORIES,
} from "../../learning-categories";
import { NumberThemeContent } from "./number-theme-content";
import { ThemeLanguageCards } from "./theme-language-cards";

const createPlantImage = (emoji: string, start: string, end: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="320" height="220" rx="28" fill="url(#bg)" />
      <circle cx="265" cy="48" r="28" fill="rgba(255,255,255,0.26)" />
      <circle cx="62" cy="176" r="38" fill="rgba(255,255,255,0.18)" />
      <text x="160" y="132" text-anchor="middle" font-size="88">${emoji}</text>
      <path d="M76 178c38-18 132-18 168 0" stroke="rgba(32,72,32,0.22)" stroke-width="8" stroke-linecap="round" fill="none" />
    </svg>
  `)}`;

const WEEK_DAYS = [
  { french: "Samedi", shimaorais: "Mfumo tsi" },
  { french: "Dimanche", shimaorais: "Mfumo wambvili" },
  { french: "Lundi", shimaorais: "Mfumo wararu" },
  { french: "Mardi", shimaorais: "Mfumo wanné" },
  { french: "Mercredi", shimaorais: "Mfumo watsano" },
  { french: "Jeudi", shimaorais: "Yahowa" },
  { french: "Vendredi", shimaorais: "Idjimwa" },
];

const TIME_UNITS = [
  { french: "Jour", shimaorais: "Suku" },
  { french: "Semaine", shimaorais: "Mfumo" },
];

const HOURS = [
  { french: "Une heure", shimaorais: "Saa ya handra" },
  { french: "Deux heures", shimaorais: "Saa ya mbvili" },
  { french: "Trois heures", shimaorais: "Saa ya traru" },
  { french: "Quatre heures", shimaorais: "Saa ya nne" },
  { french: "Cinq heures", shimaorais: "Saa ya tsano" },
  { french: "Six heures", shimaorais: "Saa ya sita" },
  { french: "Sept heures", shimaorais: "Saa ya saba" },
  { french: "Huit heures", shimaorais: "Saa ya nane" },
  { french: "Neuf heures", shimaorais: "Saa ya shendra" },
  { french: "Dix heures", shimaorais: "Saa ya kumi" },
  { french: "Onze heures", shimaorais: "Saa kumi na moja" },
  { french: "Douze heures", shimaorais: "Saa kumi na mbili" },
];

const HOUR_EXPRESSIONS = [
  { french: "Midi", shimaorais: "Saa kumi na mbili ya mtsana" },
  { french: "Minuit", shimaorais: "Saa kumi na mbili ya usiku" },
  { french: "Et quart", shimaorais: "na robu" },
  { french: "Et demie", shimaorais: "na nusu" },
  { french: "Moins le quart", shimaorais: "kasoro robu" },
  { french: "Du matin", shimaorais: "ya asubuhi" },
  { french: "De l'après-midi", shimaorais: "ya mtsana" },
  { french: "Du soir", shimaorais: "ya ujioni" },
];

const MONTHS = [
  { french: "Janvier", shimaorais: "JANWARI" },
  { french: "Février", shimaorais: "FEWURI" },
  { french: "Mars", shimaorais: "MASI" },
  { french: "Avril", shimaorais: "APRIL" },
  { french: "Mai", shimaorais: "MEI" },
  { french: "Juin", shimaorais: "JUNI" },
  { french: "Juillet", shimaorais: "JULAI" },
  { french: "Août", shimaorais: "AGOSTI" },
  { french: "Septembre", shimaorais: "SEPTEMBA" },
  { french: "Octobre", shimaorais: "OKTOBA" },
  { french: "Novembre", shimaorais: "NOVEMBA" },
  { french: "Décembre", shimaorais: "DESANBA" },
];

const PLANTS = [
  {
    french: "Arbre",
    shimaorais: "MTI",
    imageSrc: createPlantImage("🌳", "#c6f7d0", "#86d993"),
    imageAlt: "Illustration d'un arbre",
  },
  {
    french: "Fleur",
    shimaorais: "UA",
    imageSrc: createPlantImage("🌺", "#ffd8e6", "#ffc38a"),
    imageAlt: "Illustration d'une fleur",
  },
  {
    french: "Feuille",
    shimaorais: "JANI",
    imageSrc: createPlantImage("🍃", "#d8f7bf", "#95d57e"),
    imageAlt: "Illustration d'une feuille",
  },
  {
    french: "Racine",
    shimaorais: "MZIZI",
    imageSrc: createPlantImage("🪴", "#ead7bf", "#c99d72"),
    imageAlt: "Illustration de racines",
  },
  {
    french: "Tige",
    shimaorais: "BATA",
    imageSrc: createPlantImage("🌿", "#d6f2c1", "#7bc96f"),
    imageAlt: "Illustration d'une tige",
  },
  {
    french: "Herbe",
    shimaorais: "NYASI",
    imageSrc: createPlantImage("🌱", "#d7f7bb", "#8fd468"),
    imageAlt: "Illustration d'herbe",
  },
  {
    french: "Graine",
    shimaorais: "MBEŨ",
    imageSrc: createPlantImage("🌰", "#f0dfbe", "#c08a5d"),
    imageAlt: "Illustration d'une graine",
  },
  {
    french: "Fruit",
    shimaorais: "MATUNDUMA",
    imageSrc: createPlantImage("🥭", "#ffe1a8", "#ffb347"),
    imageAlt: "Illustration d'un fruit",
  },
];

const PLANT_PARTS = [
  {
    french: "Branche",
    shimaorais: "TWIŨ",
    imageSrc: createPlantImage("🌿", "#dff6c7", "#8bcf84"),
    imageAlt: "Illustration d'une branche",
  },
  {
    french: "Tronc",
    shimaorais: "SHINZI",
    imageSrc: createPlantImage("🪵", "#f1d9b7", "#b7794a"),
    imageAlt: "Illustration d'un tronc",
  },
  {
    french: "Écorce",
    shimaorais: "GUNGU",
    imageSrc: createPlantImage("🪵", "#ead3b0", "#9c6644"),
    imageAlt: "Illustration d'écorce",
  },
  {
    french: "Sève",
    shimaorais: "DAMU YA MTI",
    imageSrc: createPlantImage("💧", "#d9f2ff", "#7fc8f8"),
    imageAlt: "Illustration de sève",
  },
  {
    french: "Pétale",
    shimaorais: "UA LAUA",
    imageSrc: createPlantImage("🌸", "#ffe0ef", "#ffb6c1"),
    imageAlt: "Illustration d'un pétale",
  },
  {
    french: "Épine",
    shimaorais: "MWENGU",
    imageSrc: createPlantImage("🌵", "#d9f2c3", "#7abf66"),
    imageAlt: "Illustration d'une épine",
  },
  {
    french: "Bourgeon",
    shimaorais: "VIUVIU",
    imageSrc: createPlantImage("🌱", "#e1f7c9", "#8bd36e"),
    imageAlt: "Illustration d'un bourgeon",
  },
  {
    french: "Liane",
    shimaorais: "MVUƊI",
    imageSrc: createPlantImage("🌿", "#d1f0bf", "#66bb6a"),
    imageAlt: "Illustration d'une liane",
  },
];

const PLANT_FOODS = [
  {
    french: "Banane",
    shimaorais: "NDZIWA",
    imageSrc: createPlantImage("🍌", "#fff2a8", "#ffd166"),
    imageAlt: "Illustration d'une banane",
  },
  {
    french: "Mangue",
    shimaorais: "EMBE",
    imageSrc: createPlantImage("🥭", "#ffe2a6", "#ff9f68"),
    imageAlt: "Illustration d'une mangue",
  },
  {
    french: "Noix de coco",
    shimaorais: "NAZI",
    imageSrc: createPlantImage("🥥", "#f2e3c6", "#b08968"),
    imageAlt: "Illustration d'une noix de coco",
  },
  {
    french: "Manioc",
    shimaorais: "MIHONA",
    imageSrc: createPlantImage("🍠", "#f1d8bb", "#c08552"),
    imageAlt: "Illustration de manioc",
  },
  {
    french: "Maïs",
    shimaorais: "MAHINDI",
    imageSrc: createPlantImage("🌽", "#fff1a8", "#f4c95d"),
    imageAlt: "Illustration de maïs",
  },
  {
    french: "Riz",
    shimaorais: "WÀI",
    imageSrc: createPlantImage("🌾", "#f7efc4", "#d6c06e"),
    imageAlt: "Illustration de riz",
  },
  {
    french: "Tomate",
    shimaorais: "NYAMATOMA",
    imageSrc: createPlantImage("🍅", "#ffd1c7", "#ff6b6b"),
    imageAlt: "Illustration d'une tomate",
  },
  {
    french: "Piment",
    shimaorais: "PILIPILI",
    imageSrc: createPlantImage("🌶️", "#ffd1cf", "#ff7b54"),
    imageAlt: "Illustration d'un piment",
  },
];

const NUMBERS = [
  { french: "Zéro", shimaorais: "KAVU" },
  { french: "Un", shimaorais: "MOJA" },
  { french: "Deux", shimaorais: "MBILI" },
  { french: "Trois", shimaorais: "TRARU" },
  { french: "Quatre", shimaorais: "NNE" },
  { french: "Cinq", shimaorais: "TSANO" },
  { french: "Six", shimaorais: "SITA" },
  { french: "Sept", shimaorais: "SABA" },
  { french: "Huit", shimaorais: "NANE" },
  { french: "Neuf", shimaorais: "SHENDRA" },
  { french: "Dix", shimaorais: "KUMI" },
];

const TEEN_NUMBERS = [
  { french: "Onze", shimaorais: "KUMI NA MOJA" },
  { french: "Douze", shimaorais: "KUMI NA MBILI" },
  { french: "Treize", shimaorais: "KUMI NA TRARU" },
  { french: "Quatorze", shimaorais: "KUMI NA NNE" },
  { french: "Quinze", shimaorais: "KUMI NA TSANO" },
  { french: "Seize", shimaorais: "KUMI NA SITA" },
  { french: "Dix-sept", shimaorais: "KUMI NA SAƁA" },
  { french: "Dix-huit", shimaorais: "KUMI NA NANE" },
  { french: "Dix-neuf", shimaorais: "KUMI NA SHENDRA" },
  { french: "Vingt", shimaorais: "SHIRINI" },
];

const BASE_TEN_NUMBERS = [
  { french: "Dix", shimaorais: "KUMI" },
  { french: "Vingt", shimaorais: "SHIRINI" },
  { french: "Trente", shimaorais: "THALATHINI" },
  { french: "Quarante", shimaorais: "ARƁAINI" },
  { french: "Cinquante", shimaorais: "HAMSINI" },
  { french: "Soixante", shimaorais: "SITINI" },
  { french: "Soixante-dix", shimaorais: "SABWINI" },
  { french: "Quatre-vingts", shimaorais: "THAMANINI" },
  { french: "Quatre-vingt-dix", shimaorais: "TUSWINI" },
];

const HUNDREDS = [
  { french: "Cent", shimaorais: "MIA" },
  { french: "Cent un", shimaorais: "MIA NA MOJA" },
  { french: "Cent deux", shimaorais: "MIA NA MBILI" },
  { french: "Cent trois", shimaorais: "MIA NA TRARU" },
  { french: "Cent quatre", shimaorais: "MIA NA NNE" },
  { french: "Cent cinq", shimaorais: "MIA NA TSANO" },
  { french: "Cent six", shimaorais: "MIA NA SITA" },
  { french: "Cent sept", shimaorais: "MIA NA SAƁA" },
  { french: "Cent huit", shimaorais: "MIA NA NANE" },
  { french: "Cent neuf", shimaorais: "MIA NA SHENDRA" },
];

const LARGE_HUNDREDS = [
  { french: "Cent", shimaorais: "MIA" },
  { french: "Deux cents", shimaorais: "MIA TENI" },
  { french: "Trois cents", shimaorais: "THALATHA MIA" },
  { french: "Quatre cents", shimaorais: "ARƁA MIA" },
  { french: "Cinq cents", shimaorais: "HAMSU MIA" },
  { french: "Six cents", shimaorais: "SITA MIA" },
  { french: "Sept cents", shimaorais: "SAƁA MIA" },
  { french: "Huit cents", shimaorais: "THAMANI MIA" },
  { french: "Neuf cents", shimaorais: "TUSU MIA" },
];

const THOUSANDS = [
  { french: "Mille", shimaorais: "ALIFU" },
  { french: "Mille un", shimaorais: "ALIFU NA MOJA" },
  { french: "Mille deux", shimaorais: "ALIFU NA MBILI" },
  { french: "Mille trois", shimaorais: "ALIFU NA TRARU" },
  { french: "Mille quatre", shimaorais: "ALIFU NA NNE" },
  { french: "Mille cinq", shimaorais: "ALIFU NA TSANO" },
  { french: "Mille six", shimaorais: "ALIFU NA SITA" },
  { french: "Mille sept", shimaorais: "ALIFU NA SAƁA" },
  { french: "Mille huit", shimaorais: "ALIFU NA NANE" },
  { french: "Mille neuf", shimaorais: "ALIFU NA SHENDRA" },
];

const LARGE_NUMBERS = [
  { french: "Mille", shimaorais: "ALIFU" },
  { french: "Deux mille", shimaorais: "ALIFU MBILI" },
  { french: "Trois mille", shimaorais: "ALIFU TRARU" },
  { french: "Quatre mille", shimaorais: "ALIFU NNE" },
  { french: "Cinq mille", shimaorais: "ALIFU TSANO" },
  { french: "Six mille", shimaorais: "ALIFU SITA" },
  { french: "Sept mille", shimaorais: "ALIFU SAƁA" },
  { french: "Huit mille", shimaorais: "ALIFU NANE" },
  { french: "Neuf mille", shimaorais: "ALIFU SHENDRA" },
];

const HUNDRED_THOUSANDS = [
  { french: "Cent mille", shimaorais: "ALIFU MIA" },
  { french: "Deux cent mille", shimaorais: "ALIFU MIA TENI" },
  { french: "Trois cent mille", shimaorais: "ALIFU THALATHA MIA" },
  { french: "Quatre cent mille", shimaorais: "ALIFU ARƁA MIA" },
  { french: "Cinq cent mille", shimaorais: "ALIFU HAMSU MIA" },
  { french: "Six cent mille", shimaorais: "ALIFU SITA MIA" },
  { french: "Sept cent mille", shimaorais: "ALIFU SAƁA MIA" },
  { french: "Huit cent mille", shimaorais: "ALIFU THAMANI MIA" },
  { french: "Neuf cent mille", shimaorais: "ALIFU TUSU MIA" },
];

const MILLIONS = [
  { french: "Un million", shimaorais: "MILIONI MOJA" },
  { french: "Deux millions", shimaorais: "MILIONI MBILI" },
  { french: "Trois millions", shimaorais: "MILIONI TRARU" },
  { french: "Quatre millions", shimaorais: "MILIONI NNE" },
  { french: "Cinq millions", shimaorais: "MILIONI TSANO" },
  { french: "Six millions", shimaorais: "MILIONI SITA" },
  { french: "Sept millions", shimaorais: "MILIONI SAƁA" },
  { french: "Huit millions", shimaorais: "MILIONI NANE" },
  { french: "Neuf millions", shimaorais: "MILIONI SHENDRA" },
  { french: "Dix millions", shimaorais: "MILIONI KUMI" },
];

interface ThemePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return LEARNING_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export default async function ThemePage({ params }: ThemePageProps) {
  const { slug } = await params;
  const category = getLearningCategory(slug);

  if (!category) {
    notFound();
  }

  const themeDescription =
    slug === "jour"
      ? "Apprend les jours de la semaine en français et en shimaorais."
      : slug === "heure"
        ? "Apprend les heures en français et en shimaorais pour lire et dire l'heure plus facilement."
        : slug === "mois"
          ? "Apprend les mois de l'année en français et ajoute ensuite leur traduction en shimaorais."
          : slug === "plante"
            ? "Découvre le vocabulaire des plantes en français et complète progressivement les traductions en shimaorais."
            : slug === "nombre"
              ? "Découvre les nombres en français et en shimaorais, des unités jusqu'aux millions."
              : slug === "animaux"
                ? "Découvre le vocabulaire des animaux en français et shimaorais."
                : slug === "saison"
                  ? "Découvre les saisons en français et shimaorais."
                  : null;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(88,204,2,0.14),_transparent_32%),linear-gradient(180deg,_#f7fbf1_0%,_#ffffff_34%,_#f6f8f2_100%)] px-5 py-3 dark:bg-[radial-gradient(circle_at_top,_rgba(88,204,2,0.12),_transparent_28%),linear-gradient(180deg,_#111713_0%,_#171a16_45%,_#141713_100%)]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:bg-primary/10 dark:bg-gray-900/80"
        >
          ← Retour au dictionnaire
        </Link>

        <section className="mt-2 overflow-hidden rounded-[2rem] border border-primary/10 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(245,250,240,0.96))] p-6 shadow-[0_24px_70px_rgba(88,204,2,0.10)] dark:border-primary/15 dark:bg-[linear-gradient(135deg,_rgba(24,29,24,0.97),_rgba(18,22,18,0.97))]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
            {slug === "jour"
              ? "Semaine"
              : slug === "heure"
                ? "Temps"
                : slug === "mois"
                  ? "Calendrier"
                  : slug === "plante"
                    ? "Nature"
                    : slug === "nombre"
                      ? "Comptage"
                      : slug === "animaux"
                        ? "Faune"
                        : slug === "saison"
                          ? "Climat"
                          : "Page temporaire"}
          </p>
          <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <h1 className="text-[30px] font-semibold tracking-tight text-gray-900 dark:text-white md:text-[38px]">
              {category.label}
            </h1>
            {themeDescription ? (
              <p className="max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300 md:max-w-md md:text-left">
                {themeDescription}
              </p>
            ) : null}
          </div>
          {slug === "jour" ? (
            <>
              <ThemeLanguageCards
                items={WEEK_DAYS}
                labelPrefix="Jour"
                columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
              />

              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

              <ThemeLanguageCards
                items={TIME_UNITS}
                labelFallback="Unité de temps"
                columnsClassName="grid gap-2.5 sm:grid-cols-2"
              />
            </>
          ) : slug === "heure" ? (
            <>
              <ThemeLanguageCards
                items={HOURS}
                labelPrefix="Heure"
                columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
              />

              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

              <ThemeLanguageCards
                items={HOUR_EXPRESSIONS}
                labelPrefix="Expression"
                columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
              />
            </>
          ) : slug === "mois" ? (
            <>
              <ThemeLanguageCards
                items={MONTHS}
                labelPrefix="Mois"
                columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
              />
            </>
          ) : slug === "plante" ? (
            <>
              <div className="mt-5 grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
                <aside className="rounded-[1.5rem] border border-primary/10 bg-white/88 p-4 shadow-[0_14px_28px_rgba(17,24,39,0.08)] dark:border-primary/15 dark:bg-gray-900/88 lg:sticky lg:top-24">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                    Catégories
                  </h2>
                  <nav className="mt-4 flex flex-col gap-4">
                    <div className="rounded-2xl border border-primary/10 bg-primary/5 p-3 dark:border-primary/15 dark:bg-primary/10">
                      <a
                        href="#plantes-base"
                        className="text-sm font-semibold text-primary transition hover:text-primary/80"
                      >
                        Vocabulaire de base
                      </a>
                      <div className="mt-2 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <a
                          href="#plantes-base"
                          className="transition hover:text-primary"
                        >
                          Plantes simples
                        </a>
                        <a
                          href="#plantes-cultures"
                          className="transition hover:text-primary"
                        >
                          Fruits et cultures
                        </a>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-primary/10 bg-primary/5 p-3 dark:border-primary/15 dark:bg-primary/10">
                      <a
                        href="#plantes-parties"
                        className="text-sm font-semibold text-primary transition hover:text-primary/80"
                      >
                        Parties de la plante
                      </a>
                      <div className="mt-2 flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <a
                          href="#plantes-parties"
                          className="transition hover:text-primary"
                        >
                          Structure
                        </a>
                        <a
                          href="#plantes-details"
                          className="transition hover:text-primary"
                        >
                          Détails botaniques
                        </a>
                      </div>
                    </div>
                  </nav>
                </aside>

                <div className="min-w-0">
                  <div
                    id="plantes-base"
                    className="scroll-mt-28 text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Vocabulaire de base
                  </div>
                  <ThemeLanguageCards
                    items={PLANTS}
                    labelPrefix="Plante"
                    columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
                  />

                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

                  <div
                    id="plantes-parties"
                    className="scroll-mt-28 text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Parties de la plante
                  </div>
                  <ThemeLanguageCards
                    items={PLANT_PARTS}
                    labelPrefix="Partie"
                    columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
                  />

                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

                  <div
                    id="plantes-cultures"
                    className="scroll-mt-28 text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Cultures et aliments
                  </div>
                  <ThemeLanguageCards
                    items={PLANT_FOODS}
                    labelPrefix="Culture"
                    columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
                  />

                  <div
                    id="plantes-details"
                    className="mt-5 rounded-3xl border border-dashed border-primary/25 bg-primary/5 p-5 text-sm text-gray-700 dark:border-primary/20 dark:bg-primary/10 dark:text-gray-200"
                  >
                    Sous-catégorie prête pour ajouter d'autres détails sur les
                    plantes: feuilles, fleurs, troncs, racines ou plantes
                    médicinales.
                  </div>
                </div>
              </div>
            </>
          ) : slug === "nombre" ? (
            <>
              <NumberThemeContent
                numbers={NUMBERS}
                teenNumbers={TEEN_NUMBERS}
                baseTenNumbers={BASE_TEN_NUMBERS}
                hundreds={HUNDREDS}
                largeHundreds={LARGE_HUNDREDS}
                thousands={THOUSANDS}
                largeNumbers={LARGE_NUMBERS}
                hundredThousands={HUNDRED_THOUSANDS}
                millions={MILLIONS}
              />
            </>
          ) : slug === "animaux" ? (
            <>
              <ThemeLanguageCards
                items={[
                  { french: "Chien", shimaorais: "MBWA" },
                  { french: "Chat", shimaorais: "PAHA" },
                  { french: "Oiseau", shimaorais: "GNUGNI" },
                  { french: "Poisson", shimaorais: "FI" },
                  { french: "Vache", shimaorais: "NGOMBé" },
                  { french: "Chèvre", shimaorais: "MBUZI" },
                  { french: "Poulet", shimaorais: "KUHU" },
                  { french: "Éléphant", shimaorais: "Ndovu" },
                ]}
                labelPrefix="Animal"
                columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
              />
            </>
          ) : slug === "saison" ? (
            <>
              <ThemeLanguageCards
                items={[
                  { french: "Printemps", shimaorais: "MASIKA" },
                  { french: "Été", shimaorais: "JUA" },
                  { french: "Automne", shimaorais: "KUHARIBIKA" },
                  { french: "Hiver", shimaorais: "BARADI" },
                ]}
                labelPrefix="Saison"
                columnsClassName="grid gap-2.5 sm:grid-cols-2"
              />
            </>
          ) : (
            <>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300">
                Cette page est volontairement vide pour le moment. On pourra y
                ajouter plus tard du vocabulaire shimaorais autour du thème{" "}
                <span className="font-semibold text-primary">
                  {category.label}
                </span>
                .
              </p>

              <div className="mt-8 rounded-3xl border border-dashed border-primary/30 bg-primary/5 p-6 text-sm text-gray-700 dark:text-gray-200">
                Contenu à venir.
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
