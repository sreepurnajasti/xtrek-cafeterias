import { LanguageToggle } from "./LanguageToggle";
import type { Language } from "../data/menu";
import fullLogo from "../assets/logo-full.svg";

type Props = {
  language: Language;
  onLanguageChange: (language: Language) => void;
};

export function Header({ language, onLanguageChange }: Props) {
  const copy =
    language === "en"
      ? {
          menu: "Menu",
          cafeterias: "Cafeterias",
          catering: "Catering",
          prices: "Prices"
        }
      : {
          menu: "Menu",
          cafeterias: "Cafétérias",
          catering: "Traiteur",
          prices: "Tarifs"
        };

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-brand-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={fullLogo}
            alt="xtrek cafeterias"
            className="h-10 w-auto"
          />
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          <a
            href="#cafeterias"
            className="text-sm font-medium text-brand-brown hover:text-brand-teal"
          >
            {copy.cafeterias}
          </a>
          <a
            href="#menu"
            className="text-sm font-medium text-brand-brown hover:text-brand-teal"
          >
            {copy.menu}
          </a>
          <a
            href="#catering"
            className="text-sm font-medium text-brand-brown hover:text-brand-teal"
          >
            {copy.catering}
          </a>
          <a
            href="#prices"
            className="text-sm font-medium text-brand-brown hover:text-brand-teal"
          >
            {copy.prices}
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle language={language} onChange={onLanguageChange} />
        </div>
      </div>
    </header>
  );
}
