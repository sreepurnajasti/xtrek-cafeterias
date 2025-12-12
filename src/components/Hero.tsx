import type { Language } from "../data/menu";
import menuImage from "../assets/menu.jpeg";

type Props = {
  language: Language;
};

export function Hero({ language }: Props) {
  const copy =
    language === "en"
      ? {
          eyebrow: "Fresh, local, every weekday",
          title: "Warm food, bright spaces",
          body: "Four cafeterias across the xtrek campus serving seasonal menus, snacks and catering for your team events.",
          ctaPrimary: "View today's menu",
          ctaSecondary: "Explore catering"
        }
      : {
          eyebrow: "Frais, local, chaque jour de semaine",
          title: "Cuisine chaleureuse, lieux conviviaux",
          body: "Quatre cafétérias sur le campus xtrek offrent menus de saison, collations et service de traiteur pour vos événements.",
          ctaPrimary: "Voir le menu du jour",
          ctaSecondary: "Découvrir le traiteur"
        };

  return (
    <section id="top" className="bg-brand-cream/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-center">
        <div className="flex-1 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-terracotta">
            {copy.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-bold text-brand-brown md:text-5xl">
            {copy.title}
          </h1>
          <p className="max-w-xl text-base text-slate-700">{copy.body}</p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#menu"
              className="inline-flex items-center rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-brand-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta focus-visible:ring-offset-2"
            >
              {copy.ctaPrimary}
            </a>
            <a
              href="#catering"
              className="inline-flex items-center rounded-full border border-brand-teal bg-white px-5 py-2.5 text-sm font-semibold text-brand-teal shadow-soft hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
            >
              {copy.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative overflow-hidden rounded-3xl bg-brand-brown shadow-soft">
            <img
              src={menuImage}
              alt={
                language === "en"
                  ? "Colorful fresh ingredients arranged on a table"
                  : "Ingrédients frais et colorés disposés sur une table"
              }
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            <p className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-black/40 px-4 py-1 text-xs font-medium text-brand-cream backdrop-blur">
              {language === "en"
                ? "Chef driven menus, updated daily"
                : "Menus créés par le chef, mis à jour chaque jour"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
