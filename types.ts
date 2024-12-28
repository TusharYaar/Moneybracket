
import { Platform, TextStyle } from "react-native";
export type Transaction = {
  _id: string;
  note: string;
  date: Date;
  amount: number;
  currency: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  group: null | string;
  // isFavorite: boolean;
  image: string;
};
export interface TransactionWithCategory extends Omit<Transaction, "category"> {
  category: Category;
}

export type Category = {
  _id:string;
  title: string;
  type: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  color: string;
  icon: string;
  description?: string;
};

export type Group = {
  _id:string;
  title: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  color: string;
  icon: string;
  description: string;
};
export type Shortcut = {
  _id: string;
  category: string;
  note: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  currency: string;
  icon: string;
  title: string;
};
export interface CustomTheme {
  id: string;
  name: string;
  colors: Theme_Color;
  statusbar?: "dark" | "light";
  isVisible?: boolean;
  image?: string;
  isPaid?: boolean;
}

export interface FontObject {
  id: string;
  name: string;
  by: string;
  font: Theme_TextStyle;
  isPaid?: boolean;
  files?: {
    name: string;
    link: string;
  }[];
  isVisible?:boolean; 
}

export interface GroupedTransactions {
  date: Date;
  amount: number;
  transactions: TransactionWithCategory[];
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
    title: string;
    type: "income" | "expense" | "transfer";
    isFavorite: boolean;
    createdAt: string;
    color: string;
    icon: string;
  }[];
  transaction: {
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

export type Theme_Color = {
  screen: string;
  statusbar: string;
  headerBackground: string;
  headerText: string;
  headerIconActive: string;
  headerIconDisabled: string;

  sectionBackground: string;
  rippleColor: string;
  
  tabbarBackground: string;
  tabbarIcon: string;
  tabbarIconActive: string;
  tabbarIconDisabled: string;
  tabbarBackgroundSecondary: string;
  tabbarIconActiveSecondary: string;

  income: string;
  expense: string;
  transfer: string;

  text: string;
};

export type Theme_TextStyle = {
  body: TextStyle;
  amount: TextStyle;
  amountInput: TextStyle;
  header: TextStyle;
  title: TextStyle;
  caption: TextStyle;
  label: TextStyle;
};

export type HeaderRightButton = {
  action: string;
  icon: string;
  onPress?: () => void;
  disabled?: boolean;
}

export type TransactionDate = {
  date: Date;
  _id: string;
  label: string;
  amount: number;
  type: string;
};