import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { Category } from "../realm/Category";
import { Text, TouchableRipple } from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";
import { useCustomTheme } from "../providers/ThemeProvider";

type Props = {
  item: Category;
  onPress: (item: Category) => void;
  style?: ViewStyle;
  itemColor?: string;
};

const CategoryItem = ({ item, onPress, style, itemColor }: Props) => {
  const {
    theme: { roundness },
  } = useCustomTheme();

  const categoryColor = itemColor ? itemColor : item.color;

  return (
    <View style={[styles.overflowContainer, { borderColor: categoryColor, borderRadius: roundness * 4 }, style]}>
      <TouchableRipple style={styles.container} onPress={() => onPress(item)}>
        <View style={styles.innerContainer}>
          <View style={[styles.iconContainer, { backgroundColor: categoryColor }]}>
            <Icon name={item.icon} size={40} />
          </View>
          <View style={[styles.content]}>
            <Text variant="titleMedium">{item.title}</Text>
            <Text variant="bodySmall">{item.type}</Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  overflowContainer: {
    borderRadius: 8,
    borderWidth: 2,
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
  },
  content: {
    marginLeft: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
});
