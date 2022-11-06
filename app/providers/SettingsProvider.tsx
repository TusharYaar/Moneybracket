import {useContext, createContext, useState, useEffect} from "react";
import {getFromStorageOrDefault, setStorage} from "../utils/storage";

import AVALIBLE_THEMES from "../themes/themes";
import AVALIBLE_FONTS from "../themes/fonts";
type Props = {
  language: string;
  currency: string;
  appLock: string;
  theme: keyof typeof AVALIBLE_THEMES;
  font: keyof typeof AVALIBLE_FONTS;
  updateFont: (font: keyof typeof AVALIBLE_FONTS) => void;
};

const SETTING: Props = {
  language: getFromStorageOrDefault("settings/language", "EN", true),
  currency: getFromStorageOrDefault("settings/currency", "INR", true),
  theme: getFromStorageOrDefault(
    "settings/theme",
    "defaultLight",
    true,
  ) as keyof typeof AVALIBLE_THEMES,
  font: getFromStorageOrDefault(
    "settings/font",
    "montserrat",
    true,
  ) as keyof typeof AVALIBLE_FONTS,
  appLock: getFromStorageOrDefault("settings/appLock", "DISABLE", true),
  updateFont: () => {},
};

const SettingContext = createContext<Props>(SETTING);

export const useSettings = () => useContext(SettingContext);

const SettingsProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [settings, setSettings] = useState(SETTING);
  const updateSettings = (key: string) => {};
  const updateFont = (font: keyof typeof AVALIBLE_FONTS) => {
    setSettings(prev => ({...prev, font}));
    setStorage("settings/font", font);
  };

  return (
    <SettingContext.Provider value={{...settings, updateFont}}>
      {children}
    </SettingContext.Provider>
  );
};

export default SettingsProvider;
