import {MMKV} from "react-native-mmkv";
const storage = new MMKV({
  id: "moneybracket-storage",
  // encryptionKey: ""
});

export const getFromStorage = (key: string): string => {
  let value = storage.getString(key);
  if (value === undefined || value === "0" || value === "") return "";
  else return value;
};

export const getFromStorageOrDefault = (
  key: string,
  def: string,
  set = false as boolean,
): string => {
  let value = storage.getString(key);
  if (value === undefined || value === "0" || value === "") {
    if (set) storage.set(key, def);
    return def;
  } else return value;
};

export const setStorage = (key: string, value: string) => {
  storage.set(key, value);
};
