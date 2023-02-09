import { StyleSheet } from "react-native";
import React, { useState, useContext, createContext } from "react";

import { STORE_KEYS } from "../data";
import { getFromStorageOrDefault } from "../utils/storage";

type Props = {
  coins: number;
};

const STORE = {
  coins: parseInt(getFromStorageOrDefault(STORE_KEYS.coins, "0", true)),
  themes: getFromStorageOrDefault(STORE_KEYS.themes, "", false),
  fonts: getFromStorageOrDefault(STORE_KEYS.fonts, "", false),
};

const StoreContext = createContext<Props>(STORE);
export const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [coins, setCoins] = useState(STORE.coins);

  return <StoreContext.Provider value={{ coins }}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
