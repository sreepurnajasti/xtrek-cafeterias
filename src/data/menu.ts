export type Language = "en" | "fr";

export type Dish = {
  id: string;
  code: string;
  name: { en: string; fr: string };
  description: { en: string; fr: string };
  ingredients: { en: string[]; fr: string[] };
};
