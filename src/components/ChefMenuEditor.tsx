import { useState } from "react";
import type { Dish, Language } from "../data/menu";

type Props = {
  language: Language;
  dishes: Dish[];
  onDishesChange: (dishes: Dish[]) => void;
};

export function ChefMenuEditor({ language, dishes, onDishesChange }: Props) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const label =
    language === "en" ? "Head chef tools" : "Outils du chef";
  const intro =
    language === "en"
      ? "Use this panel to adjust today s menu. Changes are saved to the server and appear immediately on the public page."
      : "Utilisez ce panneau pour ajuster le menu du jour. Les changements sont sauvegardés sur le serveur et apparaissent immédiatement sur la page publique.";

  function updateDishField(
    id: string,
    path: "code" | "name.en" | "name.fr" | "description.en" | "description.fr",
    value: string
  ) {
    const updated = dishes.map((dish) => {
      if (dish.id !== id) return dish;
      if (path === "code") {
        return { ...dish, code: value };
      }
      if (path === "name.en") {
        return { ...dish, name: { ...dish.name, en: value } };
      }
      if (path === "name.fr") {
        return { ...dish, name: { ...dish.name, fr: value } };
      }
      if (path === "description.en") {
        return { ...dish, description: { ...dish.description, en: value } };
      }
      if (path === "description.fr") {
        return { ...dish, description: { ...dish.description, fr: value } };
      }
      return dish;
    });
    onDishesChange(updated);
  }

  async function saveChanges() {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/menu", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dishes)
      });
      if (!res.ok) {
        throw new Error("Network error");
      }
      setSuccess(
        language === "en"
          ? "Menu saved successfully."
          : "Menu enregistré avec succès."
      );
    } catch (err) {
      setError(
        language === "en"
          ? "Could not save the menu."
          : "Impossible d enregistrer le menu."
      );
    } finally {
      setSaving(false);
    }
  }

  if (!dishes || dishes.length === 0) {
    return null;
  }

  return (
    <section aria-label={label} className="rounded-3xl bg-white/90 p-5 shadow-soft">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full rounded-full bg-brand-teal px-4 py-2 text-xs font-semibold text-white hover:bg-brand-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta focus-visible:ring-offset-2"
        aria-expanded={open}
      >
        <span>{label}</span>
        <span aria-hidden="true">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          <p className="text-xs text-slate-700">{intro}</p>
          <div className="max-h-80 space-y-3 overflow-auto rounded-2xl bg-brand-cream/50 p-3">
            {dishes.map((dish) => (
              <div
                key={dish.id}
                className="rounded-2xl bg-white px-3 py-3 shadow-soft"
              >
                <p className="text-[11px] font-semibold text-brand-terracotta">
                  ID: {dish.id}
                </p>
                <label className="mt-2 block text-[11px] font-medium text-brand-brown">
                  Code
                  <input
                    className="mt-1 w-full rounded-full border border-brand-cream bg-brand-beige/60 px-3 py-1 text-[11px] text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                    value={dish.code}
                    onChange={(event) =>
                      updateDishField(dish.id, "code", event.target.value)
                    }
                  />
                </label>
                <label className="mt-2 block text-[11px] font-medium text-brand-brown">
                  Name (EN)
                  <input
                    className="mt-1 w-full rounded-full border border-brand-cream bg-brand-beige/60 px-3 py-1 text-[11px] text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                    value={dish.name.en}
                    onChange={(event) =>
                      updateDishField(dish.id, "name.en", event.target.value)
                    }
                  />
                </label>
                <label className="mt-2 block text-[11px] font-medium text-brand-brown">
                  Nom (FR)
                  <input
                    className="mt-1 w-full rounded-full border border-brand-cream bg-brand-beige/60 px-3 py-1 text-[11px] text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                    value={dish.name.fr}
                    onChange={(event) =>
                      updateDishField(dish.id, "name.fr", event.target.value)
                    }
                  />
                </label>
                <label className="mt-2 block text-[11px] font-medium text-brand-brown">
                  Description (EN)
                  <textarea
                    className="mt-1 w-full rounded-2xl border border-brand-cream bg-brand-beige/60 px-3 py-1 text-[11px] text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                    rows={2}
                    value={dish.description.en}
                    onChange={(event) =>
                      updateDishField(
                        dish.id,
                        "description.en",
                        event.target.value
                      )
                    }
                  />
                </label>
                <label className="mt-2 block text-[11px] font-medium text-brand-brown">
                  Description (FR)
                  <textarea
                    className="mt-1 w-full rounded-2xl border border-brand-cream bg-brand-beige/60 px-3 py-1 text-[11px] text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
                    rows={2}
                    value={dish.description.fr}
                    onChange={(event) =>
                      updateDishField(
                        dish.id,
                        "description.fr",
                        event.target.value
                      )
                    }
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={saveChanges}
              className="rounded-full bg-brand-teal px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta focus-visible:ring-offset-2"
              disabled={saving}
            >
              {saving
                ? language === "en"
                  ? "Saving..."
                  : "Enregistrement..."
                : language === "en"
                ? "Save menu"
                : "Enregistrer le menu"}
            </button>
            {error && <p className="text-xs text-red-700">{error}</p>}
            {success && <p className="text-xs text-emerald-700">{success}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
