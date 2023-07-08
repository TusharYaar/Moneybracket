import React, { useContext, createContext, useState, useMemo, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";

import Ionicons from "@expo/vector-icons/Ionicons";
import { ALL_FONTS, DEFAULT_THEMES, FONTS_DIRECTORY, LOCAL_FONTS, ALL_THEMES, SETTING_KEYS } from "../data";
import { StatusBar } from "expo-status-bar";
import { isLoaded, loadAsync } from "expo-font";
import { downloadAsync, getInfoAsync } from "expo-file-system";
// import { useTranslation } from "react-i18next";
import { getFromStorageOrDefault, setStorage } from "../utils/storage";

import type { CustomTheme } from "../types";

type Props = {
  currentFont: string;
  theme: CustomTheme;
  changeTheme: (theme: string) => void;
  changeRoundness: (value: number) => void;
  changeCurrentFont: (font: string) => void;
  loadFont: (id: string) => Promise<void>;
  enqueueSnackbar: (message: string) => void;
};

const ThemeContext = createContext<Props>({
  currentFont: getFromStorageOrDefault(SETTING_KEYS.font, "sansserif", true),
  theme: ALL_THEMES.find((theme) => theme.id === getFromStorageOrDefault(SETTING_KEYS.theme, "defaultLight", true)),
  changeTheme: () => {},
  changeRoundness: () => {},
  changeCurrentFont: () => {},
  loadFont: async (id: string) => {},
  enqueueSnackbar: () => {},
});

export const useCustomTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  // const { t } = useTranslation("", { keyPrefix: "messages" });

  const [_theme, setTheme] = useState(DEFAULT_THEMES[0]);
  const [currentFont, setCurrentFont] = useState(LOCAL_FONTS[0]);
  const [roundness, setRoundness] = useState(parseInt(getFromStorageOrDefault(SETTING_KEYS.roundness, "-1", true)));
  const [snackbars, setSnackbars] = useState<{ message: string; id: number }[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const themeObject = useMemo(() => {
    let obj = ALL_THEMES.find((t) => t.id === _theme);

    obj.fonts = ALL_FONTS.find((f) => f.id === currentFont).font;

    if (roundness === -1) return obj;
    else return { ...obj, roundness } as CustomTheme;
  }, [_theme, currentFont, roundness]);

  const changeTheme = useCallback((theme: string) => {
    try {
      let hasPerm = true;
      // if (!DEFAULT_THEMES.includes(theme)) hasPerm = (await checkSubscription()).theme;
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

  const changeCurrentFont = useCallback(async (font: string) => {
    try {
      // let hasPerm = true;
      // if (!LOCAL_FONTS.includes(font)) hasPerm = (await checkSubscription()).font;
      // if (!hasPerm) throw "FONT_NOT_UNLOCKED";
      await loadFont(font);
      setCurrentFont(font);
      setStorage(SETTING_KEYS.font, font);
      // if (notify) enqueueSnackbar("FONT_UPDATE_SUCCESS");
      // getOfflineFonts();
    } catch (e) {
      console.log(e);
      // changeCurrentFont(font);
      // if (e === "FONT_NOT_UNLOCKED" && !LOCAL_FONTS.includes(font)) {
      //   font = LOCAL_FONTS[0];
      //   changeCurrentFont(font);
      //   setStorage(SETTING_KEYS.font, font);
      //   setSettings((prev) => ({ ...prev, font }));
      //   enqueueSnackbar(e);
      // } else enqueueSnackbar(e);
    }

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
    return;

    if (message === undefined) return;

    setSnackbars((prev) => {
      const id = Math.random();
      console.log(id);
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
    return;
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
        {/* <Snackbar
          visible={snackbarVisible && snackbars.length > 0}
          onDismiss={() => closeSnackbar(snackbars[0].id)}
          duration={1000}
        >
          {t(snackbars[0]?.message)}
        </Snackbar> */}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
