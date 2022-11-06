import { useContext, createContext, useState, useEffect } from "react";
import { getFromStorageOrDefault } from "../utils/storage";

import AVALIBLE_THEMES from "../themes/themes";
import AVALIBLE_FONTS from "../themes/fonts";
type Props = {
    language: string;
    currency: string;
    appLock: string;
    theme: keyof typeof AVALIBLE_THEMES;
    font: keyof typeof AVALIBLE_FONTS;
};


const SETTING: Props = {
    language: getFromStorageOrDefault("settings/language", "EN", true),
    currency: getFromStorageOrDefault("settings/currency", "INR", true),
    theme: getFromStorageOrDefault("settings/theme", "defaultLight", true) as keyof typeof AVALIBLE_THEMES,
    font: getFromStorageOrDefault("settings/font", "montserrat", true) as keyof typeof AVALIBLE_FONTS,
    appLock: getFromStorageOrDefault("settings/appLock", "DISABLE", true),
}


const SettingContext = createContext<Props>(SETTING);

export const useSettings = () => useContext(SettingContext);

const SettingsProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const [setting, setSetting] = useState(SETTING);
    const updateSettings = () => {

    }

    return (
        <SettingContext.Provider value={setting}>
            {children}
        </SettingContext.Provider>
    );
};

export default SettingsProvider;
