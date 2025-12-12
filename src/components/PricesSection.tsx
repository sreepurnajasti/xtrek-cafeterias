import { useState } from "react";
import type { Language } from "../data/menu";

type Props = {
  language: Language;
};

type ApiState<T> = {
  loading: boolean;
  error: string | null;
  data: T | null;
};

type DailyPricesResponse = {
  updatedAt?: string;
  source?: string;
  payload?: Record<string, number | string>;
};

type CateringPricesResponse = {
  updatedAt?: string;
  source?: string;
  payload?: Record<string, number | string>;
};

const dishLabels: Record<string, { en: string; fr: string }> = {
  mgb_bmc: {
    en: "Mediterranean Grain Bowl",
    fr: "Bol méditerranéen aux céréales"
  },
  tgc_cvt: {
    en: "Thai Green Curry with Tofu",
    fr: "Curry vert thaï au tofu"
  },
  lvl_lvg: {
    en: "Loaded Veggie Lasagna",
    fr: "Lasagne végétarienne gourmande"
  },
  pjs_sje: {
    en: "BBQ Pulled Jackfruit Sandwich",
    fr: "Sandwich au jackfruit effiloché BBQ"
  },
  mod_mdj: {
    en: "Menu of the day",
    fr: "Menu du jour"
  }
};

const cateringLabels: Record<string, { en: string; fr: string }> = {
  standard_breakfast: {
    en: "Standard breakfast",
    fr: "Déjeuner standard"
  },
  premium_breakfast: {
    en: "Premium breakfast",
    fr: "Déjeuner premium"
  },
  standard_lunch: {
    en: "Standard lunch",
    fr: "Dîner standard"
  },
  premium_lunch: {
    en: "Premium lunch",
    fr: "Dîner premium"
  },
  standard_dinner: {
    en: "Standard dinner",
    fr: "Souper standard"
  },
  premium_dinner: {
    en: "Premium dinner",
    fr: "Souper premium"
  }
};

export function PricesSection({ language }: Props) {
  const [dailyState, setDailyState] = useState<ApiState<DailyPricesResponse>>({
    loading: false,
    error: null,
    data: null
  });
  const [cafeteriaId, setCafeteriaId] = useState("britannia");
  const [cateringState, setCateringState] = useState<
    ApiState<CateringPricesResponse>
  >({
    loading: false,
    error: null,
    data: null
  });

  async function loadDailyPrices() {
    setDailyState({ loading: true, error: null, data: null });
    try {
      const res = await fetch("/api/prices/daily");
      if (!res.ok) {
        throw new Error("Network error");
      }
      const json = (await res.json()) as DailyPricesResponse;
      setDailyState({ loading: false, error: null, data: json });
    } catch {
      setDailyState({
        loading: false,
        error:
          language === "en"
            ? "Could not load prices right now."
            : "Impossible de charger les tarifs pour le moment.",
        data: null
      });
    }
  }

  async function loadCateringQuote() {
    setCateringState({ loading: true, error: null, data: null });
    try {
      const res = await fetch("/api/prices/catering", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cafeteria_id: cafeteriaId })
      });
      if (!res.ok) {
        throw new Error("Network error");
      }
      const json = (await res.json()) as CateringPricesResponse;
      setCateringState({ loading: false, error: null, data: json });
    } catch {
      setCateringState({
        loading: false,
        error:
          language === "en"
            ? "Could not load catering information."
            : "Impossible de charger les informations de traiteur.",
        data: null
      });
    }
  }

  const copy =
    language === "en"
      ? {
          title: "Prices and availability",
          intro:
            "These tools connect to the pricing endpoint through a small Node service. In production the service refreshes the data every Sunday after the cash register update.",
          dailyTitle: "Daily price list",
          dailyAction: "Load today's prices",
          // dailyUpdated: "Last updated",
          cateringTitle: "Catering quote by cafeteria",
          cateringLabel: "Choose a cafeteria",
          cateringAction: "Request catering details",
          perServing: "per person"
        }
      : {
          title: "Tarifs et disponibilité",
          intro:
            "Ces outils se connectent au point de terminaison tarifaire à travers un petit service Node. En production, ce service actualise les données chaque dimanche après la mise à jour des caisses.",
          dailyTitle: "Liste de prix du jour",
          dailyAction: "Charger les tarifs du jour",
          // dailyUpdated: "Dernière mise à jour",
          cateringTitle: "Soumission de traiteur par cafétéria",
          cateringLabel: "Choisissez une cafétéria",
          cateringAction: "Demander les détails du traiteur",
          perServing: "par personne"
        };

  function formatUpdatedAt(iso?: string) {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  }

  function formatPrice(value: number | string) {
    const numeric =
      typeof value === "number" ? value : Number.parseFloat(String(value));
    if (Number.isFinite(numeric)) {
      return `${numeric.toFixed(2)} $`;
    }
    // Fallback: show raw value if we cannot parse
    return String(value);
  }

  function renderDailyTable() {
    if (!dailyState.data || !dailyState.data.payload) return null;
    const entries = Object.entries(dailyState.data.payload);
    if (entries.length === 0) return null;

    return (
      <div className="mt-4 overflow-hidden rounded-2xl bg-brand-cream/60">
        <table className="min-w-full text-left text-xs text-brand-brown">
          <thead className="bg-brand-cream/90 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">
                {language === "en" ? "Dish" : "Plat"}
              </th>
              <th className="px-4 py-2 text-right">
                {language === "en" ? "Price" : "Prix"}
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([code, price]) => {
              const label = dishLabels[code];
              const text = label ? label[language] : code.toUpperCase();
              return (
                <tr key={code} className="border-t border-brand-cream/80">
                  <td className="px-4 py-2 text-[11px] font-semibold">
                    {code.toUpperCase()}
                  </td>
                  <td className="px-4 py-2 text-[11px]">{text}</td>
                  <td className="px-4 py-2 text-right text-[11px] font-semibold">
                    {formatPrice(price)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  function renderCateringTable() {
    if (!cateringState.data || !cateringState.data.payload) return null;
    const entries = Object.entries(cateringState.data.payload);
    if (entries.length === 0) return null;

    return (
      <div className="mt-4 overflow-hidden rounded-2xl bg-brand-cream/60">
        <table className="min-w-full text-left text-xs text-brand-brown">
          <thead className="bg-brand-cream/90 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="px-4 py-2">
                {language === "en" ? "Package" : "Forfait"}
              </th>
              <th className="px-4 py-2 text-right">
                {language === "en" ? "Price" : "Prix"} ({copy.perServing})
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, price]) => {
              const label = cateringLabels[key];
              const text = label ? label[language] : key.replace("_", " ");
              return (
                <tr key={key} className="border-t border-brand-cream/80">
                  <td className="px-4 py-2 text-[11px]">{text}</td>
                  <td className="px-4 py-2 text-right text-[11px] font-semibold">
                    {formatPrice(price)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <section
      id="prices"
      aria-labelledby="prices-heading"
      className="bg-brand-cream/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="max-w-3xl space-y-3">
          <h2
            id="prices-heading"
            className="font-display text-3xl font-semibold text-brand-brown"
          >
            {copy.title}
          </h2>
          <p className="text-sm text-slate-700">{copy.intro}</p>
        </header>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white/90 p-5 shadow-soft">
            <h3 className="font-display text-lg text-brand-brown">
              {copy.dailyTitle}
            </h3>
            <p className="mt-2 text-xs text-slate-700">
              {language === "en"
                ? "One click fetches the latest structured price list from the Node cache."
                : "Un clic récupère la dernière liste de prix structurée à partir du cache Node."}
            </p>
            <button
              type="button"
              onClick={loadDailyPrices}
              className="mt-4 rounded-full bg-brand-teal px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta focus-visible:ring-offset-2"
            >
              {dailyState.loading ? "Loading..." : copy.dailyAction}
            </button>
            {dailyState.loading && (
              <p className="mt-3 text-xs text-slate-700">
                {language === "en"
                  ? "Loading today s prices..."
                  : "Chargement des tarifs du jour..."}
              </p>
            )}
            {dailyState.error && (
              <p className="mt-3 text-xs text-red-700">{dailyState.error}</p>
            )}
            {/* {dailyState.data && (
              <p className="mt-3 text-[11px] text-slate-700">
                {copy.dailyUpdated}:{" "}
                <span className="font-semibold">
                  {formatUpdatedAt(dailyState.data.updatedAt)}
                </span>
              </p>
            )} */}
            {renderDailyTable()}
          </div>

          <div className="rounded-3xl bg-white/90 p-5 shadow-soft">
            <h3 className="font-display text-lg text-brand-brown">
              {copy.cateringTitle}
            </h3>
            <p className="mt-2 text-xs text-slate-700">
              {language === "en"
                ? "The same Node service can proxy POST requests for cafeteria specific catering information."
                : "Le même service Node peut transmettre des requêtes POST pour obtenir les informations de traiteur propres à chaque cafétéria."}
            </p>
            <label className="mt-3 block text-xs font-medium text-brand-brown">
              {copy.cateringLabel}
              <select
                className="mt-1 w-full rounded-full border border-brand-cream bg-brand-beige/60 px-3 py-1.5 text-xs text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                value={cafeteriaId}
                onChange={(event) => setCafeteriaId(event.target.value)}
              >
                <option value="britannia">Britannia</option>
                <option value="glebe">Glebe</option>
                <option value="mitigomijokan">Mitigomijokan</option>
                <option value="versant">Versant</option>
              </select>
            </label>
            <button
              type="button"
              onClick={loadCateringQuote}
              className="mt-4 rounded-full bg-brand-teal px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta focus-visible:ring-offset-2"
            >
              {cateringState.loading ? "Loading..." : copy.cateringAction}
            </button>
            {/* {cateringState.loading && (
              <p className="mt-3 text-xs text-slate-700">
                {language === "en"
                  ? "Loading catering prices..."
                  : "Chargement des tarifs de traiteur..."}
              </p>
            )} */}
            {cateringState.error && (
              <p className="mt-3 text-xs text-red-700">
                {cateringState.error}
              </p>
            )}
            {/* {cateringState.data && (
              <p className="mt-3 text-[11px] text-slate-700">
                {copy.dailyUpdated}:{" "}
                <span className="font-semibold">
                  {formatUpdatedAt(cateringState.data.updatedAt)}
                </span>
              </p>
            )} */}
            {renderCateringTable()}
          </div>
        </div>

        
      </div>
    </section>
  );
}
