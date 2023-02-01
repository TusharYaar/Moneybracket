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
};

const SETTING: Props = {
  language: getFromStorageOrDefault("settings/language", "en", true),
  currency: CURRENCIES[getFromStorageOrDefault("settings/currency", "INR", true)],
  theme: getFromStorageOrDefault("settings/theme", "defaultLight", true),
  font: getFromStorageOrDefault("settings/font", "montserrat", true),
  appLock: getFromStorageOrDefault("settings/appLock", "DISABLE", true),
  dateFormat: getFromStorageOrDefault("settings/dateFormat", "dd MMM, yy", true),
  updateFont: () => {},
  updateTheme: () => {},
};

const SettingContext = createContext<Props>(SETTING);

export const useSettings = () => useContext(SettingContext);

const SettingsProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [settings, setSettings] = useState(SETTING);

  const updateSettings = (key: string) => {};

  const updateFont = (font: string) => {
    setSettings((prev) => ({ ...prev, font }));
    setStorage("settings/font", font);
  };
  const updateTheme = (theme: string) => {
    setSettings((prev) => ({ ...prev, theme }));
    setStorage("settings/theme", theme);
  };

  return <SettingContext.Provider value={{ ...settings, updateFont, updateTheme }}>{children}</SettingContext.Provider>;
};

export default SettingsProvider;
