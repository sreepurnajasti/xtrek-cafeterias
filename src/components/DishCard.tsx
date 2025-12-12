import { useState } from "react";
import type { Dish, Language } from "../data/menu";

type Props = {
  dish: Dish;
  language: Language;
};

export function DishCard({ dish, language }: Props) {
  const [open, setOpen] = useState(false);
  const hasIngredients = dish.ingredients[language].length > 0;

  const name = dish.name[language];
  const description = dish.description[language];

  const ingredientsLabel =
    language === "en"
      ? open
        ? "Hide ingredients"
        : "Show ingredients"
      : open
      ? "Masquer les ingrédients"
      : "Voir les ingrédients";

  return (
    <article className="flex h-full flex-col rounded-3xl bg-white/95 p-5 shadow-soft">
      <header className="space-y-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-terracotta">
            {dish.code.toUpperCase()}
          </p>
          <span className="rounded-full bg-brand-cream px-3 py-1 text-[10px] font-semibold text-brand-brown">
            {language === "en" ? "Chef s pick" : "Choix du chef"}
          </span>
        </div>
        <h3 className="font-display text-lg text-brand-brown">{name}</h3>
      </header>

      <p className="mt-3 text-sm text-slate-800">{description}</p>

      {hasIngredients && (
        <div className="mt-4 border-t border-brand-cream/80 pt-3">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center gap-1 rounded-full bg-brand-cream px-3 py-1 text-[11px] font-semibold text-brand-teal hover:bg-brand-cream/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta focus-visible:ring-offset-2"
            aria-expanded={open}
            aria-controls={`ingredients-${dish.id}`}
          >
            <span aria-hidden="true">{open ? "▾" : "▸"}</span>
            <span>{ingredientsLabel}</span>
          </button>

          {open && (
            <div
              id={`ingredients-${dish.id}`}
              className="mt-3 rounded-2xl bg-brand-beige/80 px-4 py-3 text-xs text-slate-900"
            >
              <p className="mb-2 text-[11px] font-semibold text-brand-brown">
                {language === "en" ? "Ingredients" : "Ingrédients"}
              </p>
              <ul className="grid list-disc gap-x-6 gap-y-1 pl-4 text-[11px] md:grid-cols-2">
                {dish.ingredients[language].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!hasIngredients && dish.id === "mod_mdj" && (
        <p className="mt-4 rounded-2xl bg-brand-cream/70 px-4 py-3 text-xs text-slate-800">
          {language === "en"
            ? "Ingredients are available on request at the counter. Please speak with a member of the cafeteria team if you have allergies."
            : "La liste des ingrédients est disponible sur demande au comptoir. Veuillez parler à un membre de l équipe si vous avez des allergies."}
        </p>
      )}
    </article>
  );
}
