import { useContext, createContext, useState } from "react";
import { CURRENCIES, SETTING_KEYS } from "../data";
import { Currency } from "../types";
import { getFromStorageOrDefault, setStorage } from "../utils/storage";

type Props = {
  language: string;
  currency: Currency;
  appLock: string;
  theme: string;
  font: string;
  dateFormat: string;
  updateFont: (font: string) => void;
  updateTheme: (theme: string) => void;
  updateCurrency: (curr: string) => void;
  updateLanguage: (lang: string) => void;
  updateDateFormat: (format: string) => void;
};

const SETTING: Props = {
  language: getFromStorageOrDefault(SETTING_KEYS.language, "en", true),
  currency: CURRENCIES[getFromStorageOrDefault(SETTING_KEYS.currency, "INR", true)],
  theme: getFromStorageOrDefault(SETTING_KEYS.theme, "defaultLight", true),
  font: getFromStorageOrDefault(SETTING_KEYS.font, "sanserif", true),
  appLock: getFromStorageOrDefault(SETTING_KEYS.appLock, "DISABLE", true),
  dateFormat: getFromStorageOrDefault(SETTING_KEYS.dateFormat, "dd MMM, yyyy", true),
  updateFont: () => {},
  updateTheme: () => {},
  updateCurrency: () => {},
  updateLanguage: () => {},
  updateDateFormat: () => {},
};

const SettingContext = createContext<Props>(SETTING);

export const useSettings = () => useContext(SettingContext);

const SettingsProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [settings, setSettings] = useState(SETTING);

  const updateLanguage = (lang: string) => {
    setSettings((prev) => ({ ...prev, language: lang }));
    setStorage(SETTING_KEYS.language, lang);
  };

  const updateFont = (font: string) => {
    setSettings((prev) => ({ ...prev, font }));
    setStorage(SETTING_KEYS.font, font);
  };
  const updateTheme = (theme: string) => {
    setSettings((prev) => ({ ...prev, theme }));
    setStorage(SETTING_KEYS.theme, theme);
  };
  const updateCurrency = (curr: string) => {
    setSettings((prev) => ({ ...prev, currency: CURRENCIES[curr] }));
    setStorage(SETTING_KEYS.currency, curr);
  };

  const updateDateFormat = (format: string) => {
    setSettings((prev) => ({ ...prev, dateFormat: format }));
    setStorage(SETTING_KEYS.dateFormat, format);
  };

  return (
    <SettingContext.Provider
      value={{ ...settings, updateFont, updateTheme, updateCurrency, updateLanguage, updateDateFormat }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingsProvider;
