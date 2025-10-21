import React, { useContext, createContext, useState, useMemo, useCallback } from "react";
import { ALL_FONTS, ALL_THEMES, SETTING_KEYS } from "../data";
// import { isLoaded, loadAsync, useFonts } from "expo-font";
// import { downloadAsync, getInfoAsync, makeDirectoryAsync, readDirectoryAsync } from "expo-file-system";
import { getFromStorageOrDefault } from "../utils/storage";
import type { CustomTheme, FontObject, Theme_Color, Theme_TextStyle } from "../types";
import { Platform } from "react-native"; 
import { captureException } from "@sentry/react-native";
import { StatusBar } from 'expo-status-bar';

type Props = {
  colors: Theme_Color;
  textStyle: Theme_TextStyle;
  changeTheme: (theme: string) => void;
  // changeRoundness: (value: number) => void;
  changeFont: (font: string) => void;
  // loadFont: (id: string) => Promise<void>;
  // enqueueSnackbar: (message: string) => void;
};

const defaultTheme = Platform.OS === "android" && Platform.Version >= 31 ? "deviceLight" : "defaultLight";

const ThemeContext = createContext<Props>({
  // font: getFromStorageOrDefault(SETTING_KEYS.font, "sansserif", true),
  // theme: ALL_THEMES.find((theme) => theme.id === getFromStorageOrDefault(SETTING_KEYS.theme, "default", true)),
  // theme: "default",
  // font: "lexend",
  changeTheme: () => {},
  // changeRoundness: () => {},
  changeFont: () => {},
  // loadFont: async (id: string) => {},
  colors: ALL_THEMES[0].colors,
  textStyle: ALL_FONTS[0].font,
});

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("default");
  const [font, setFont] = useState("lexend");

  const colors = useMemo(() => (ALL_THEMES.find((f) => f.id === theme) as CustomTheme).colors, [theme]);

  const statusBarStyle = useMemo(
    () => (ALL_THEMES.find((f) => f.id === theme) as CustomTheme).statusbar || "dark",
    [theme]
  );

  const textStyle = useMemo(() => {
    const _fonts = (ALL_FONTS.find((f) => f.id === font) as FontObject).font;
    const fonts = {
      amountInput: _fonts.amountInput,
      amount: _fonts.amount,
      body: { ..._fonts.body, color: colors.text },
      bodyBold: { ..._fonts.bodyBold, color: colors.text },
      title: { ..._fonts.title, color: colors.text },
      caption: { ..._fonts.caption, color: colors.text },
      header: { ..._fonts.header, color: colors.text },
      label: { ..._fonts.label, color: colors.text },
      display: {... _fonts.display, colors: colors.text }
    };

    return fonts;
  }, [font, colors]);

  const [roundness, setRoundness] = useState(parseInt(getFromStorageOrDefault(SETTING_KEYS.roundness, "-1", true)));

  const changeTheme = useCallback((theme: string) => {
    try {
      let hasPerm = true;
      // if (!hasPerm) {
      //   console.log("No Permission");
      // }
      // setStorage(SETTING_KEYS.theme, theme);
      setTheme(theme);
    } catch (e) {
      captureException(e, {
        level: "error",
        tags: {
          location: "changeTheme",
          file: "providers/ThemeProvider.tsx",
          action: "theme-change",
          timestamp: Date.now(),
        },
      });
    }
    setTheme(theme);
  }, []);

  const changeFont = useCallback((font: string) => {
    try {
      // await loadFont(font);
      setFont(font);
    } catch (e) {
      captureException(e, {
        level: "error",
        tags: {
          location: "changeFont",
          file: "providers/ThemeProvider.tsx",
          action: "font-change",
          timestamp: Date.now(),
        },
      });
    }
  }, []);

  const changeRoundness = useCallback((value: number) => {
    setRoundness(value);
  }, []);

  // const getOfflineFonts = useCallback(async () => {
  //   const { exists } = await getInfoAsync(FONTS_DIRECTORY);
  //   if (!exists) await makeDirectoryAsync(FONTS_DIRECTORY, { intermediates: true });

  //   const files = await readDirectoryAsync(FONTS_DIRECTORY);
  //   // console.log({files});

  //   const fonts = Array.from(LOCAL_FONTS);
  //   for (const font of ALL_FONTS) {
  //     if (!LOCAL_FONTS.includes(font.id)) {
  //       if (font?.files && font.files.length && font.files.every((file) => files.includes(file.name)))
  //         fonts.push(font.id);
  //     }
  //   }
  // }, []);

  // const downloadFont = useCallback(async (id: string) => {
  //   try {
  //     const font = ALL_FONTS.find((f) => f.id === id);
  //     if (font) for (const file of font.files) await downloadAsync(file.link, `${FONTS_DIRECTORY}/${file.name}`);
  //   } catch (e) {
  //     console.log(e);
  //     throw e;
  //   }
  // }, []);
  // const loadFont = useCallback(async (id: string) => {
  //   // If Default Font
  //   if (LOCAL_FONTS.includes(id)) return;
  //   try {
  //     const font = ALL_FONTS.find((f) => f.id === id);
  //     // If Font is Already Loaded
  //     if (font.files.every((file) => isLoaded(file.name))) return;

  //     for (const file of font.files) {
  //       let location = await getInfoAsync(`${FONTS_DIRECTORY}/${file.name}`);
  //       if (location.exists && !location.isDirectory && !isLoaded(file.name)) await loadAsync(file.name, location.uri);
  //       else {
  //         await downloadFont(id);
  //         // enqueueSnackbar("DOWNLOADING_FONT");
  //         location = await getInfoAsync(`${FONTS_DIRECTORY}/${file.name}`);
  //         await loadAsync(file.name, location.uri);
  //       }
  //     }
  //   } catch (e) {
  //     changeFont(LOCAL_FONTS[0]);
  //     console.log("Uncountered an error, Setting font to san serif");
  //     console.log(e);
  //     throw e;
  //   }
  // }, []);

  return (
    <ThemeContext.Provider
      value={{
        changeTheme,
        changeFont,
        colors,
        textStyle,
      }}
    >
      <StatusBar style={statusBarStyle} />
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
