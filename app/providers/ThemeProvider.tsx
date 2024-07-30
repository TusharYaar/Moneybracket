import React, { useContext, createContext, useState, useMemo, useCallback, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";

import Ionicons from "@expo/vector-icons/Ionicons";
import { ALL_FONTS, DEFAULT_THEMES, FONTS_DIRECTORY, LOCAL_FONTS, ALL_THEMES, SETTING_KEYS } from "../data";
import { StatusBar } from "expo-status-bar";
import { isLoaded, loadAsync } from "expo-font";
import { downloadAsync, getInfoAsync, makeDirectoryAsync, readDirectoryAsync } from "expo-file-system";
// import { useTranslation } from "react-i18next";
import { getFromStorageOrDefault, setStorage } from "../utils/storage";
// import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import type { CustomTheme } from "../types";
import { Platform } from "react-native";

type Props = {
  font: string;
  theme: CustomTheme;
  changeTheme: (theme: string) => void;
  changeRoundness: (value: number) => void;
  changeFont: (font: string) => void;
  loadFont: (id: string) => Promise<void>;
  // enqueueSnackbar: (message: string) => void;
};

const defaultTheme = Platform.OS === "android" && Platform.Version >= 31 ? "deviceLight" : "defaultLight";

const ThemeContext = createContext<Props>({
  font: getFromStorageOrDefault(SETTING_KEYS.font, "sansserif", true),
  theme: ALL_THEMES.find((theme) => theme.id === getFromStorageOrDefault(SETTING_KEYS.theme, defaultTheme, true)),
  changeTheme: () => {},
  changeRoundness: () => {},
  changeFont: () => {},
  loadFont: async (id: string) => {},
  // enqueueSnackbar: () => {},
});

export const useCustomTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  // const { t } = useTranslation("", { keyPrefix: "messages" });
  // const { theme: deviceTheme } = useMaterial3Theme();
  const [_theme, setTheme] = useState<(typeof ALL_THEMES)[number]["id"]>(DEFAULT_THEMES[0]);
  const [font, setFont] = useState(LOCAL_FONTS[0]);
  const [roundness, setRoundness] = useState(parseInt(getFromStorageOrDefault(SETTING_KEYS.roundness, "-1", true)));
  const [snackbars, setSnackbars] = useState<{ message: string; id: number }[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const themeObject = useMemo(() => {
    let obj = ALL_THEMES.find((t) => t.id === _theme);
    obj.fonts = ALL_FONTS.find((f) => f.id === font).font;

    if (_theme === "deviceLight") obj = { ...obj, colors: { ...obj.colors } };
    // else if (_theme === "deviceDark") obj = { ...obj, colors: { ...obj.colors} };

    if (roundness >= 0) obj.roundness = roundness;

    return obj as CustomTheme;
  }, [_theme, font, roundness]);

  const changeTheme = useCallback((theme: (typeof ALL_THEMES)[number]["id"]) => {
    try {
      let hasPerm = true;
      if (!hasPerm) {
        console.log("No Permission");
      }
      setStorage(SETTING_KEYS.theme, theme);
      setTheme(theme);
    } catch (e) {
      console.log("caught an error");
    }
    setTheme(theme);
  }, []);

  const changeFont = useCallback(async (font: string) => {
    try {
      await loadFont(font);
      setFont(font);
      setStorage(SETTING_KEYS.font, font);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const changeRoundness = useCallback((value: number) => {
    setRoundness(value);
  }, []);

  const getOfflineFonts = useCallback(async () => {
    const { exists } = await getInfoAsync(FONTS_DIRECTORY);
    if (!exists) await makeDirectoryAsync(FONTS_DIRECTORY, { intermediates: true });

    const files = await readDirectoryAsync(FONTS_DIRECTORY);
    // console.log({files});

    const fonts = Array.from(LOCAL_FONTS);
    for (const font of ALL_FONTS) {
      if (!LOCAL_FONTS.includes(font.id)) {
        if (font?.files && font.files.length && font.files.every((file) => files.includes(file.name)))
          fonts.push(font.id);
      }
    }
  }, []);

  useEffect(() => {
    getOfflineFonts();
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
        let location = await getInfoAsync(`${FONTS_DIRECTORY}/${file.name}`);
        if (location.exists && !location.isDirectory && !isLoaded(file.name)) await loadAsync(file.name, location.uri);
        else {
          await downloadFont(id);
          // enqueueSnackbar("DOWNLOADING_FONT");
          location = await getInfoAsync(`${FONTS_DIRECTORY}/${file.name}`);
          await loadAsync(file.name, location.uri);
        }
      }
    } catch (e) {
      changeFont(LOCAL_FONTS[0]);
      console.log("Uncountered an error, Setting font to san serif");
      console.log(e);
      throw e;
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        changeTheme,
        font,
        changeFont,
        changeRoundness,
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
        <StatusBar style={themeObject.dark ? "light" : "dark"} />
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
