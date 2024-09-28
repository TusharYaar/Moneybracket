import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
import Icon from "./Icon";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useHeader } from "providers/HeaderProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

interface Props extends NativeStackHeaderProps {
  title?: string;
  hideBackButton?: boolean;
  headerBtns?: {
    onPress: () => void;
    icon: string;
    label: string;
    disabled?: boolean;
  }[];
  style?: StyleProp<ViewStyle>;
}

const Header = ({ title = "", hideBackButton = false, headerBtns = [], back, options, route,navigation }: Props) => {
  // const {back, canGoBack} = useRouter();
  // console.log(route);
  // console.log(navigation);
  const { isHeaderVisible, showHeader } = useHeader();
  useEffect(() => {
    showHeader();
  },[
    options
  ]);

  const {colors ,textStyle: {header}} = useTheme();
  const {top: topInset} = useSafeAreaInsets();
  const top = useSharedValue(0);
  useEffect(() => {
    if (isHeaderVisible) top.value = withTiming(0);
    else top.value = withTiming(-100);
  }, [isHeaderVisible, topInset]);
    return (
    <Animated.View style={[styles.headerContainer, { columnGap: 16, top}]}>
      {back?.title && !hideBackButton ? (
        <Pressable onPress={navigation.goBack}>
          <View style={[styles.headerActionBtn, {backgroundColor: colors.headerBackground }]}>
            <Icon name="back" size={24} color={colors.headerIconActive} />
          </View>
        </Pressable>
      ) : null}
      <View style={[styles.titleContianer,{backgroundColor: colors.headerBackground }]}>
        <Text style={[header]}>{options.title}</Text>
      </View>
      {headerBtns.length > 0 && (
        <View style={{ flexDirection: "row", columnGap: 8 }}>
          {headerBtns.map((btn) => (
            <Pressable onPress={btn.onPress} disabled={btn.disabled === true} key={btn.label}>
              <View style={[styles.headerActionBtn,{backgroundColor: colors.headerBackground }]}>
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
