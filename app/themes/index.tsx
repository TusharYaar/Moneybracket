import React, { useContext, createContext, useState, useMemo, useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";

import Ionicons from "@expo/vector-icons/Ionicons";
import { CustomTheme } from "../types";
import ALL_THEMES from "./themes";
import { useSettings } from "../providers/SettingsProvider";
import { ALL_FONTS, DEFAULT_THEMES } from "../data";
import { StatusBar } from "expo-status-bar";
import Purchases from "react-native-purchases";

type Props = {
  current?: string;
  changeTheme: (theme: string) => void;
  theme: CustomTheme;
  unlockedThemes: string[];
  checkThemeSubscription: () => Promise<boolean>;
};

const ThemeContext = createContext<Props>({
  current: "DEFAULT",
  changeTheme: () => {},
  unlockedThemes: DEFAULT_THEMES,
  theme: ALL_THEMES[0],
  checkThemeSubscription: () => Promise.resolve(true),
});

export const useCustomTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { theme, font, updateTheme } = useSettings();
  const [unlockedThemes, setUnlockThemes] = useState(DEFAULT_THEMES);
  const themeObject = useMemo(() => {
    let obj = ALL_THEMES.find((t) => t.id === theme);
    obj.fonts = ALL_FONTS.find((f) => f.id === font).font;
    return obj;
  }, [theme, font]);

  const checkSubscription = useCallback(async () => {
    const info = await Purchases.getCustomerInfo();
    if (Object.keys(info.entitlements.active).includes("all_themes")) {
      setUnlockThemes(ALL_THEMES.map((theme) => theme.id));
      return true;
    } else {
      setUnlockThemes(DEFAULT_THEMES);
      return false;
    }
  }, []);

  const handleThemeChange = useCallback(
    async (theme: string) => {
      const has = await checkSubscription();
      if (!DEFAULT_THEMES.includes(theme) && !has) {
        updateTheme(ALL_THEMES[0].id);
        console.log("Theme Not unlocked");
        return;
      }
      updateTheme(theme);
    },
    [checkSubscription]
  );

  useEffect(() => {
    const check = async () => {
      if (DEFAULT_THEMES.includes(theme)) return;
      const has = await checkSubscription();
      console.log(has);
      if (has) return;
      else updateTheme(DEFAULT_THEMES[0]);
      console.log("set to to default");
    };
    check();
  }, [checkSubscription, theme]);

  return (
    <ThemeContext.Provider
      value={{
        changeTheme: handleThemeChange,
        theme: themeObject,
        unlockedThemes,
        checkThemeSubscription: checkSubscription,
      }}
    >
      <PaperProvider
        theme={themeObject}
        settings={{
          icon: (props) => <Ionicons size={props.size} name={props.name as any} color={props.color} />,
        }}
      >
        <NavigationContainer theme={themeObject}>
          <StatusBar />
          {children}
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
