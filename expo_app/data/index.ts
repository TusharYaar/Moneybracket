import { ICONS as _ICONS } from "./icons";
import _COLORS from "./colors";
import _DATE from "./dates";
import _CURRENCIES from "./currencies";
const ICONS = _ICONS;
const COLORS = _COLORS;
const CURRENCIES = _CURRENCIES;
const DATE = _DATE;

import { documentDirectory } from "expo-file-system";

export const EXPORTS_DIRECTORY = `${documentDirectory}Exports`;
export const BACKUP_DIRECTORY = `${documentDirectory}Backups`;
export const IMAGES_DIRECTORY = `${documentDirectory}Images`;

export const SETTING_KEYS = {
  language: "settings/language",
  currency: "settings/currency",
  appLock: "settings/theme",
  theme: "settings/font",
  font: "settings/appLock",
  dateFormat: "settings/dateFormat",
};

export { ICONS, COLORS, CURRENCIES, DATE };
