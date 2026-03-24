export interface Example {
  id: number;
  example: string;
}

export interface Word {
  id: number;
  word: string;
  nature: string;
  definition: string;
  status: string;
  examples?: Example[];
}

export const NATURE_OPTIONS = [
  "nom",
  "verbe",
  "adjectif",
  "adverbe",
  "pronom",
  "préposition",
  "conjonction",
  "interjection",
  "expression",
  "autre",
] as const;

export const ALL_NATURES_LABEL = "Toutes";

export const getExamplesText = (examples?: Example[]) =>
  examples?.map((item) => item.example).join(" | ") || "-";

export const normalizeWord = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .toLowerCase();

export const capitalizeWord = (value: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
