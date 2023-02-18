import { useContext, createContext, useState, useEffect, useCallback } from "react";
import { CURRENCIES, FONTS_DIRECTORY, SETTING_KEYS } from "../data";
import { Currency } from "../types";
import { getFromStorageOrDefault, setStorage } from "../utils/storage";

import * as FileSystem from "expo-file-system";

type Props = {
  language: string;
  currency: Currency;
  appLock: "ENABLE" | "DISABLE";
  theme: string;
  font: string;
  dateFormat: string;
  localFonts: string[];
  updateFont: (font: string) => void;
  updateTheme: (theme: string) => void;
  updateCurrency: (curr: string) => void;
  updateLanguage: (lang: string) => void;
  updateDateFormat: (format: string) => void;
  updateLock: (enable: boolean) => void;
};

const SETTING: Props = {
  localFonts: ["sanserif", "sarif", "monospace"],
  language: getFromStorageOrDefault(SETTING_KEYS.language, "en", true),
  currency: CURRENCIES[getFromStorageOrDefault(SETTING_KEYS.currency, "INR", true)],
  theme: getFromStorageOrDefault(SETTING_KEYS.theme, "defaultLight", true),
  font: getFromStorageOrDefault(SETTING_KEYS.font, "sanserif", true),
  appLock: getFromStorageOrDefault(SETTING_KEYS.appLock, "DISABLE", true) as Props["appLock"],
  dateFormat: getFromStorageOrDefault(SETTING_KEYS.dateFormat, "dd MMM, yyyy", true),
  updateFont: () => {},
  updateTheme: () => {},
  updateCurrency: () => {},
  updateLanguage: () => {},
  updateDateFormat: () => {},
  updateLock: () => {},
};

const SettingContext = createContext<Props>(SETTING);
export const useSettings = () => useContext(SettingContext);

const SettingsProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [settings, setSettings] = useState(SETTING);
  const [localFonts, setLocalFonts] = useState([]);

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

  const updateLock = (enable: boolean) => {
    setStorage(SETTING_KEYS.appLock, enable ? "ENABLE" : "DISABLE");
    setSettings((prev) => ({ ...prev, appLock: enable ? "ENABLE" : "DISABLE" }));
  };

  // Font Manager
  const getLocalFonts = useCallback(async () => {
    const { exists } = await FileSystem.getInfoAsync(FONTS_DIRECTORY);
    if (!exists) {
      await FileSystem.makeDirectoryAsync(FONTS_DIRECTORY, { intermediates: true });
    }
    const files = await FileSystem.readDirectoryAsync(FONTS_DIRECTORY);
    setLocalFonts(files);
  }, []);

  const downloadNewFont = useCallback((font: string) => {
    console.log(font);
  }, []);

  useEffect(() => {
    getLocalFonts();
  }, [getLocalFonts]);

  return (
    <SettingContext.Provider
      value={{
        ...settings,
        updateFont,
        updateTheme,
        updateCurrency,
        updateLanguage,
        updateDateFormat,
        localFonts,
        updateLock,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingsProvider;
