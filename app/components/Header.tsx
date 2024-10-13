import { Pressable, StyleProp, StyleSheet, Text, useWindowDimensions, View, ViewStyle } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "providers/ThemeProvider";
import Icon from "./Icon";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useHeader } from "providers/HeaderProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackHeaderProps, NativeStackNavigationOptions } from "@react-navigation/native-stack";

export interface HeaderBtn {
  onPress: () => void;
  icon: string;
  label: string;
  disabled?: boolean;
}

interface Options extends NativeStackNavigationOptions {
  headerRightBtn?: HeaderBtn[];
}

interface Props extends NativeStackHeaderProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  options: Options;
}

const Header = ({ back, options: { title = "", headerRightBtn }, navigation }: Props) => {
  const { isHeaderVisible, showHeader } = useHeader();

  const { top: topInset } = useSafeAreaInsets();
  const top = useSharedValue(0);
  useEffect(() => {
    if (isHeaderVisible) top.value = withTiming(0);
    else top.value = withTiming(-100);
  }, [isHeaderVisible, topInset]);

  useEffect(() => {
    showHeader();
  }, [title]);
  const { width } = useWindowDimensions();

  const [titleContainerWidth, setTitleContainerWidth] = useState(1);
  const {
    colors,
    textStyle: { header },
  } = useTheme();

  const fontSize = useMemo(() => {
    if (title) {
      const calculated = titleContainerWidth / (0.7 * title.length);
      if (calculated < header.fontSize) return Math.floor(calculated);
    }
    return header.fontSize;
  }, [title, titleContainerWidth, header]);

  const titleWidth = useMemo(() => {
    //screen width - padding
    let w = width - 2 * 16;
    if (headerRightBtn && headerRightBtn.length > 0) {
      // Subtract  ColumnGap + (rightHeraderButtons * size) + hrightHeaderButton * columnGap
      w -= 16 + headerRightBtn.length * 64 + (headerRightBtn.length - 1) * 8;
    }
    if (back && back?.title) w -= 16 + 64;
    return w;
  }, [headerRightBtn, width, back]);

  return (
    <Animated.View style={[styles.headerContainer, { columnGap: 16, top }]}>
      {back?.title ? (
        <Pressable onPress={navigation.goBack}>
          <View style={[styles.headerActionBtn, { backgroundColor: colors.headerBackground }]}>
            <Icon name="back" size={24} color={colors.headerIconActive} />
          </View>
        </Pressable>
      ) : null}
      <View
        style={[styles.titleContianer, { backgroundColor: colors.headerBackground, width: titleWidth }]}
        onLayout={(event) => setTitleContainerWidth(event.nativeEvent.layout.width)}
      >
        <Text style={[header, { fontSize }]}>{title}</Text>
      </View>
      {headerRightBtn && headerRightBtn?.length > 0 && (
        <View style={{ flexDirection: "row", columnGap: 8 }}>
          {headerRightBtn.map((btn) => (
            <Pressable onPress={btn.onPress} disabled={btn.disabled === true} key={btn.label}>
              <View style={[styles.headerActionBtn, { backgroundColor: colors.headerBackground }]}>
                <Icon
                  name={btn.icon as undefined}
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
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    position: "absolute",
    zIndex: 10,
  },
  titleContianer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    height: 64,
    flexGrow: 1,
    justifyContent:"center"
  },
  headerActionBtn: {
    padding: 16,
    borderRadius: 8,
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
  },
});
