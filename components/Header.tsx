import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "providers/ThemeProvider";
import Icon from "./Icon";
import { router } from "expo-router";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeaderRightButton } from "types";
import { useHeader } from "providers/HeaderProvider";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

interface HeaderProps extends NativeStackHeaderProps {
  options: NativeStackHeaderProps["options"] & {
    headerRightBtn?: HeaderRightButton[];
  };
}

const Header = ({ options, back, route }: HeaderProps) => {
  const {
    colors,
    textStyle: { title },
  } = useTheme();
  const { top } = useSafeAreaInsets();
  const { isHeaderVisible } = useHeader();
  const fontSize = 20;

  const animatedStyle = useAnimatedStyle(() => ({
    top: withTiming(isHeaderVisible ? top : -(top + 56), { duration: 100 }),
  }));

  return (
    <Animated.View style={[styles.headerContainer, animatedStyle]}>
      {back ? (
        <Pressable onPress={() => router.dismiss()} testID="page-back">
          <View style={[styles.headerActionBtn, { backgroundColor: colors.headerBackground }]}>
            <Icon name="back" size={24} color={colors.headerIconActive} />
          </View>
        </Pressable>
      ) : null}
      <View style={[styles.titleContianer, { backgroundColor: colors.headerBackground }]}>
        <Text style={[title, { color: colors.headerText }]} testID="header-title">
          {options.title ? options.title : route.name}
        </Text>
      </View>
      {options.headerRightBtn && options.headerRightBtn?.length > 0 && (
        <View style={{ flexDirection: "row", columnGap: 8 }}>
          {options.headerRightBtn.map((btn) => (
            <Pressable onPress={btn.onPress} disabled={btn.disabled === true} key={btn.icon} testID={btn.testId}>
              <View style={[styles.headerActionBtn, { backgroundColor: colors.headerBackground }]}>
                <Icon
                  name={btn.icon}
                  size={24}
                  color={btn.disabled === true ? colors.headerIconDisabled : colors.headerIconActive}
                />
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    position: "absolute",
    left: 0,
    right: 0,
    columnGap: 16,
    zIndex: 10,
  },
  titleContianer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    height: 56,
    flexGrow: 1,
    justifyContent: "center",
  },
  headerActionBtn: {
    padding: 16,
    borderRadius: 8,
    height: 56,
    width: 56,
    alignItems: "center",
    justifyContent: "center",
  },
});
