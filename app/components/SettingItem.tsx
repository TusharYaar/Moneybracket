import { Pressable, StyleSheet, View, ViewStyle, Text } from "react-native";
import React, { ReactNode } from "react";
// import Icon from "react-native-vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";

type Props = {
  label: string;
  leftIcon: string;
  rightIcon?: string;
  onPress?: () => void;
  children?: ReactNode;
  style?: ViewStyle;
};

const SettingItem = ({ leftIcon, onPress, children, rightIcon, label, style }: Props) => {
  return (
      <Pressable onPress={onPress}>
        <View style={styles.innerContainer}>
          <View style={styles.labelContainer}>
            <Octicons name={leftIcon as undefined} size={26} />
            <Text style={[styles.itemLabel]}>
              {label}
            </Text>
          </View>
          {children}
          {rightIcon && <Octicons name={rightIcon as undefined} size={16} style={styles.rightIcon} />}
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
    marginHorizontal: 5,
  },
  rightIcon: {
    marginLeft: 5,
  },
});
