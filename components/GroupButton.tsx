import { StyleSheet, View, PressableProps, Pressable, StyleProp, ViewStyle } from "react-native";
import React, { useEffect } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "providers/ThemeProvider";
import Icon from "./Icon";

interface ButtonProps extends Omit<PressableProps, "children"> {
  icon: string;
  label?: string;
  type?: "outline" | "filled";
}

type Props = {
  buttons: ButtonProps[];
  style?: StyleProp<ViewStyle>;
  activeColor: string;
  testId?: string;
};

const GroupButton = ({ buttons, style, activeColor, testId }: Props) => {
  const {colors}= useTheme();
  const backgroundColor = useSharedValue(activeColor ? activeColor : colors.headerIconActive);


  useEffect(() => {
    backgroundColor.value = withTiming(activeColor);
  }, [activeColor]);

  return (
    <View style={[styles.container, style]} testID={testId}>
      {buttons.map(({ icon, style, type = "filled", ...btn }, index) => (
        <Pressable style={{ flexGrow: 1 }} key={icon} {...btn}>
          <Animated.View
            style={[
              styles.btn,
              {
                backgroundColor: type === "filled" ? backgroundColor : colors.sectionBackground,
                borderTopLeftRadius: index === 0 ? 4 : 0,
                borderBottomLeftRadius: index === 0 ? 4 : 0,
                borderTopRightRadius: index === buttons.length - 1 ? 4 : 0,
                borderBottomRightRadius: index === buttons.length - 1 ? 4 : 0,
              },
            ]}
          >
            <Icon name={icon} size={40} />
          </Animated.View>
        </Pressable>
      ))}
    </View>
  );
};

export default GroupButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    padding: 8,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
