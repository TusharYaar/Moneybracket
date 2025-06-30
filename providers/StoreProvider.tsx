import React, { useState, useContext, createContext } from "react";

import { getFromStorageOrDefault } from "../utils/storage";

const StoreContext = createContext({});
export const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <StoreContext.Provider value={{}}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
