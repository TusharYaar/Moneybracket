import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { CustomTheme } from "../types";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";

const defaultLight: CustomTheme = {
  ...MD3LightTheme,
  name: "Default Theme",
  id: "defaultLight",
  roundness: 0,
  colors: {
    ...MD3LightTheme.colors,
    ...DefaultTheme.colors,

    income: "#16a34a",
    expense: "#dc2626",
    transfer: "#0284c7",
    cardToneBackground: "#dfdfdf",
  },
  image:
    "https://res.cloudinary.com/tusharyaar/image/upload/c_scale,h_2280,q_78/v1676718255/MoneyBracket/Screenshot_1676655142_itbtcr.png",
};

export const defaultDark: CustomTheme = {
  ...MD3DarkTheme,
  name: "Default Dark Theme",
  id: "defaultDark",
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    primary: "#cdc5b4",
    income: "#009c64",
    expense: "#bd1d1d",
    transfer: "#2aa3c2",
    cardToneBackground: "#1A1917",
  },
  dark: true,
  image: "https://res.cloudinary.com/tusharyaar/image/upload/v1676720746/MoneyBracket/Screenshot_1676720732_s2et1v.png",
};

export default defaultLight;
