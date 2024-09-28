import { StyleSheet, useWindowDimensions } from "react-native";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import Header from "@components/Header";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HeaderContext = createContext({
  hideHeader: () => {},
  showHeader: () => {},
  hideTabbar: () => {},
  showTabbar: () => {},
  isHeaderVisible: true,
  isTabbarVisible: true,

  // headerHeight:
});

export const useHeader = () => useContext(HeaderContext);

const HeaderProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  // const { height, width } = useWindowDimensions();
  const [headerVisible, setHeaderVisible] = useState(true);
  const [tabbarVisible, setTabbarVisible] = useState(true);

  // const lastContentOffset = useSharedValue(0);
  // const top = useSharedValue(insets.top);

  const hideHeader = useCallback(() => {
    // top.value = withTiming(-100);
    setHeaderVisible(false);
  }, []);

  const showHeader = useCallback(() => setHeaderVisible(true), []);

  const showTabbar = useCallback(() => setTabbarVisible(true), []);
  const hideTabbar = useCallback(() => setTabbarVisible(false), []);

  return (
    <HeaderContext.Provider
      value={{
        showHeader,
        hideHeader,
        showTabbar,
        hideTabbar,
        isHeaderVisible: headerVisible,
        isTabbarVisible: tabbarVisible,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
