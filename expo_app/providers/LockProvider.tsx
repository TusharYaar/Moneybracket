import React, { useContext, createContext, useState } from "react";

import { View, Text } from "react-native";

type Props = {};

const LockContext = createContext<Props>({});

export const useTheme = () => useContext(LockContext);

const LockProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [isLock, setIsLock] = useState<boolean>(false);

  return (
    <LockContext.Provider value={{}}>
      {isLock && (
        <View>
          <Text>LockScreen</Text>
        </View>
      )}
      {!isLock && children}
    </LockContext.Provider>
  );
};

export default LockProvider;
