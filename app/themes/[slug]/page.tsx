import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLearningCategory,
  LEARNING_CATEGORIES,
} from "../../learning-categories";
import { NumberThemeContent } from "./number-theme-content";
import { ThemeLanguageCards } from "./theme-language-cards";

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

const MONTHS = [
  { french: "Janvier", shimaorais: "À compléter" },
  { french: "Février", shimaorais: "À compléter" },
  { french: "Mars", shimaorais: "À compléter" },
  { french: "Avril", shimaorais: "À compléter" },
  { french: "Mai", shimaorais: "À compléter" },
  { french: "Juin", shimaorais: "À compléter" },
  { french: "Juillet", shimaorais: "À compléter" },
  { french: "Août", shimaorais: "À compléter" },
  { french: "Septembre", shimaorais: "À compléter" },
  { french: "Octobre", shimaorais: "À compléter" },
  { french: "Novembre", shimaorais: "À compléter" },
  { french: "Décembre", shimaorais: "À compléter" },
];

const NUMBERS = [
  { french: "Zéro", shimaorais: "KAVU" },
  { french: "Un", shimaorais: "MOJA" },
  { french: "Deux", shimaorais: "MBILI" },
  { french: "Trois", shimaorais: "TRARU" },
  { french: "Quatre", shimaorais: "NNE" },
  { french: "Cinq", shimaorais: "TSANO" },
  { french: "Six", shimaorais: "SITA" },
  { french: "Sept", shimaorais: "SAƁA" },
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
  { french: "Trente", shimaorais: "THELATHINI" },
  { french: "Quarante", shimaorais: "ARƁAINI" },
  { french: "Cinquante", shimaorais: "HAMSINI" },
  { french: "Soixante", shimaorais: "SITINI" },
  { french: "Soixante-dix", shimaorais: "SAƁWINI" },
  { french: "Quatre-vingts", shimaorais: "THAMANINI" },
  { french: "Quatre-vingt-dix", shimaorais: "TUSWINI" },
  { french: "Cent", shimaorais: "MIA" },
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

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(88,204,2,0.14),_transparent_32%),linear-gradient(180deg,_#f7fbf1_0%,_#ffffff_34%,_#f6f8f2_100%)] px-5 py-5 dark:bg-[radial-gradient(circle_at_top,_rgba(88,204,2,0.12),_transparent_28%),linear-gradient(180deg,_#111713_0%,_#171a16_45%,_#141713_100%)]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:bg-primary/10 dark:bg-gray-900/80"
        >
          ← Retour au dictionnaire
        </Link>

        <section className="mt-4 overflow-hidden rounded-[2rem] border border-primary/10 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(245,250,240,0.96))] p-6 shadow-[0_24px_70px_rgba(88,204,2,0.10)] dark:border-primary/15 dark:bg-[linear-gradient(135deg,_rgba(24,29,24,0.97),_rgba(18,22,18,0.97))]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
            {slug === "jour" ? "Semaine" : "Page temporaire"}
          </p>
          <h1 className="mt-2 text-[30px] font-semibold tracking-tight text-gray-900 dark:text-white md:text-[38px]">
            {category.label}
          </h1>
          {slug === "jour" ? (
            <>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                Apprend les jours de la semaine en français et en shimaorais.
              </p>

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
          ) : slug === "mois" ? (
            <>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                Apprend les mois de l&apos;année en français et ajoute ensuite
                leur traduction en shimaorais.
              </p>

              <ThemeLanguageCards
                items={MONTHS}
                labelPrefix="Mois"
                columnsClassName="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
              />
            </>
          ) : slug === "nombre" ? (
            <>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                Apprend les nombres en français et ajoute ensuite leur
                traduction en shimaorais.
              </p>

              <NumberThemeContent
                numbers={NUMBERS}
                teenNumbers={TEEN_NUMBERS}
                baseTenNumbers={BASE_TEN_NUMBERS}
                largeNumbers={LARGE_NUMBERS}
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
