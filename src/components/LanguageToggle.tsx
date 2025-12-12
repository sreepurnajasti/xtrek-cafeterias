import type { Language } from "../data/menu";

type Props = {
  language: Language;
  onChange: (language: Language) => void;
};

export function LanguageToggle({ language, onChange }: Props) {
  return (
    <div className="inline-flex rounded-full bg-brand-cream/70 p-1 shadow-soft">
      {(["en", "fr"] as Language[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onChange(lang)}
          className={
            "px-3 py-1 text-sm font-medium rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-teal " +
            (language === lang
              ? "bg-brand-teal text-white"
              : "text-brand-teal hover:bg-brand-cream")
          }
          aria-pressed={language === lang}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
