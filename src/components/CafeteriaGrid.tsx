import type { Language } from "../data/menu";
import cateringImage from "../assets/catering.jpeg";

type Props = {
  language: Language;
};

const cafeterias = [
  {
    id: "britannia",
    name: "Britannia",
    descriptionEn: "Bright cafeteria close to the river path, ideal for quick breakfasts.",
    descriptionFr:
      "Cafétéria lumineuse près du sentier riverain, idéale pour les déjeuners rapides."
  },
  {
    id: "glebe",
    name: "Glebe",
    descriptionEn: "Cozy urban spot with espresso bar and hearty lunch specials.",
    descriptionFr:
      "Endroit urbain et chaleureux avec bar à espresso et spéciaux du midi copieux."
  },
  {
    id: "mitigomijokan",
    name: "Mitigomijokan",
    descriptionEn: "Open kitchen concept featuring Indigenous inspired dishes.",
    descriptionFr:
      "Cuisine ouverte mettant en valeur des plats d inspiration autochtone."
  },
  {
    id: "versant",
    name: "Versant",
    descriptionEn: "Spacious cafeteria in Gatineau with grill, salad bar and quiet corners.",
    descriptionFr:
      "Grande cafétéria à Gatineau avec grill, bar à salades et coins tranquilles."
  }
];

export function CafeteriaGrid({ language }: Props) {
  const heading =
    language === "en" ? "Find your cafeteria" : "Trouvez votre cafétéria";
  const intro =
    language === "en"
      ? "All xtrek cafeterias are open Monday to Friday. Menus rotate weekly and feature local suppliers from both sides of the river."
      : "Toutes les cafétérias xtrek sont ouvertes du lundi au vendredi. Les menus changent chaque semaine et mettent en vedette des fournisseurs locaux des deux rives.";

  return (
    <section
      id="cafeterias"
      aria-labelledby="cafeterias-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex-1 space-y-3">
            <h2
              id="cafeterias-heading"
              className="font-display text-3xl font-semibold text-brand-brown"
            >
              {heading}
            </h2>
            <p className="text-sm text-slate-700">{intro}</p>
            <p className="text-xs font-handwritten text-brand-terracotta">
              {language === "en"
                ? "Tip: scan the QR code on site to jump straight to today s menu."
                : "Astuce : scannez le code QR sur place pour accéder directement au menu du jour."}
            </p>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-3xl bg-brand-brown shadow-soft">
              <img
                src={cateringImage}
                alt={
                  language === "en"
                    ? "Buffet dishes kept warm in stainless steel chafing dishes"
                    : "Plats de buffet gardés au chaud dans des chafing dishes en acier inoxydable"
                }
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
              <p className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-black/45 px-4 py-1 text-xs font-medium text-brand-cream backdrop-blur">
                {language === "en"
                  ? "Ask about catering right where you eat"
                  : "Informez vous sur le traiteur directement sur place"}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {cafeterias.map((cafe) => (
            <article
              key={cafe.id}
              className="flex flex-col rounded-3xl bg-brand-beige/60 p-5 shadow-soft"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl text-brand-brown">
                  {cafe.name}
                </h3>
                <span className="rounded-full bg-brand-cream px-3 py-1 text-xs font-medium text-brand-teal">
                  {language === "en" ? "Mon to Fri" : "Lun au ven"}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                {language === "en" ? cafe.descriptionEn : cafe.descriptionFr}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
