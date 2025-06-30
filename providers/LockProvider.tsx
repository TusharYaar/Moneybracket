import React, { useContext, createContext, useState, useEffect } from "react";

import { View, Text, StyleSheet } from "react-native";

import * as LocalAuthentication from "expo-local-authentication";
import { getFromStorage } from "../utils/storage";
import { SETTING_KEYS } from "../data";

type Props = {};

const LockContext = createContext<Props>({});

export const useLock = () => useContext(LockContext);

const lockEnable = getFromStorage(SETTING_KEYS.appLock) === "ENABLE";

const LockProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLock, setIsLock] = useState<boolean>(lockEnable);

  useEffect(() => {
    const func = async () => {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) setIsLock(false);
    };

    if (lockEnable) func();
  }, []);

  return (
    <LockContext.Provider value={{}}>
      {isLock && (
        <View style={styles.screen}>
          <Text>App Locked</Text>
        </View>
      )}
      {!isLock && children}
    </LockContext.Provider>
  );
};

export default LockProvider;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
