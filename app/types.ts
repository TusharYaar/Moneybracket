import {
  MD3Colors,
  MD3Theme,
  Fonts,
  MD3Typescale,
} from "react-native-paper/lib/typescript/types";
import {Transaction} from "./realm/Transaction";
export interface CustomTheme extends MD3Theme {
  id: string;
  name: string;
  colors: MD3Colors & {
    //   primary: string;
    //   background: string;
    //   surface: string;
    //   accent: string;
    //   error: string;
    //   text: string;
    //   onSurface: string;
    //   disabled: string;
    //   placeholder: string;
    //   backdrop: string;
    //   notification: string;
    //   card: string;
    //   border: string;
    income: string;
    expense: string;
    transfer: string;
    cardToneBackground: string;
  };
}

export interface FontObject {
  id: string;
  name: string;
  font: MD3Typescale;
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

export type ExchangeRatesServerResponse = {
  motd: {
    msg: string;
    url: string;
  };
  success: boolean;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
};
