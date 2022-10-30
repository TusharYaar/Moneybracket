import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getFromStorageOrDefault} from "../utils/storage";

export interface SettingState {
  currency: string;
  appLock: string;
  screenLock: string;
  theme: string;
}

const initialState: SettingState = {
  currency: getFromStorageOrDefault("setting/currency", "INR"),
  appLock: getFromStorageOrDefault("setting/appLock", "DISABLE"),
  screenLock: getFromStorageOrDefault("setting/screenLock", "DI SABLE"),
  theme: getFromStorageOrDefault("setting/theme", "DEFAULT"),
};
export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    getCurrentSetting: state => {
      return state;
    },
    updateSetting: (state, action: PayloadAction<string>) => {
      console.log(action);
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {getCurrentSetting, updateSetting} = settingSlice.actions;

export default settingSlice.reducer;
