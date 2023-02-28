import { useContext, createContext, useState, useCallback, useEffect } from "react";
import { ALL_FONTS, CURRENCIES, DEFAULT_THEMES, LOCAL_FONTS, SETTING_KEYS } from "../data";
import { useCustomTheme } from "../themes";
import { Currency } from "../types";
import { getFromStorageOrDefault, setStorage } from "../utils/storage";
import Purchases from "react-native-purchases";
import ALL_THEMES from "../themes/themes";

type Props = {
  language: string;
  currency: Currency;
  appLock: "ENABLE" | "DISABLE";
  theme: string;
  font: string;
  dateFormat: string;
  unlockedThemes: string[];
  unlockedFonts: string[];
  updateFont: (font: string) => void;
  updateTheme: (theme: string) => void;
  updateCurrency: (curr: string) => void;
  updateLanguage: (lang: string) => void;
  updateDateFormat: (format: string) => void;
  updateLock: (enable: boolean) => void;
  refreshUnlockedItems: () => void;
};

const SETTING: Props = {
  language: getFromStorageOrDefault(SETTING_KEYS.language, "en", true),
  currency: CURRENCIES[getFromStorageOrDefault(SETTING_KEYS.currency, "INR", true)],
  theme: getFromStorageOrDefault(SETTING_KEYS.theme, "defaultLight", true),
  font: getFromStorageOrDefault(SETTING_KEYS.font, "sansserif", true),
  appLock: getFromStorageOrDefault(SETTING_KEYS.appLock, "DISABLE", true) as Props["appLock"],
  dateFormat: getFromStorageOrDefault(SETTING_KEYS.dateFormat, "dd MMM, yyyy", true),
  unlockedThemes: DEFAULT_THEMES,
  unlockedFonts: LOCAL_FONTS,
  updateFont: () => {},
  updateTheme: () => {},
  updateCurrency: () => {},
  updateLanguage: () => {},
  updateDateFormat: () => {},
  updateLock: () => {},
  refreshUnlockedItems: () => {},
};

const checkSubscription = async () => {
  const info = await Purchases.getCustomerInfo();
  let subs = { font: false, theme: false };
  if (Object.keys(info.entitlements.active).includes("all_themes")) subs.theme = true;
  if (Object.keys(info.entitlements.active).includes("all_fonts")) subs.font = true;
  return subs;
};

const SettingContext = createContext<Props>(SETTING);
export const useSettings = () => useContext(SettingContext);

const SettingsProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { changeTheme, changeCurrentFont, loadFont } = useCustomTheme();

  const [settings, setSettings] = useState(SETTING);

  const updateLanguage = (lang: string) => {
    setSettings((prev) => ({ ...prev, language: lang }));
    setStorage(SETTING_KEYS.language, lang);
  };

  const updateFont = async (font: string) => {
    try {
      let hasPerm = true;
      if (!LOCAL_FONTS.includes(font)) hasPerm = (await checkSubscription()).font;
      if (!hasPerm) {
        // TODO: Alert User font cant be set
        throw "NotUNLOCKED";
      } else {
        await loadFont(font);
      }
      changeCurrentFont(font);
      setSettings((prev) => ({ ...prev, font }));
      setStorage(SETTING_KEYS.font, font);
    } catch (e) {
      // font = LOCAL_FONTS[0];
      // console.log(e);
      // changeCurrentFont(font);
      // setSettings((prev) => ({ ...prev, font }));
      // setStorage(SETTING_KEYS.font, font);
    }
  };
  const updateTheme = useCallback(async (theme: string) => {
    let hasPerm = true;
    if (!DEFAULT_THEMES.includes(theme)) hasPerm = (await checkSubscription()).theme;
    if (!hasPerm) {
      // TODO: Alert User font cant be set
      theme = DEFAULT_THEMES[0];
    }
    setStorage(SETTING_KEYS.theme, theme);
    setSettings((prev) => ({ ...prev, theme }));
    changeTheme(theme);
  }, []);
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

  const refreshUnlockedItems = useCallback(async () => {
    try {
      let hasPerm = await checkSubscription();
      setSettings((prev) => ({
        ...prev,
        unlockedFonts: hasPerm.font ? ALL_FONTS.map((font) => font.id) : LOCAL_FONTS,
        unlockedThemes: hasPerm.theme ? ALL_THEMES.map((theme) => theme.id) : DEFAULT_THEMES,
      }));
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    refreshUnlockedItems();
    updateTheme(SETTING.theme);
    updateFont(SETTING.font);
  }, [updateTheme]);

  return (
    <SettingContext.Provider
      value={{
        ...settings,
        updateFont,
        updateTheme,
        updateCurrency,
        updateLanguage,
        updateDateFormat,
        updateLock,
        refreshUnlockedItems,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingsProvider;
