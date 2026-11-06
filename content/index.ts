import type { Dictionary, Locale } from "@/types/content";
import { en } from "./en";
import { fr } from "./fr";

/**
 * To add a language: copy /content/fr to /content/<locale>, translate the strings,
 * add the locale to the Locale type and register it below.
 */
const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale = "fr"): Dictionary {
  return dictionaries[locale];
}
