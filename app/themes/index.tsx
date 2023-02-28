import React, { useContext, createContext, useState, useMemo, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";

import Ionicons from "@expo/vector-icons/Ionicons";
import { CustomTheme } from "../types";
import ALL_THEMES from "./themes";
import { ALL_FONTS, DEFAULT_THEMES, FONTS_DIRECTORY, LOCAL_FONTS } from "../data";
import { StatusBar } from "expo-status-bar";
import { isLoaded, loadAsync } from "expo-font";
import { downloadAsync, getInfoAsync } from "expo-file-system";

type Props = {
  changeTheme: (theme: string) => void;
  currentFont: string;
  changeCurrentFont: (font: string) => void;
  theme: CustomTheme;
  loadFont: (id: string) => Promise<void>;
};

const ThemeContext = createContext<Props>({
  currentFont: LOCAL_FONTS[0],
  changeTheme: () => {},
  changeCurrentFont: () => {},
  theme: ALL_THEMES[0],
  loadFont: async (id: string) => {},
});

export const useCustomTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [theme, setTheme] = useState(DEFAULT_THEMES[0]);
  const [currentFont, setCurrentFont] = useState(LOCAL_FONTS[0]);
  const themeObject = useMemo(() => {
    let obj = ALL_THEMES.find((t) => t.id === theme);
    obj.fonts = ALL_FONTS.find((f) => f.id === currentFont).font;
    return obj;
  }, [theme, currentFont]);

  const changeTheme = useCallback((theme: string) => {
    setTheme(theme);
  }, []);

  const changeCurrentFont = useCallback((font: string) => {
    setCurrentFont(font);
  }, []);

  const downloadFont = useCallback(async (id: string) => {
    try {
      const font = ALL_FONTS.find((f) => f.id === id);
      if (font) for (const file of font.files) await downloadAsync(file.link, `${FONTS_DIRECTORY}/${file.name}`);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }, []);

  const loadFont = useCallback(async (id: string) => {
    // If Default Font
    if (LOCAL_FONTS.includes(id)) return;

    try {
      const font = ALL_FONTS.find((f) => f.id === id);
      // If Font is Already Loaded
      if (font.files.every((file) => isLoaded(file.name))) return;

      for (const file of font.files) {
        const location = await getInfoAsync(`${FONTS_DIRECTORY}/${file.name}`);
        if (location.exists && !location.isDirectory && !isLoaded(file.name)) await loadAsync(file.name, location.uri);
        else {
          console.log("downloading");
          await downloadFont(id);
        }
      }
    } catch (e) {
      changeCurrentFont(LOCAL_FONTS[0]);
      console.log("Uncountered an error, Setting font to san serif");
      console.log(e);
      throw e;
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        changeTheme,
        currentFont,
        changeCurrentFont,
        theme: themeObject,
        loadFont,
      }}
    >
      <PaperProvider
        theme={themeObject}
        settings={{
          icon: (props) => <Ionicons size={props.size} name={props.name as any} color={props.color} />,
        }}
      >
        <NavigationContainer theme={themeObject}>
          <StatusBar style={themeObject.dark ? "light" : "dark"} />
          {children}
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
