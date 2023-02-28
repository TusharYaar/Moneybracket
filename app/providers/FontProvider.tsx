import { getInfoAsync, makeDirectoryAsync, readDirectoryAsync } from "expo-file-system";
import React, { useContext, createContext, useState, useCallback, useEffect } from "react";
import Purchases from "react-native-purchases";
import { FONTS_DIRECTORY, LOCAL_FONTS } from "../data";
import { ALL_FONTS } from "../data";
import { useCustomTheme } from "../themes";
type Props = {
  unlockedFonts: string[];
  offlineFonts: string[];
  checkFontSubscription: () => Promise<boolean>;
};

const FontContext = createContext<Props>({
  unlockedFonts: [],
  offlineFonts: LOCAL_FONTS,
  checkFontSubscription: () => Promise.resolve(true),
});

export const useFont = () => useContext(FontContext);

const FontProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { changeCurrentFont, currentFont } = useCustomTheme();
  const [unlockedFonts, setUnlockedFonts] = useState(LOCAL_FONTS);
  const [offlineFonts, setOfflineFonts] = useState(LOCAL_FONTS);

  const checkSubscription = useCallback(async () => {
    const info = await Purchases.getCustomerInfo();
    if (Object.keys(info.entitlements.active).includes("all_fonts")) {
      setUnlockedFonts(ALL_FONTS.map((font) => font.id));
      return true;
    } else {
      setUnlockedFonts(LOCAL_FONTS);
      return false;
    }
  }, []);

  const readFontsDirectory = useCallback(async () => {
    const { exists } = await getInfoAsync(FONTS_DIRECTORY);
    if (!exists) {
      await makeDirectoryAsync(FONTS_DIRECTORY, { intermediates: true });
    }
    const files = await readDirectoryAsync(FONTS_DIRECTORY);
    const fonts = Array.from(LOCAL_FONTS);
    for (const font of ALL_FONTS) {
      if (!LOCAL_FONTS.includes(font.id)) {
        if (font?.files && font.files.length && font.files.every((file) => files.includes(file.name)))
          fonts.push(font.id);
      }
    }
    setOfflineFonts(fonts);
  }, []);

  useEffect(() => {
    readFontsDirectory();
  }, [readFontsDirectory]);

  return (
    <FontContext.Provider value={{ unlockedFonts, offlineFonts, checkFontSubscription: checkSubscription }}>
      {children}
    </FontContext.Provider>
  );
};

export default FontProvider;
