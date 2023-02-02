import { useContext, createContext, useState } from "react";
import { CURRENCIES } from "../data";
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
  language: getFromStorageOrDefault("settings/language", "en", true),
  currency: CURRENCIES[getFromStorageOrDefault("settings/currency", "INR", true)],
  theme: getFromStorageOrDefault("settings/theme", "defaultLight", true),
  font: getFromStorageOrDefault("settings/font", "montserrat", true),
  appLock: getFromStorageOrDefault("settings/appLock", "DISABLE", true),
  dateFormat: getFromStorageOrDefault("settings/dateFormat", "dd MMM, yyyy", true),
  updateFont: () => {},
  updateTheme: () => {},
  updateCurrency: () => {},
  updateLanguage: () => {},
  updateDateFormat: () => {},
};

const SettingContext = createContext<Props>(SETTING);

export const useSettings = () => useContext(SettingContext);

const SettingsProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [settings, setSettings] = useState({ ...SETTING, dateFormat: "dd MMM, yyyy" });

  const updateSettings = (key: string) => {};

  const updateLanguage = (lang: string) => {
    setSettings((prev) => ({ ...prev, language: lang }));
    setStorage("settings/language", lang);
  };

  const updateFont = (font: string) => {
    setSettings((prev) => ({ ...prev, font }));
    setStorage("settings/font", font);
  };
  const updateTheme = (theme: string) => {
    setSettings((prev) => ({ ...prev, theme }));
    setStorage("settings/theme", theme);
  };
  const updateCurrency = (curr: string) => {
    setSettings((prev) => ({ ...prev, currency: CURRENCIES[curr] }));
    setStorage("settings/currency", curr);
  };

  const updateDateFormat = (format: string) => {
    setSettings((prev) => ({ ...prev, dateFormat: format }));
    setStorage("settings/dateFormat", format);
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
