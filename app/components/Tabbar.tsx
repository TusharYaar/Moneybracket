import { Platform, Pressable, StyleSheet, ToastAndroid, useWindowDimensions, View } from "react-native";
import React, { useMemo } from "react";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Link } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";

interface Props extends BottomTabBarProps {
  icons: Record<string, string>;
  visibleTabs: string[];
}

const Tabbar = ({ state, descriptors, navigation, icons, visibleTabs }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <View
      style={
        styles.tabbarContainer
      }
    >
      <View style={{flexDirection: "row", justifyContent: "space-between", flexGrow: 1,}}>

      <View style={[styles.tabsContainer, { borderRadius: 8 }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
          
          const onLongPress = () => {
            if (Platform.OS === "android") ToastAndroid.show(route.name, ToastAndroid.SHORT);
          };
          
          if (visibleTabs.includes(route.name))
            return (
          <Pressable
          key={route.key}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          >
                <View style={[styles.tabs]}>
                  <Octicons name={icons[route.name] as undefined} size={32} color={isFocused ? "#e63946" : "#a8dadc"} />
                </View>
              </Pressable>
            );
          })}
      </View>
      <Link href="/addTransaction" asChild>
        <Pressable>
          <View style={styles.addBtn}>
            <Octicons name="plus" size={32} color="#e63946" />
          </View>
        </Pressable>
      </Link>
</View>
    </View>
  );
};

export default Tabbar;

const styles = StyleSheet.create({
  tabbarContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#010a19",
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
    backgroundColor: "#a8dadc",
  },
});
