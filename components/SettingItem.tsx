import { Pressable, StyleSheet, View, ViewStyle, Text } from "react-native";
import { useTheme } from "providers/ThemeProvider";
import React, { ReactNode } from "react";
import Icon from "./Icon";

type Props = {
  label: string;
  leftIcon: string;
  rightIcon?: string;
  onPress?: () => void;
  children?: ReactNode;
  style?: ViewStyle;
  testId?: string;
};

const SettingItem = ({ leftIcon, onPress, children, rightIcon, label, testId, style }: Props) => {
  const {textStyle,colors} = useTheme();
  return (
      <Pressable onPress={onPress} android_ripple={{color: colors.rippleColor }} testID={testId}>
        <View style={styles.innerContainer}>
          <View style={styles.labelContainer}>
            <Icon name={leftIcon} size={26} />
            <Text style={[styles.itemLabel, textStyle.body]} testID={`${testId}-label`}>
              {label}
            </Text>
          </View>
          {children}
          {rightIcon && <Icon name={rightIcon} size={16} style={styles.rightIcon} />}
        </View>
      </Pressable>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  surface: {
    elevation: 2,
  },
  labelContainer: {
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  itemLabel: {
    marginHorizontal: 16,
  },
  rightIcon: {
    marginLeft: 5,
  },
});
