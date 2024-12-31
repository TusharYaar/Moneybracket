import { StyleSheet, View, PressableProps, Pressable, StyleProp, ViewStyle } from "react-native";
import React, { useEffect } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "providers/ThemeProvider";
import Icon from "./Icon";

interface ButtonProps extends Omit<PressableProps, "children" | "style"> {
  icon: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
  id: string;
}

type Props = {
  buttons: ButtonProps[];
  style?: StyleProp<ViewStyle>;
  activeColor: string;
  selected: ButtonProps["id"];
};

const GroupButton = ({ buttons, style, selected, activeColor }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style, {borderColor: activeColor}]}>
      {buttons.map((btn) => (
        <Button {...btn} color={selected === btn.id ? activeColor : colors.screen} key={btn.id} />
      ))}
    </View>
  );
};

export default GroupButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
    overflow: "hidden",
    padding: 4,
    borderWidth: 2,
    columnGap: 4
  },
  btn: {
    borderRadius: 4,
    padding: 8,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface InternalButtonProps extends ButtonProps {
  color: string;
}

const Button = ({ icon, color, id, ...btn }: InternalButtonProps) => {
  const bgcol = useSharedValue(color);

  useEffect(() => {
    bgcol.value = withTiming(color);
  }, [color]);
  return (
    <Pressable style={{ flexGrow: 1 }} {...btn}>
      <Animated.View
        style={[
          styles.btn,
          {
            backgroundColor: bgcol,
          },
        ]}
      >
        <Icon name={icon} size={40} />
      </Animated.View>
    </Pressable>
  );
};
