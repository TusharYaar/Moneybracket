import React, { useContext, createContext, useState, useMemo, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";

import Ionicons from "@expo/vector-icons/Ionicons";
import { CustomTheme } from "../types";
import { ALL_FONTS, DEFAULT_THEMES, FONTS_DIRECTORY, LOCAL_FONTS, ALL_THEMES } from "../data";
import { StatusBar } from "expo-status-bar";
import { isLoaded, loadAsync } from "expo-font";
import { downloadAsync, getInfoAsync } from "expo-file-system";
import { useTranslation } from "react-i18next";

type Props = {
  changeTheme: (theme: string) => void;
  changeRoundness: (value: number) => void;
  currentFont: string;
  changeCurrentFont: (font: string) => void;
  theme: CustomTheme;
  loadFont: (id: string) => Promise<void>;
  enqueueSnackbar: (message: string) => void;
};

const ThemeContext = createContext<Props>({
  currentFont: LOCAL_FONTS[0],
  changeTheme: () => {},
  changeRoundness: () => {},
  changeCurrentFont: () => {},
  theme: ALL_THEMES[0],
  loadFont: async (id: string) => {},
  enqueueSnackbar: () => {},
});

export const useCustomTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { t } = useTranslation("", { keyPrefix: "messages" });

  const [theme, setTheme] = useState(DEFAULT_THEMES[0]);
  const [currentFont, setCurrentFont] = useState(LOCAL_FONTS[0]);
  const [roundness, setRoundness] = useState(0);
  const [snackbars, setSnackbars] = useState<{ message: string; id: number }[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const themeObject = useMemo(() => {
    let obj = ALL_THEMES.find((t) => t.id === theme);

    obj.fonts = ALL_FONTS.find((f) => f.id === currentFont).font;

    if (roundness === -1) return obj;
    return { ...obj, roundness } as CustomTheme;
  }, [theme, currentFont, roundness]);

  const changeTheme = useCallback((theme: string) => {
    setTheme(theme);
  }, []);

  const changeCurrentFont = useCallback((font: string) => {
    setCurrentFont(font);
  }, []);

  const changeRoundness = useCallback((value: number) => {
    setRoundness(value);
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
  const enqueueSnackbar = useCallback((message: string) => {
    if (message === undefined) return;

    setSnackbars((prev) => {
      const id = Math.random();
      if (prev.length > 0) return [...prev, { message, id }];
      else {
        setSnackbarVisible(true);
        return [{ message, id }];
      }
    });
  }, []);

  const loadFont = useCallback(async (id: string) => {
    // If Default Font
    if (LOCAL_FONTS.includes(id)) return;
    try {
      const font = ALL_FONTS.find((f) => f.id === id);
      // If Font is Already Loaded
      if (font.files.every((file) => isLoaded(file.name))) return;

      for (const file of font.files) {
        let location = await getInfoAsync(`${FONTS_DIRECTORY}/${file.name}`);
        if (location.exists && !location.isDirectory && !isLoaded(file.name)) await loadAsync(file.name, location.uri);
        else {
          await downloadFont(id);
          enqueueSnackbar("DOWNLOADING_FONT");
          location = await getInfoAsync(`${FONTS_DIRECTORY}/${file.name}`);
          await loadAsync(file.name, location.uri);
        }
      }
    } catch (e) {
      changeCurrentFont(LOCAL_FONTS[0]);
      console.log("Uncountered an error, Setting font to san serif");
      console.log(e);
      throw e;
    }
  }, []);

  const closeSnackbar = useCallback((id: number) => {
    setSnackbars((prev) => {
      if (prev.length > 1) {
        setSnackbarVisible(false);
        setTimeout(() => {
          setSnackbarVisible(true);
          setSnackbars(prev.filter((m) => m.id !== id));
        }, 200);
        return prev;
      } else {
        setSnackbarVisible(false);
        setTimeout(() => setSnackbars([]), 100);
        return prev;
      }
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        changeTheme,
        currentFont,
        changeCurrentFont,
        changeRoundness,
        theme: themeObject,
        loadFont,
        enqueueSnackbar,
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
        <Snackbar
          visible={snackbarVisible && snackbars.length > 0}
          onDismiss={() => closeSnackbar(snackbars[0].id)}
          duration={1000}
        >
          {t(snackbars[0]?.message)}
        </Snackbar>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
