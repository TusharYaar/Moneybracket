import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getFromStorageOrDefault } from "../utils/storage";
import { getLocales } from "expo-localization";

import en from "./en.json";
import hi from "./hi.json";
import es from "./es.json";
import { SETTING_KEYS } from "data";

export const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
  es: {
    translation: es,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    compatibilityJSON: "v3",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    // get default language from User
    let defaultLang = getLocales()[0].languageCode ?? "en";
    if (!["en", "es", "hi"].includes(defaultLang)) defaultLang = "en";
    const lang = getFromStorageOrDefault(SETTING_KEYS.language, defaultLang);
    i18n.changeLanguage(lang);
  });
export default i18n;
