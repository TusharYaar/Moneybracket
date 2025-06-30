import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Link, usePathname } from "expo-router";
import { useTheme } from "providers/ThemeProvider";

import Icon from "./Icon";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const ICONS = {
  index: "transactionTab",
  category: "categoryTab",
  recurring: "recurringTab",
  settings: "settingTab",
  group: "groupTab",
};

const TabSize = 56;

const Tabbar = ({ state }: BottomTabBarProps) => {
  const { colors } = useTheme();
  const path = usePathname();
  // TODO: make it dynamic
  const isWide = true;
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[isWide ? styles.tabbarContainerInRow : styles.tabbarContainerInCol, { paddingBottom: bottom, position: "absolute", bottom: 0, left: 0, right: 0 }]}>
      <View
        style={[
          styles.tabsContainer,
          { backgroundColor: colors.tabbarBackground },
          isWide ? {} : { width: "100%", marginTop: 8 },
        ]}
      >
        {state.routes.map((route, index) => (
          <Link
            key={route.key}
            href={route.name === "index" ? "/" : route.name}
            replace
            accessibilityRole="button"
            accessibilityState={`/stack/${route}` === path ? { selected: true } : {}}
            disabled={state.index === index} //disable to prevent rerender
            testID={`tab-${route}`}
          >
            <View style={[styles.tabs]}>
              <Icon
                name={ICONS[route.name]}
                size={24}
                color={state.index === index ? colors.tabbarIconActive : colors.tabbarIcon}
              />
            </View>
          </Link>
        ))}
      </View>
      <Link href="/addTransaction" asChild testID="add-transaction">
        <Pressable>
          <View style={[styles.addBtn, { backgroundColor: colors.tabbarBackgroundSecondary }]}>
            <Icon name="add" size={24} color={colors.tabbarIconActiveSecondary} />
          </View>
        </Pressable>
      </Link>
    </View>
  );
};

export default Tabbar;

const styles = StyleSheet.create({
  tabbarContainerInRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  tabbarContainerInCol: {
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    alignItems: "flex-end",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
    borderRadius: 8,
  },
  tabs: {
    padding: 16,
    borderRadius: 8,
    height: TabSize,
    width: TabSize,
    zIndex: 3,
  },
  addBtn: {
    height: TabSize,
    width: TabSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
