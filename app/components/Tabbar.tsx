import { Platform, Pressable, StyleSheet, ToastAndroid, View } from "react-native";
import React, { useEffect } from "react";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Link } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
import { useHeader } from "providers/HeaderProvider";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import Icon from "./Icon";

interface Props extends BottomTabBarProps {
  icons: Record<string, string>;
  visibleTabs: string[];
}

const Tabbar = ({ state, descriptors, navigation, icons, visibleTabs }: Props) => {
  const { colors } = useTheme();
  // const { } = useRouter

  const bottom = useSharedValue(16);
  const { isTabbarVisible } = useHeader();
  useEffect(() => {
    if (isTabbarVisible) bottom.value = withTiming(16);
    else bottom.value = withTiming(-100);
  }, [isTabbarVisible]);

  return (
    <Animated.View style={[styles.tabbarContainer, { bottom }]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", flexGrow: 1 }}>
        <View style={[styles.tabsContainer, { borderRadius: 8, backgroundColor: colors.tabbarBackground }]}>
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
                    <Icon
                      name={icons[route.name]}
                      size={32}
                      color={isFocused ? colors.tabbarIconActive : colors.tabbarIcon}
                    />
                  </View>
                </Pressable>
              );
          })}
        </View>
        <Link href="Stack/addTransaction" asChild>
          <Pressable>
            <View style={[styles.addBtn, { backgroundColor: colors.tabbarBackgroundSecondary }]}>
              <Icon name="add" size={32} color={colors.tabbarIconActiveSecondary} />
            </View>
          </Pressable>
        </Link>
      </View>
    </Animated.View>
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
