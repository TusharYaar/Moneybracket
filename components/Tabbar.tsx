import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useTheme } from "providers/ThemeProvider";

import Icon from "./Icon";
import { Route } from "@react-navigation/native";

interface Props {
  visibleTabs: string[];
  current: Route<any>;
  isWide: boolean;
}

const ICONS = {
  "(tabs)/transaction": "transactionTab",
  "(tabs)/category": "categoryTab",
  "(tabs)/recurring": "recurringTab",
  "(tabs)/settings": "settingTab",
  "(tabs)/group": "groupTab",
};

const TabSize = 64;

const Tabbar = ({ visibleTabs, current, isWide }: Props) => {
  const { colors } = useTheme();
  return (
    <View style={isWide ? styles.tabbarContainerInRow : styles.tabbarContainerInCol}>
      <View
        style={[
          styles.tabsContainer,
          { backgroundColor: colors.tabbarBackground },
          isWide ? {} : { width: "100%", marginTop: 8 },
        ]}
      >
        {visibleTabs.map((route) => (
          <Link
            key={route}
            href={`stack/${route}`}
            replace
            accessibilityRole="button"
            accessibilityState={route === current.name ? { selected: true } : {}}
            disabled={route === current.name}
          >
            <View style={[styles.tabs]}>
              <Icon
                name={ICONS[route]}
                size={32}
                color={route === current.name ? colors.tabbarIconActive : colors.tabbarIcon}
              />
            </View>
          </Link>
        ))}
      </View>
      <Link href="stack/addTransaction" asChild>
        <Pressable>
          <View style={[styles.addBtn, { backgroundColor: colors.tabbarBackgroundSecondary }]}>
            <Icon name="add" size={32} color={colors.tabbarIconActiveSecondary} />
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
    height: 64,
    width: 64,
    zIndex: 3,
  },
  addBtn: {
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
