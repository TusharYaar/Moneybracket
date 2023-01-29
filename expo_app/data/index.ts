import { ICONS as _ICONS } from "./icons";
import _COLORS from "./colors";
import _CURRENCIES from "./currencies";
const ICONS = _ICONS;
const COLORS = _COLORS;
const CURRENCIES = _CURRENCIES;

import { documentDirectory } from "expo-file-system";

export const EXPORTS_DIRECTORY = `${documentDirectory}/Exports`;
export const BACKUP_DIRECTORY = `${documentDirectory}/Backups`;

export { ICONS, COLORS, CURRENCIES };
