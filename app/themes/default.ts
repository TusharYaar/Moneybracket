import {DefaultTheme, DarkTheme} from "react-native-paper";
import {CustomTheme} from "../types";

const defaultLight: CustomTheme = {
  ...DefaultTheme,
  name: "default Theme",
  id: "defaultLight",
  animation: {
    scale: 1,
  },
  colors: {
    ...DefaultTheme.colors,
    accent: "#03dac6",
    // backdrop: "yellow",
    // background: "orange",
    border: "gold",
    card: "white",
    error: "#CF6679",
    notification: "#ff80ab",
    onSurface: "cyan",
    placeholder: "rgba(255, 255, 255, 0.54)",
    primary: "#BB86FC",
    // surface: "gray",
    income: "green",
    expense: "red",
    transfer: "blue",
    cardToneBackground: "#dfdfdf",
  },
  dark: true,
  mode: "adaptive",
  roundness: 8,
};

export const defaultDark: CustomTheme = {
  ...DarkTheme,
  name: "Default Dark Theme",
  id: "defaultDark",
  animation: {
    scale: 1,
  },
  colors: {
    ...DarkTheme.colors,
    accent: "#03dac6",
    // backdrop: "yellow",
    // background: "orange",
    border: "gold",
    card: "black",
    error: "#CF6679",
    notification: "#ff80ab",
    onSurface: "cyan",
    // placeholder: "rgba(255, 255, 255, 0.54)",
    // primary: "#BB86FC",
    // surface: "gray",
    text: "white",
    income: "green",
    expense: "red",
    transfer: "blue",
    cardToneBackground: "#282c34",
  },

  dark: true,
  mode: "adaptive",
  roundness: 8,
};
export default defaultLight;
