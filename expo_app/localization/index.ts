import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getFromStorageOrDefault } from "../utils/storage";

import en from "./en.json";

const resources = {
  en: {
    translation: en,
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
    const lang = getFromStorageOrDefault("settings/language", "en");
    lang.toLowerCase();
    i18n.changeLanguage("en");
  });
export default i18n;
