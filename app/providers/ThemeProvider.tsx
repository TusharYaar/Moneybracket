import React, { useContext, createContext, useState, useMemo, useCallback } from "react";
import { ALL_FONTS, ALL_THEMES, SETTING_KEYS } from "../data";
import { StatusBar } from "expo-status-bar";
// import { isLoaded, loadAsync, useFonts } from "expo-font";
// import { downloadAsync, getInfoAsync, makeDirectoryAsync, readDirectoryAsync } from "expo-file-system";
import { getFromStorageOrDefault } from "../utils/storage";
import type { Theme_Color, Theme_TextStyle } from "../types";
import { Platform } from "react-native";

// const textStyle: Theme_TextStyle = {
//   body: {
//     fontSize: 16,
//     fontFamily: "Lexend-Regular",
//   },
//   amountInput: {
//     fontSize: 32,
//     fontFamily: "Lexend-Regular",
//   },
//   header: {
//     fontSize: 32,
//     fontFamily: "Lexend-Regular",
//   },
//   title: {
//     fontSize: 18,
//     fontFamily: "Lexend-Regular",
//   },
//   caption: {
//     fontSize: 32,
//     fontFamily: "Lexend-Regular",
//   },
//   amount: {
//     fontSize: 24,
//     fontFamily: "Lexend-Regular",
//   },
// };

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

const ThemeProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  // const [loaded, error] = useFonts({
  //   Raleway_100: require("../assets/Raleway_100.ttf"),
  //   Raleway_200: require("../assets/Raleway_200.ttf"),
  //   Raleway_300: require("../assets/Raleway_300.ttf"),
  //   Raleway_400: require("../assets/Raleway_400.ttf"),
  //   Raleway_500: require("../assets/Raleway_500.ttf"),
  //   Raleway_600: require("../assets/Raleway_600.ttf"),
  //   Raleway_700: require("../assets/Raleway_700.ttf"),
  //   Raleway_800: require("../assets/Raleway_800.ttf"),
  //   Raleway_900: require("../assets/Raleway_900.ttf"),

  //   Lexend_400: require("../assets/Lexend_400.ttf"),
  //   Lexend_500: require("../assets/Lexend_500.ttf"),
  //   Lexend_600: require("../assets/Lexend_600.ttf"),
  //   Lexend_700: require("../assets/Lexend_700.ttf"),
  //   Lexend_800: require("../assets/Lexend_800.ttf"),
  //   Lexend_900: require("../assets/Lexend_900.ttf"),
  // });
  const [theme, setTheme] = useState("default");
  const [font, setFont] = useState("lexend");

  const colors = useMemo(() => ALL_THEMES.find((f) => f.id === theme).colors, [theme]);

  const statusBarStyle = useMemo(() => ALL_THEMES.find((f) => f.id === theme).statusbar || "dark", [theme]);

  const textStyle = useMemo(() => {
    const _fonts = ALL_FONTS.find((f) => f.id === font).font;
    const fonts = {
      amountInput: _fonts.amountInput,
      amount: _fonts.amount,
      body: { ..._fonts.body, color: colors.text },
      title: { ..._fonts.title, color: colors.text },
      caption: { ..._fonts.caption, color: colors.text },
      header: { ..._fonts.header, color: colors.headerText },
      label: { ..._fonts.label, color: colors.text },
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
      console.log("caught an error");
    }
    setTheme(theme);
  }, []);

  const changeFont = useCallback((font: string) => {
    try {
      // await loadFont(font);
      setFont(font);
    } catch (e) {
      console.log(e);
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
        // font,
        changeFont,
        // changeRoundness,
        // loadFont,
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
