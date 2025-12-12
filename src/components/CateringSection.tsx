import type { Language } from "../data/menu";
import { cateringCopy, cateringRows } from "../data/catering";

type Props = {
  language: Language;
};

export function CateringSection({ language }: Props) {
  const copy = cateringCopy[language];

  const headers =
    language === "en"
      ? { type: "Type", typical: "Typical dishes" }
      : { type: "Type", typical: "Plats typiques" };

  const dietaryHeaders =
    language === "en"
      ? ["Vegan", "Nut free", "Gluten free", "Vegetarian"]
      : ["Végétalien", "Sans noix", "Sans gluten", "Végétarien"];

  return (
    <section
      id="catering"
      aria-labelledby="catering-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="max-w-3xl space-y-3">
          <h2
            id="catering-heading"
            className="font-display text-3xl font-semibold text-brand-brown"
          >
            {copy.title}
          </h2>
          <p className="text-sm text-slate-700">{copy.subtitle}</p>
        </header>

        <div className="mt-8 overflow-hidden rounded-3xl bg-brand-beige/60 shadow-soft">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-brand-cream">
                <tr>
                  <th className="px-4 py-3 font-semibold text-brand-brown">
                    {headers.type}
                  </th>
                  <th className="px-4 py-3 font-semibold text-brand-brown">
                    {headers.typical}
                  </th>
                  {dietaryHeaders.map((h) => (
                    <th
                      key={h}
                      className="px-3 py-3 text-xs font-semibold text-brand-brown"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cateringRows.map((row) => (
                  <tr
                    key={`${row.tier}-${row.mealKey}`}
                    className="border-t border-brand-cream/60"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 text-xs font-semibold text-brand-brown"
                    >
                      {row.label[language]}
                    </th>
                    <td className="px-4 py-3 text-xs text-slate-700">
                      {row.typical[language]}
                    </td>
                    {(["vegan", "nutFree", "glutenFree", "vegetarian"] as const).map(
                      (key) => (
                        <td
                          key={key}
                          className="px-3 py-3 text-center text-xs text-brand-brown"
                        >
                          {row.options[key] ? (
                            <span aria-label="Available" role="img">
                              ✓
                            </span>
                          ) : (
                            <span aria-hidden="true">-</span>
                          )}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-700">{copy.availabilityNote}</p>
        <p className="mt-1 text-xs text-slate-700">{copy.priceNote}</p>
      </div>
    </section>
  );
}
