import {StyleSheet, View} from "react-native";
import React, {ReactNode} from "react";

import {Surface, TouchableRipple, Text} from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";
import {useCustomTheme} from "../themes";

type Props = {
  label: string;
  leftIcon: string;
  rightIcon?: string;
  onPress?: () => void;
  children?: ReactNode;
};

const SettingItem = ({
  leftIcon,
  onPress,
  children,
  rightIcon,
  label,
}: Props) => {
  const {theme} = useCustomTheme();
  return (
    <Surface style={styles.surface}>
      <TouchableRipple onPress={onPress}>
        <View style={styles.innerContainer}>
          <View style={styles.labelContainer}>
            <Icon name={leftIcon} size={26} />
            <Text style={[styles.itemLabel]}>{label}</Text>
          </View>
          {children}
          {rightIcon && (
            <Icon name={rightIcon} size={16} style={styles.rightIcon} />
          )}
        </View>
      </TouchableRipple>
    </Surface>
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
