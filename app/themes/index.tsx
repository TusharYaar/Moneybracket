import React, {useContext, createContext, useState, useMemo} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {Provider as PaperProvider} from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";
import {CustomTheme, FontObject} from "../types";
import AVALIBLE_THEMES from "./themes";
import {useSettings} from "../providers/SettingsProvider";
import AVALIBLE_FONTS from "./fonts";

type Props = {
  current?: string;
  changeTheme: (theme: string) => void;
  changeFont: (font: string) => void;
  theme: CustomTheme;
};

const ThemeContext = createContext<Props>({
  current: "DEFAULT",
  changeTheme: () => {},
  changeFont: () => {},
  theme: AVALIBLE_THEMES[0],
});

export const useCustomTheme = () => useContext(ThemeContext);

const ThemeProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const SETTINGS = useSettings();
  const [theme, setTheme] = useState(
    AVALIBLE_THEMES.find(theme => theme.id === SETTINGS.theme) ||
      AVALIBLE_THEMES[0],
  );
  const [font, setFont] = useState(
    AVALIBLE_FONTS.find(font => font.id === SETTINGS.font) as FontObject,
  );
  const themeObject = useMemo(() => {
    theme.fonts = font ? font.fontConfig : AVALIBLE_FONTS[0].fontConfig;
    return theme;
  }, [theme, font]);

  const handleThemeChange = (theme: string) => {
    setTheme(AVALIBLE_THEMES.find(_t => _t.id === theme) || AVALIBLE_THEMES[0]);
    SETTINGS.updateTheme(theme);
  };

  const handleFontChange = (font: string) => {
    setFont(AVALIBLE_FONTS.find(_f => _f.id === font) || AVALIBLE_FONTS[0]);
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
