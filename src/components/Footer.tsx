import type { Language } from "../data/menu";

type Props = {
  language: Language;
};

export function Footer({ language }: Props) {
  const copy =
    language === "en"
      ? {
          note: "All photos are for illustration only. Menus and prices are subject to change without notice.",
           }
      : {
          note: "Les photos sont fournies à titre d illustration. Les menus et les prix peuvent changer sans préavis.",
          };

  return (
    <footer className="border-t border-brand-cream bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-700">
        <p>{copy.note}</p>
       
      </div>
    </footer>
  );
}
