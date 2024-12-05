import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useTheme } from "providers/ThemeProvider";

import Icon from "./Icon";
import { Route } from "@react-navigation/native";

interface Props {
  visibleTabs: string[];
  current: Route<any>;
}

const ICONS = {
  "(tabs)/transaction": "transactionTab",
  "(tabs)/category": "categoryTab",
  "(tabs)/recurring": "recurringTab",
  "(tabs)/settings": "settingTab",
};

const Tabbar = ({ visibleTabs, current }: Props) => {
  const { colors } = useTheme();
  return (
    <View style={styles.tabbarContainer}>
      <View style={[styles.tabsContainer, { borderRadius: 8, backgroundColor: colors.tabbarBackground }]}>

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
  tabbarContainer: {
    flexDirection: "row", justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
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
