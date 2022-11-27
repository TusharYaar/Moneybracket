import {Fonts, Theme} from "react-native-paper/lib/typescript/types";
import {Transaction} from "./realm/Transaction";
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

export interface GroupedTransactions {
  date: string;
  transactions: Transaction[];
}

export type Currency = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
};
