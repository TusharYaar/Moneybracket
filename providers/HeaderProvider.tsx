import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Header from "@components/Header";
import { SplashScreen, useNavigationContainerRef, useRootNavigationState } from "expo-router";
import Tabbar from "@components/Tabbar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { HeaderRightButton } from "types";
import { useWindowDimensions } from "react-native";

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
  setHeaderTitle: (t: string) => {},
});

export const useHeader = () => useContext(HeaderContext);
const VISIBLE_TABS = !__DEV__
  ? ["(tabs)/transaction", "(tabs)/category", "(tabs)/group", "(tabs)/settings"]
  : ["(tabs)/transaction", "(tabs)/category", "(tabs)/group", "(tabs)/recurring", "(tabs)/settings"];

const HeaderProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const headerPosition = useSharedValue(topInset + 8);
  const tabbarPosition = useSharedValue(bottomInset + 8);
  const [headerRightButtons, setHeaderRightButtons] = useState<HeaderRightButton[]>([]);
  const [headerTitle, setHeaderTitle] = useState("");
  const {
    routes: [nav],
  } = useRootNavigationState();
  const navigation = useNavigationContainerRef();

  const isWide = useMemo(() => {
    const space = width - (VISIBLE_TABS.length + 1) * 64 - 8 * 2;
    if (space > 8) {
      return true;
    }
    return false;
  }, [width]);

  useEffect(() => {
    if (navigation.isReady()) {
      headerPosition.value = topInset + PADDING;
      SplashScreen.hideAsync();
      tabbarPosition.value = isWide ? bottomInset + PADDING : bottomInset + PADDING + 64;
    }
  }, [navigation, topInset, isWide]);

  const hideHeader = useCallback(() => {
    headerPosition.value = withTiming(-HEADER_HEIGHT);
  }, []);
  const hideTabbar = useCallback(() => {
    tabbarPosition.value = withTiming( isWide ? -HEADER_HEIGHT : -HEADER_HEIGHT * 2 - 8);
  }, [isWide]);
  const showHeader = useCallback(() => {
    headerPosition.value = withTiming(topInset + PADDING);
  }, [topInset]);
  const showTabbar = useCallback(() => {
    tabbarPosition.value = withTiming(bottomInset + PADDING);
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
      height: isWide ? HEADER_HEIGHT : HEADER_HEIGHT * 2 + 8,
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
        setHeaderTitle,
      }}
    >
      <Animated.View style={headerStyle}>
        <Header
        title={headerTitle}
          route={routes.length ? routes[currentIndex] : {}}
          back={currentIndex > 0 ? routes[currentIndex - 1].name : undefined}
          headerRightButtons={headerRightButtons}
        />
      </Animated.View>
      {children}
      <Animated.View style={tabbarStyle}>
        <Tabbar visibleTabs={VISIBLE_TABS} current={routes.length ? routes[currentIndex] : {}} isWide={isWide} />
      </Animated.View>
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
