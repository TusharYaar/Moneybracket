import { ICONS } from "./icons";
import COLORS from "./colors";
import DATE from "./dates";
import CURRENCIES from "./currencies";
import ALL_FONTS from "./fonts";
import ALL_THEMES from "./themes";
import { documentDirectory } from "expo-file-system";
// import { Platform } from "react-native";

const EXPORTS_DIRECTORY = `${documentDirectory}Exports`;
const BACKUP_DIRECTORY = `${documentDirectory}Backups`;
const IMAGES_DIRECTORY = `${documentDirectory}Images`;
const FONTS_DIRECTORY = `${documentDirectory}Fonts`;

// // export const LOCAL_FONTS = ["sansserif", "serif", "monospace"];
// export const DEFAULT_FONTS = _ALL_FONTS.filter((font) => !font.isPaid);

// export let DEFAULT_THEMES =
//   Platform.OS === "android" && Platform.Version >= 31
//     ? (["deviceLight", "deviceDark", "defaultLight", "defaultDark"] as const)
//     : (["defaultLight", "defaultDark"] as const);

export const SETTING_KEYS = {
  language: "settings/language",
  currency: "settings/currency",
  appLock: "settings/applock",
  theme: "settings/theme",
  icon: "settings/icon",
  themeVariant: "settings/themeVariant",
  font: "settings/font",
  dateFormat: "settings/dateFormat",
  roundness: "settings/roundness",
  isFirstLaunch: "settings/isFirstLaunch",
};

export {
  ICONS,
  COLORS,
  CURRENCIES,
  DATE,
  ALL_FONTS,
  ALL_THEMES,
  EXPORTS_DIRECTORY,
  BACKUP_DIRECTORY,
  IMAGES_DIRECTORY,
  FONTS_DIRECTORY,
};
