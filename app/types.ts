import {Fonts, Theme} from "react-native-paper/lib/typescript/types";
export interface CustomTheme extends Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    background: string;
    surface: string;
    accent: string;
    error: string;
    text: string;
    onSurface: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    notification: string;
    card: string;
    border: string;
    income: string;
    expense: string;
    cardToneBackground: string;
  };
}

export interface FontObject {
  id: string;
  name: string;
  fontConfig: Fonts;
  isPaid?: boolean;
}
