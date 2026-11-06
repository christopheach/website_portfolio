import type { Dictionary, Locale } from "@/types/content";
import { en } from "./en";

/**
 * To add a language: copy /content/en to /content/fr, translate the strings,
 * add "fr" to the Locale type and register it below.
 */
const dictionaries: Record<Locale, Dictionary> = { en };

export function getDictionary(locale: Locale = "en"): Dictionary {
  return dictionaries[locale];
}
