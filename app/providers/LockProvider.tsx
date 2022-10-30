import React, {useContext, createContext, useState} from 'react';

import {StyleSheet, View, Text} from 'react-native';

type Props = {};

const LockContext = createContext<Props>({});

export const useTheme = () => useContext(LockContext);

const LockProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
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

const styles = StyleSheet.create({
  view: {
    flex: 1,
    shadowOpacity: 1,
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 10},
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});
