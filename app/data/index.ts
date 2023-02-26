import { ICONS as _ICONS } from "./icons";
import _COLORS from "./colors";
import _DATE from "./dates";
import _CURRENCIES from "./currencies";
import _ALL_FONTS from "./fonts";
const ICONS = _ICONS;
const COLORS = _COLORS;
const CURRENCIES = _CURRENCIES;
const DATE = _DATE;

const ALL_FONTS = _ALL_FONTS;
import { documentDirectory } from "expo-file-system";

export const EXPORTS_DIRECTORY = `${documentDirectory}Exports`;
export const BACKUP_DIRECTORY = `${documentDirectory}Backups`;
export const IMAGES_DIRECTORY = `${documentDirectory}Images`;
export const FONTS_DIRECTORY = `${documentDirectory}Fonts`;

export const LOCAL_FONTS = ["sansserif", "serif", "monospace"];

export const SETTING_KEYS = {
  language: "settings/language",
  currency: "settings/currency",
  appLock: "settings/theme",
  theme: "settings/font",
  font: "settings/appLock",
  dateFormat: "settings/dateFormat",
};

export { ICONS, COLORS, CURRENCIES, DATE, ALL_FONTS };
