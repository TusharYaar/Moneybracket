import React, { useContext, createContext, useState, useMemo, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";

import Ionicons from "@expo/vector-icons/Ionicons";
import { CustomTheme } from "../types";
import AVALIBLE_THEMES from "./themes";
import { useSettings } from "../providers/SettingsProvider";
import AVALIBLE_FONTS from "./fonts/index";
import { MD3Typescale } from "react-native-paper/lib/typescript/types";
import { StatusBar } from "expo-status-bar";

type Props = {
  current?: string;
  changeTheme: (theme: string) => void;
  changeFont: (font: string) => void;
  theme: CustomTheme;
  showErrorSnackbar: (message: string) => void;
  showSuccessSnackbar: (message: string) => void;
};

const ThemeContext = createContext<Props>({
  current: "DEFAULT",
  changeTheme: () => {},
  changeFont: () => {},
  theme: AVALIBLE_THEMES[0],
  showErrorSnackbar: (message: string) => {},
  showSuccessSnackbar: (message: string) => {},
});

export const useCustomTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const SETTINGS = useSettings();
  const [theme, setTheme] = useState(
    AVALIBLE_THEMES.find((theme) => theme.id === SETTINGS.theme) || AVALIBLE_THEMES[0]
  );
  const [font, setFont] = useState(AVALIBLE_FONTS.find((f) => f.id === SETTINGS.font)?.name);
  const themeObject = useMemo(() => {
    theme.fonts = AVALIBLE_FONTS.find((f) => f.id === SETTINGS.font)?.font as MD3Typescale;
    return theme;
  }, [theme, font]);

  const [snackbar, setSnackbar] = useState({
    message: "",
    visible: false,
    type: "error",
  });

  const handleThemeChange = (theme: string) => {
    setTheme(AVALIBLE_THEMES.find((_t) => _t.id === theme) || AVALIBLE_THEMES[0]);
    SETTINGS.updateTheme(theme);
  };

  const handleFontChange = (font: string) => {
    setFont(AVALIBLE_FONTS.find((_f) => _f.id === font)?.name || AVALIBLE_FONTS[0].name);
    SETTINGS.updateFont(font);
  };
  const showSuccessSnackbar = useCallback((message: string) => {
    setSnackbar({ message, visible: true, type: "success" });
  }, []);
  const showErrorSnackbar = useCallback((message: string) => {
    setSnackbar({ message, visible: true, type: "error" });
  }, []);

  const dismissSnackbar = useCallback(() => {
    setSnackbar({ message: "", visible: false, type: "error" });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        changeTheme: handleThemeChange,
        changeFont: handleFontChange,
        theme,
        showSuccessSnackbar,
        showErrorSnackbar,
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
          <Snackbar visible={snackbar.visible} onDismiss={dismissSnackbar}>
            {snackbar.message}
          </Snackbar>
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
