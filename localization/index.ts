import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getFromStorageOrDefault } from "../utils/storage";

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
    const lang = getFromStorageOrDefault(SETTING_KEYS.language, "en");
    i18n.changeLanguage(lang);
  });
export default i18n;
