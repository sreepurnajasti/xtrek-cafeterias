import { useEffect, useState } from "react";
import type { Language } from "./data/menu";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CafeteriaGrid } from "./components/CafeteriaGrid";
import { MenuSection } from "./components/MenuSection";
import { CateringSection } from "./components/CateringSection";
import { PricesSection } from "./components/PricesSection";
import { Footer } from "./components/Footer";

function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("xtrek-language");
      if (stored === "en" || stored === "fr") {
        setLanguage(stored);
      } else {
        const browserLang = window.navigator.language;
        if (browserLang.toLowerCase().startsWith("fr")) {
          setLanguage("fr");
        }
      }

      // Simple admin mode based on URL path, for the exercise.
      // Visiting /admin shows the chef tools, / shows the public microsite.
      setIsAdmin(window.location.pathname.startsWith("/admin"));
    }
  }, []);

  function handleLanguageChange(lang: Language) {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("xtrek-language", lang);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-cream/80 via-white to-brand-beige/80">
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <main>
        {!isAdmin && (
          <>
            <Hero language={language} />
            <CafeteriaGrid language={language} />
            <MenuSection language={language} isAdmin={false} />
            <CateringSection language={language} />
            <PricesSection language={language} />
          </>
        )}

        {isAdmin && (
          <section className="bg-brand-beige/60">
            <div className="mx-auto max-w-6xl px-4 py-10">
              <h1 className="font-display text-3xl font-semibold text-brand-brown">
                {language === "en" ? "Chef admin" : "Admin du chef"}
              </h1>
              <p className="mt-2 text-sm text-slate-700">
                {language === "en"
                  ? "Use this private view to manage today s menu. The public microsite at the main URL always shows the latest saved version."
                  : "Utilisez cette vue privée pour gérer le menu du jour. Le microsite public à l URL principale affiche toujours la dernière version enregistrée."}
              </p>
              <div className="mt-8">
                <MenuSection language={language} isAdmin />
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer language={language} />
    </div>
  );
}

export default App;
