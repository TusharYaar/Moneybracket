import { MD3Colors, MD3Theme, MD3Typescale } from "react-native-paper/lib/typescript/types";
import { Theme } from "@react-navigation/native";
import { Transaction } from "./realm/Transaction";
import { Platform } from "react-native";
export interface CustomTheme extends MD3Theme {
  id: string;
  name: string;
  colors: MD3Colors &
    Theme["colors"] & {
      income: string;
      expense: string;
      transfer: string;
      cardToneBackground: string;
    };
  image?: string;
}

export interface FontObject {
  id: string;
  name: string;
  by: string;
  font: MD3Typescale;
  isPaid?: boolean;
  files: {
    name: string;
    link: string;
  }[];
}

export interface GroupedTransactions {
  date: Date;
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

export type BackupFile = {
  createdOn: Date;
  app: "com.tusharyaar.moneybracket";
  platform: typeof Platform.OS;
  version: typeof Platform.Version;
  includeImages: boolean;
  settings: {
    [key: string]: string;
  };
  category: {
    _id: string;
    title: string;
    type: string;
    isFavorite: boolean;
    createdAt: string;
    color: string;
    icon: string;
  }[];
  transaction: {
    _id: string;
    note: string;
    date: string;
    amount: number;
    currency: string;
    category: string;
    createdAt: string;
    isFavorite: boolean;
    image: string;
  }[];
};
