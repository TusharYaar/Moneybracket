import { ICONS as _ICONS } from "./icons";
import _COLORS from "./colors";
import _DATE from "./dates";
import _CURRENCIES from "./currencies";
import _ALL_FONTS from "./fonts";
import _ALL_THEMES from "./themes";
const ICONS = _ICONS;
const COLORS = _COLORS;
const CURRENCIES = _CURRENCIES;
const DATE = _DATE;

const ALL_FONTS = _ALL_FONTS;
const ALL_THEMES = _ALL_THEMES;
import { documentDirectory } from "expo-file-system";

export const EXPORTS_DIRECTORY = `${documentDirectory}Exports`;
export const BACKUP_DIRECTORY = `${documentDirectory}Backups`;
export const IMAGES_DIRECTORY = `${documentDirectory}Images`;
export const FONTS_DIRECTORY = `${documentDirectory}Fonts`;

export const LOCAL_FONTS = __DEV__ ? ALL_FONTS.map((f) => f.id) : ["sansserif", "serif", "monospace"];
export const DEFAULT_THEMES = ["defaultLight", "defaultDark"];

export const SETTING_KEYS = {
  language: "settings/language",
  currency: "settings/currency",
  appLock: "settings/applock",
  theme: "settings/theme",
  themeVariant: "settings/themeVariant",
  font: "settings/font",
  dateFormat: "settings/dateFormat",
  roundness: "settings/roundness",
};

export { ICONS, COLORS, CURRENCIES, DATE, ALL_FONTS, ALL_THEMES };
