import React, {useContext, createContext, useState, useMemo} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {Provider as PaperProvider} from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";
import {CustomTheme} from "../types";
import AVALIBLE_THEMES from "./themes";
import {useSettings} from "../providers/SettingsProvider";
import AVALIBLE_FONTS from "./fonts";

type Props = {
  current?: string;
  changeTheme: (theme: string) => void;
  changeFont: (font: keyof typeof AVALIBLE_FONTS) => void;
  theme: CustomTheme;
};

const ThemeContext = createContext<Props>({
  current: "DEFAULT",
  changeTheme: () => {},
  changeFont: () => {},
  theme: AVALIBLE_THEMES.defaultLight,
});

export const useCustomTheme = () => useContext(ThemeContext);

const ThemeProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const SETTINGS = useSettings();
  const [theme, setTheme] = useState(AVALIBLE_THEMES[SETTINGS.theme]);
  const [font, setFont] = useState(AVALIBLE_FONTS["montserrat"]);

  const themeObject = useMemo(() => {
    theme.fonts = font.fontConfig;
    return theme;
  }, [theme, font]);

  const handleThemeChange = () => {};

  const handleFontChange = (font: keyof typeof AVALIBLE_FONTS) => {
    setFont(AVALIBLE_FONTS[font]);
    SETTINGS.updateFont(font);
  };

  return (
    <ThemeContext.Provider
      value={{
        changeTheme: handleThemeChange,
        changeFont: handleFontChange,
        theme,
      }}
    >
      <PaperProvider
        theme={themeObject}
        settings={{
          icon: props => <Ionicons {...props} />,
        }}
      >
        <NavigationContainer theme={themeObject}>
          {children}
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
