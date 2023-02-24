import { getInfoAsync, makeDirectoryAsync, readDirectoryAsync, downloadAsync } from "expo-file-system";
import { isLoaded, loadAsync } from "expo-font";
import React, { useContext, createContext, useState, useCallback, useEffect } from "react";
import { FONTS_DIRECTORY } from "../data";
import ALL_FONTS from "../themes/fonts";

import { useSettings } from "./SettingsProvider";

const LocalFonts = ["sanserif", "serif", "monospace"];

type Props = {
  unlockedFonts: string[];
  offlineFonts: string[];
  downloadFont: (font: string) => void;
};

const FontContext = createContext<Props>({
  unlockedFonts: [],
  offlineFonts: ["sanserif", "serif", "monospace"],
  downloadFont: () => {},
});

export const useFont = () => useContext(FontContext);

const FontProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { font, updateFont } = useSettings();
  const [unlockedFonts, setUnlockedFonts] = useState([...LocalFonts]);
  const [offlineFonts, setOfflineFonts] = useState(LocalFonts);

  const loadFont = useCallback(
    async (id: string) => {
      // If Default Font
      if (LocalFonts.includes(id)) return;

      try {
        const font = ALL_FONTS.find((f) => f.id === id);

        // If Font is Already Loaded
        if (font.files.every((file) => isLoaded(file.name))) return;

        for (const file of font.files) {
          const location = await getInfoAsync(`${FONTS_DIRECTORY}/${file.name}`);
          if (location.exists && !location.isDirectory && !isLoaded(file.name))
            await loadAsync(file.name, location.uri);
          else {
            updateFont("sanserif");
            console.log("Font not avalible", font.name);
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    [offlineFonts]
  );

  const readFontsDirectory = useCallback(async () => {
    const { exists } = await getInfoAsync(FONTS_DIRECTORY);
    if (!exists) {
      await makeDirectoryAsync(FONTS_DIRECTORY, { intermediates: true });
    }
    const files = await readDirectoryAsync(FONTS_DIRECTORY);
    const fonts = LocalFonts;
    for (const font of ALL_FONTS) {
      if (!LocalFonts.includes(font.id)) {
        if (font?.files && font.files.length && font.files.every((file) => files.includes(file.name)))
          fonts.push(font.id);
      }
    }
    setOfflineFonts(fonts);
  }, []);

  const downloadFont = useCallback(async (id: string) => {
    try {
      const font = ALL_FONTS.find((f) => f.id === id);
      if (font) {
        for (const file of font.files) await downloadAsync(file.link, `${FONTS_DIRECTORY}/${file.name}`);
        setOfflineFonts((prev) => [...prev, id]);
        loadFont(font.id);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    loadFont(font);
    readFontsDirectory();
    // __DEV__ && setUnlockedFonts(ALL_FONTS.map((font) => font.id));
  }, [font, loadFont, readFontsDirectory]);

  return <FontContext.Provider value={{ unlockedFonts, offlineFonts, downloadFont }}>{children}</FontContext.Provider>;
};

export default FontProvider;
