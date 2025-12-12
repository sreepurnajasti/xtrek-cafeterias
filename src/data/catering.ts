import type { Language } from "./menu";

export type CateringRow = {
  tier: "standard" | "premium";
  mealKey: "breakfast" | "lunch" | "dinner";
  label: { en: string; fr: string };
  typical: { en: string; fr: string };
  options: {
    vegan: boolean;
    nutFree: boolean;
    glutenFree: boolean;
    vegetarian: boolean;
  };
};

export const cateringRows: CateringRow[] = [
  {
    tier: "standard",
    mealKey: "breakfast",
    label: { en: "Standard breakfast", fr: "Déjeuner standard" },
    typical: {
      en: "Pastries, yogurt, juice",
      fr: "Pâtisseries, yogourt, jus"
    },
    options: {
      vegan: true,
      nutFree: false,
      glutenFree: false,
      vegetarian: true
    }
  },
  {
    tier: "standard",
    mealKey: "lunch",
    label: { en: "Standard lunch", fr: "Dîner standard" },
    typical: {
      en: "Sandwiches, salads, fruit",
      fr: "Sandwichs, salades, fruits"
    },
    options: {
      vegan: false,
      nutFree: true,
      glutenFree: false,
      vegetarian: true
    }
  },
  {
    tier: "standard",
    mealKey: "dinner",
    label: { en: "Standard dinner", fr: "Souper standard" },
    typical: {
      en: "Pasta, grilled chicken, vegetables",
      fr: "Pâtes, poulet grillé, légumes"
    },
    options: {
      vegan: false,
      nutFree: true,
      glutenFree: false,
      vegetarian: true
    }
  },
  {
    tier: "premium",
    mealKey: "breakfast",
    label: { en: "Premium breakfast", fr: "Déjeuner haut de gamme" },
    typical: {
      en: "Hot breakfast buffet, fresh juice",
      fr: "Buffet chaud, jus de fruits frais"
    },
    options: {
      vegan: true,
      nutFree: true,
      glutenFree: false,
      vegetarian: true
    }
  },
  {
    tier: "premium",
    mealKey: "lunch",
    label: { en: "Premium lunch", fr: "Dîner haut de gamme" },
    typical: {
      en: "Grain bowls, wraps, smoothies",
      fr: "Bols de céréales, wraps, smoothies"
    },
    options: {
      vegan: true,
      nutFree: true,
      glutenFree: true,
      vegetarian: true
    }
  },
  {
    tier: "premium",
    mealKey: "dinner",
    label: { en: "Premium dinner", fr: "Souper haut de gamme" },
    typical: {
      en: "Steak, seafood, gourmet sides",
      fr: "Steak, fruits de mer, accompagnements gastronomiques"
    },
    options: {
      vegan: false,
      nutFree: false,
      glutenFree: true,
      vegetarian: false
    }
  }
];

export const cateringCopy = {
  en: {
    title: "Catering services",
    subtitle:
      "From breakfast meetings to evening events, mix and match packages that fit your team and guests.",
    dietaryTitle: "Dietary options on demand",
    legend: {
      vegan: "Vegan",
      nutFree: "Nut free",
      glutenFree: "Gluten free",
      vegetarian: "Vegetarian"
    },
    availabilityNote:
      "Availability can vary by site. Please inquire on Sunday evening for the upcoming week.",
    priceNote: "For detailed pricing, ask Bob or request a quote below."
  },
  fr: {
    title: "Service de traiteur",
    subtitle:
      "Des réunions du matin aux événements du soir, combinez les options qui conviennent à votre équipe et à vos invités.",
    dietaryTitle: "Options diététiques sur demande",
    legend: {
      vegan: "Végétalien",
      nutFree: "Sans noix",
      glutenFree: "Sans gluten",
      vegetarian: "Végétarien"
    },
    availabilityNote:
      "La disponibilité peut varier selon les sites. Renseignez vous le dimanche soir pour la semaine à venir.",
    priceNote:
      "Pour les prix détaillés, demandez à Bob ou faites une demande de soumission ci dessous."
  }
} as const;

export type CateringCopy = (typeof cateringCopy)[Language];
