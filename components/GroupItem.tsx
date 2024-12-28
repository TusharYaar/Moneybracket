import { StyleSheet, View, ViewStyle, Text, Pressable } from "react-native";
import React, { forwardRef } from "react";
import { Group } from "types";
import { useTheme } from "../providers/ThemeProvider";
import Icon from "./Icon";
// import { useTranslation } from "react-i18next";

type Props = {
  item: Group;
  onPress?: (item: Group) => void;
  style?: ViewStyle;
  itemColor?: string;
};
const GroupItem = forwardRef<View, Props>(function GroupItem({ item, onPress, style, itemColor }, ref) {
  const { textStyle, colors } = useTheme();
  const color = itemColor ? itemColor : item.color;

  return (
    <View style={[styles.overflowContainer, { backgroundColor: color, borderRadius: 8 }, style]}>
      <Pressable style={styles.container} onPress={() => onPress ? onPress(item): {}} ref={ref}>
        <View style={styles.innerContainer}>
          <View style={[styles.iconContainer, { backgroundColor: color }]}>
            <Icon name={item.icon} size={40} />
          </View>
          <View style={[styles.content]}>
            <Text style={[textStyle.title, { color: colors.text }]}>{item.title}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
});

export default GroupItem;

const styles = StyleSheet.create({
  overflowContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  container: {
    borderRadius: 8,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  iconContainer: {
    padding: 8,
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    marginLeft: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
});
