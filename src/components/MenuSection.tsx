import { useEffect, useState } from "react";
import type { Dish, Language } from "../data/menu";
import { DishCard } from "./DishCard";
import { ChefMenuEditor } from "./ChefMenuEditor";

type Props = {
  language: Language;
  isAdmin?: boolean;
};

export function MenuSection({ language, isAdmin = false }: Props) {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMenu() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/menu");
        if (!res.ok) {
          throw new Error("Network error");
        }
        const json = (await res.json()) as Dish[];
        setDishes(json);
      } catch (err) {
        setError(
          language === "en"
            ? "Could not load today s menu."
            : "Impossible de charger le menu du jour."
        );
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, [language]);

  const heading = language === "en" ? "Today s menu" : "Menu du jour";
  const intro =
    language === "en"
      ? "Here are the dishes available today. Ingredients are always available and can be expanded for each item."
      : "Voici les plats offerts aujourd hui. Les ingrédients sont toujours disponibles et peuvent être affichés pour chaque plat.";

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="bg-brand-beige/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="max-w-3xl space-y-2">
          <h2
            id="menu-heading"
            className="font-display text-3xl font-semibold text-brand-brown"
          >
            {heading}
          </h2>
          <p className="text-sm text-slate-700">{intro}</p>
        </header>

        {loading && (
          <p className="mt-6 text-sm text-slate-700">
            {language === "en"
              ? "Loading today s menu..."
              : "Chargement du menu du jour..."}
          </p>
        )}

        {error && (
          <p className="mt-6 text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} language={language} />
            ))}
          </div>
        )}

        {isAdmin && (
          <div id="chef-tools" className="mt-10">
            <ChefMenuEditor
              language={language}
              dishes={dishes}
              onDishesChange={setDishes}
            />
          </div>
        )}
      </div>
    </section>
  );
}
