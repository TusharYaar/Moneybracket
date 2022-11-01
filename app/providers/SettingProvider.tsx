import { useContext, createContext, useState, useEffect } from "react";

type Props = {
    language: string;
    currency: string;
    appLock: string;
    theme: string;
};

const SETTING = {
    language: "en",
    currency: "inr",
    theme: "default",
    appLock: "disable",
}


const SettingContext = createContext<Props>(SETTING);

export const useSetting = () => useContext(SettingContext);

const SettingProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const [setting, setSetting] = useState(SETTING);

    return (
        <SettingContext.Provider value={setting}>{children}</SettingContext.Provider>
    );
};

export default SettingProvider;
