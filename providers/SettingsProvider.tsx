import { useContext, createContext, useState, useCallback, useEffect } from "react";
import {  CURRENCIES, SETTING_KEYS } from "../data";
import { useTheme } from "./ThemeProvider";
import { Currency } from "../types";
import { getFromStorageOrDefault, setStorage } from "../utils/storage";
import { useTranslation } from "react-i18next";
// import Purchases from "react-native-purchases";

type Props = {
  language: string;
  currency: Currency;
  appLock: "BIOMETRIC" | "PIN" | "DISABLE";
  theme: string;
  font: string;
  icon: string;
  dateFormat: string;
  isFirstLaunch: string;

  updateSettings: (key: string, value: string) => void;
  // roundness: number;
  // unlockedThemes: string[];
  // unlockedFonts: string[];
  // updateCurrency: (curr: string) => void;
  // updateLanguage: (lang: string) => void;
  // updateDateFormat: (format: string) => void;
  // updateLock: (enable: boolean) => void;
  // refreshUnlockedItems: () => void;
  // updateRoundness: (value: number) => void;
  // offlineFonts: string[];
};

const SETTINGS: Props = {
  language: getFromStorageOrDefault(SETTING_KEYS.language, "en", true),
  currency: CURRENCIES[getFromStorageOrDefault(SETTING_KEYS.currency, "INR", true)],
  theme: getFromStorageOrDefault(SETTING_KEYS.theme, "default", true),
  icon: getFromStorageOrDefault(SETTING_KEYS.icon, "default", true),
  // roundness: parseInt(getFromStorageOrDefault(SETTING_KEYS.roundness, "0", true)),
  font: getFromStorageOrDefault(SETTING_KEYS.font, "lexend", true),
  appLock: getFromStorageOrDefault(SETTING_KEYS.appLock, "DISABLE", true) as Props["appLock"],
  dateFormat: getFromStorageOrDefault(SETTING_KEYS.dateFormat, "dd MMM, yyyy", true),
  // unlockedThemes: DEFAULT_THEMES,
  // unlockedFonts: LOCAL_FONTS,
  // updateCurrency: () => {},
  // updateLanguage: () => {},
  // updateDateFormat: () => {},
  // updateLock: () => {},
  // refreshUnlockedItems: () => {},
  // updateRoundness: () => {},
  isFirstLaunch: getFromStorageOrDefault(SETTING_KEYS.isFirstLaunch, "true"),
  updateSettings: () => {},
};

// const checkSubscription = async () => {
//   const info = await Purchases.getCustomerInfo();
//   let subs = { font: false, theme: false };
//   if (Object.keys(info.entitlements.active).includes("all_themes")) subs.theme = true;
//   if (Object.keys(info.entitlements.active).includes("all_fonts")) subs.font = true;
//   return subs;
// };

const SettingContext = createContext<Props>(SETTINGS);
export const useSettings = () => useContext(SettingContext);

const SettingsProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { changeFont, changeTheme } = useTheme();
  const {i18n} = useTranslation();
  const [settings, setSettings] = useState(SETTINGS);
  // const [offlineFonts, setOfflineFonts] = useState(LOCAL_FONTS);

  // const updateLanguage = useCallback((lang: string) => {
  //   setSettings((prev) => ({ ...prev, language: lang }));
  //   setStorage(SETTING_KEYS.language, lang);
  // }, []);

  const updateSettings = useCallback(
    (key: string, value: string) => {
      setStorage(SETTING_KEYS[key], value);
      if (key === "currency") {
        setSettings((prev) => ({ ...prev, [key]: CURRENCIES[value] }));
      } else {
        if (key === "theme") {
          changeTheme(value);
        } else if (key === "font") {
          changeFont(value);
        } else if (key === "language") {
          i18n.changeLanguage(value);
        }
        setSettings((prev) => ({ ...prev, [key]: value }));
      }
    },
    [setSettings]
  );

  useEffect(() => {
    changeTheme(SETTINGS.theme);
    changeFont(SETTINGS.font);
    i18n.changeLanguage(SETTINGS.language);

  },[]);

  // const updateFont = useCallback(async (font: string, notify = true) => {}, []);
  // const updateRoundness = useCallback(async (value: number, notify = true) => {
  //   try {
  //     let hasPerm = (await checkSubscription()).theme;
  //     if (!hasPerm) {
  //       setSettings((prev) => ({ ...prev, roundness: -1 }));
  //       changeRoundness(-1);
  //       throw "ROUNDNESS_NOT_UNLOCKED";
  //     }
  //     setStorage(SETTING_KEYS.roundness, value.toString());
  //     setSettings((prev) => ({ ...prev, roundness: value }));
  //     changeRoundness(value);
  //     if (notify) enqueueSnackbar("ROUNDNESS_UPDATE_SUCCESS");
  //   } catch (e) {
  //     if (notify) enqueueSnackbar(e);
  //   }
  // }, []);

  // const updateCurrency = useCallback((curr: string) => {
  //   setSettings((prev) => ({ ...prev, currency: CURRENCIES[curr] }));
  //   setStorage(SETTING_KEYS.currency, curr);
  // enqueueSnackbar("CURRENCY_UPDATE_SUCCESS");
  // }, []);

  // const updateDateFormat = useCallback((format: string) => {
  //   setSettings((prev) => ({ ...prev, dateFormat: format }));
  //   setStorage(SETTING_KEYS.dateFormat, format);
  // }, []);

  // const updateLock = useCallback((enable: boolean) => {
  //   setStorage(SETTING_KEYS.appLock, enable ? "ENABLE" : "DISABLE");
  //   setSettings((prev) => ({ ...prev, appLock: enable ? "ENABLE" : "DISABLE" }));
  // }, []);

  // const refreshUnlockedItems = useCallback(async () => {
  //   try {
  // let hasPerm = await checkSubscription();
  // setSettings((prev) => ({
  //   ...prev,
  //   unlockedFonts: hasPerm.font ? ALL_FONTS.map((font) => font.id) : LOCAL_FONTS,
  //   unlockedThemes: hasPerm.theme ? ALL_THEMES.map((theme) => theme.id) : DEFAULT_THEMES,
  // }));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  // const getOfflineFonts = useCallback(async () => {
  //   const files = await readDirectoryAsync(FONTS_DIRECTORY);
  //   const fonts = Array.from(LOCAL_FONTS);
  //   for (const font of ALL_FONTS) {
  //     if (!LOCAL_FONTS.includes(font.id)) {
  //       if (font?.files && font.files.length && font.files.every((file) => files.includes(file.name)))
  //         fonts.push(font.id);
  //     }
  //   }
  //   setOfflineFonts(fonts);
  // }, []);

  // useEffect(() => {
  //   getOfflineFonts();
  // }, []);

  return (
    <SettingContext.Provider
      value={{
        ...settings,
        updateSettings,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingsProvider;
