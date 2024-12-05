import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Header from "@components/Header";
import { SplashScreen, useNavigationContainerRef, useRootNavigationState } from "expo-router";
import Tabbar from "@components/Tabbar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { HeaderRightButton } from "types";

const HEADER_HEIGHT = 64;
const PADDING = 8;
const HeaderContext = createContext({
  tabbar: {
    show: () => {},
    hide: () => {},
  },
  header: {
    show: () => {},
    hide: () => {},
  },
  setHeaderRightButtons: (btns: HeaderRightButton[]) => {},
  headerHeight: HEADER_HEIGHT + PADDING,
  tabbarHeight: HEADER_HEIGHT + PADDING,
});

export const useHeader = () => useContext(HeaderContext);
// "(tabs)/group",
const VISIBLE_TABS = !__DEV__
  ? ["(tabs)/transaction", "(tabs)/category", "(tabs)/settings"]
  : ["(tabs)/transaction", "(tabs)/category", "(tabs)/recurring", "(tabs)/settings"];

const HeaderProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets();
  const headerPosition = useSharedValue(topInset + 8);
  const tabbarPosition = useSharedValue(bottomInset + 8);
  const {
    routes: [nav],
  } = useRootNavigationState();
  const navigation = useNavigationContainerRef();
  useEffect(() => {
    if (navigation.isReady()) {
      headerPosition.value = topInset + 8;
      SplashScreen.hideAsync();
    }
  }, [navigation, topInset]);

  const [headerRightButtons, setHeaderRightButtons] = useState<HeaderRightButton[]>([]);

  const hideHeader = useCallback(() => {
    headerPosition.value = withTiming(-HEADER_HEIGHT);
  }, []);
  const hideTabbar = useCallback(() => {
    tabbarPosition.value = withTiming(-HEADER_HEIGHT);
  }, []);
  const showHeader = useCallback(() => {
    headerPosition.value = withTiming(topInset + 8);
  }, [topInset]);
  const showTabbar = useCallback(() => {
    tabbarPosition.value = withTiming(bottomInset + 8);
  }, [bottomInset]);

  const routes = useMemo(() => {
    if (nav.state) return nav.state.routes;
    return [];
  }, [nav]);

  const currentIndex = useMemo(() => {
    if (nav.state) {
      return nav.state.index;
    }
    return 0;
  }, [nav]);

  useEffect(() => {
    showHeader();
    if (currentIndex > 0) hideTabbar();
    else showTabbar();
  }, [currentIndex, showTabbar, hideTabbar]);

  const headerStyle = useAnimatedStyle(() => {
    return {
      top: headerPosition.value,
      position: "absolute",
      width: "100%",
      height: HEADER_HEIGHT,
      zIndex: 100,
    };
  });
  const tabbarStyle = useAnimatedStyle(() => {
    return {
      bottom: tabbarPosition.value,
      position: "absolute",
      width: "100%",
      height: HEADER_HEIGHT,
      zIndex: 100,
    };
  });

  return (
    <HeaderContext.Provider
      value={{
        setHeaderRightButtons,
        tabbar: {
          show: showTabbar,
          hide: hideTabbar,
        },
        header: {
          show: showHeader,
          hide: hideHeader,
        },
        headerHeight: HEADER_HEIGHT + PADDING,
        tabbarHeight: HEADER_HEIGHT + PADDING,
      }}
    >
      <Animated.View style={headerStyle}>
        <Header
          route={routes.length ? routes[currentIndex] : {}}
          back={currentIndex > 0 ? routes[currentIndex - 1].name : undefined}
          headerRightButtons={headerRightButtons}
        />
      </Animated.View>
      {children}
      <Animated.View style={tabbarStyle}>
        <Tabbar visibleTabs={VISIBLE_TABS} current={routes.length ? routes[currentIndex] : {}} />
      </Animated.View>
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
