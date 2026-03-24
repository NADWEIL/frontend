export interface LearningCategory {
  slug: string;
  label: string;
}

export const LEARNING_CATEGORIES: LearningCategory[] = [
  { slug: "animaux", label: "Animaux" },
  { slug: "heure", label: "Heures" },
  { slug: "jour", label: "Jours" },
  { slug: "mois", label: "Mois" },
  { slug: "nombre", label: "Nombres" },
  { slug: "plante", label: "Plantes" },
  { slug: "saison", label: "Saisons" },
];

export const getLearningCategory = (slug: string) =>
  LEARNING_CATEGORIES.find((category) => category.slug === slug);
