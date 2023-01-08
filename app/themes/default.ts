import {MD3DarkTheme, MD3LightTheme} from "react-native-paper";
import {CustomTheme} from "../types";

const defaultLight: CustomTheme = {
  ...MD3LightTheme,
  name: "Default Theme",
  id: "defaultLight",
  roundness: 0,
  colors: {
    ...MD3LightTheme.colors,
    //   accent: "#03dac6",
    //   // backdrop: "yellow",
    //   // background: "orange",
    //   border: "gold",
    //   card: "white",
    //   error: "#CF6679",
    //   notification: "#ff80ab",
    //   onSurface: "cyan",
    //   placeholder: "rgba(255, 255, 255, 0.54)",
    //   primary: "#BB86FC",
    //   // surface: "gray",
    income: "#16a34a",
    expense: "#dc2626",
    transfer: "#0284c7",
    cardToneBackground: "#dfdfdf",
  },
  // dark: true,
  // mode: "adaptive",
  // roundness: 8,
};

export const defaultDark: CustomTheme = {
  ...MD3DarkTheme,
  name: "Default Dark Theme",
  id: "defaultDark",
  // animation: {
  //   scale: 1,
  // },
  colors: {
    ...MD3DarkTheme.colors,
    //   accent: "#03dac6",
    //   // backdrop: "yellow",
    //   // background: "orange",
    //   border: "gold",
    //   card: "black",
    //   error: "#CF6679",
    //   notification: "#ff80ab",
    //   onSurface: "cyan",
    //   // placeholder: "rgba(255, 255, 255, 0.54)",
    //   // primary: "#BB86FC",
    //   // surface: "gray",
    //   text: "white",
    income: "green",
    expense: "red",
    transfer: "blue",
    cardToneBackground: "#282c34",
  },

  // dark: true,
  // mode: "adaptive",
  // roundness: 8,
};
export default defaultLight;
