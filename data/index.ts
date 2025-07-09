import { ICONS } from "./icons";
import COLORS, {GROUP_COLORS} from "./colors";
import DATE from "./dates";
import CURRENCIES from "./currencies";
import ALL_FONTS from "./fonts";
import ALL_THEMES from "./themes";
import { Paths } from "expo-file-system/next";

const EXPORTS_DIRECTORY = `${Paths.document.uri}Exports/`;
const BACKUP_DIRECTORY = `${Paths.document.uri}Backups/`;
const IMAGES_DIRECTORY = `${Paths.document.uri}Images/`;
const FONTS_DIRECTORY = `${Paths.document.uri}Fonts/`;

// // export const LOCAL_FONTS = ["sansserif", "serif", "monospace"];
// export const DEFAULT_FONTS = _ALL_FONTS.filter((font) => !font.isPaid);

// export let DEFAULT_THEMES =
//   Platform.OS === "android" && Platform.Version >= 31
//     ? (["deviceLight", "deviceDark", "defaultLight", "defaultDark"] as const)
//     : (["defaultLight", "defaultDark"] as const);

export const SETTING_KEYS = {
  language: "settings/language",
  currency: "settings/currency",
  appLockType: "settings/applockType",
  theme: "settings/theme",
  icon: "settings/icon",
  font: "settings/font",
  dateFormat: "settings/dateFormat",
  roundness: "settings/roundness",
  isFirstLaunch: "settings/isFirstLaunch",
  isAppLocked: "settings/isAppLocked",
  // 
  notificationEnable: "settings/notification/enable",
  reminderNotificationEnable: "settings/notification/reminderEnable",
  reminderNotificationTime: "settings/notification/reminderTime",
  // 
  backupEnable: "settings/backup",
  dailyAutoBackup: "settings/backup/autoDaily",
  deleteOldBackup: "settings/backup/deleteOld"
} as const;

export {
  ICONS,
  COLORS,
  GROUP_COLORS,
  CURRENCIES,
  DATE,
  ALL_FONTS,
  ALL_THEMES,
  EXPORTS_DIRECTORY,
  BACKUP_DIRECTORY,
  IMAGES_DIRECTORY,
  FONTS_DIRECTORY,
};
