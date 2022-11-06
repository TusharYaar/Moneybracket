import {DefaultTheme} from "react-native-paper";
import {CustomTheme} from "../types";
import AVALIBLE_FONTS from "./fonts";

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
    disabled: "rgba(255, 255, 255, 0.38)",
    error: "#CF6679",
    notification: "#ff80ab",
    onSurface: "cyan",
    placeholder: "rgba(255, 255, 255, 0.54)",
    primary: "#BB86FC",
    surface: "gray",
    text: "brown",
    income: "green",
    expense: "red",
  },
  dark: true,
  fonts: AVALIBLE_FONTS["montserrat"].fontConfig,
  mode: "adaptive",
  roundness: 4,
};

export default defaultLight;
