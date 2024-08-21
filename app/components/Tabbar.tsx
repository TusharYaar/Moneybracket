import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useMemo } from "react";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const Tabbar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { width } = useWindowDimensions();
  const tabbarWidth = useMemo(() => width - 64, [width]);
  const tabActiveBgLeft = useSharedValue(0);

  return (
    <View
      style={[
        styles.tabbarContainer,
        {
          flexDirection: "row",
          width: tabbarWidth,
          borderRadius: tabbarWidth,
        },
      ]}
    >
      <Animated.View
        style={{
          height: 64,
          width: 64,
          backgroundColor: "green",
          position: "absolute",
          left: tabActiveBgLeft,
          borderRadius: 100,
        }}
      />
      <View style={[styles.tabsContainer, { borderRadius: tabbarWidth }]}>
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
              tabActiveBgLeft.value =  withSpring(index * 64, { damping: 40, mass: 6,stiffness: 200 });
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            console.log(route.key);
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabs]}
            >
              <AntDesign name="creditcard" size={32} color="black" />
            </Pressable>
          );
        })}
      </View>
      <Link href="/addTransaction" asChild>
        <Pressable style={[styles.addBtn]}>
          <AntDesign name="plus" size={32} color="black" />
        </Pressable>
      </Link>
    </View>
  );
};

export default Tabbar;

const styles = StyleSheet.create({
  tabbarContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    left: 32,
    bottom: 32,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabs: {
    padding: 16,
    borderRadius: 100,
    height: 64,
    width: 64,
  },
  addBtn: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
