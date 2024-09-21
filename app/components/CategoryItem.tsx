import { StyleSheet, View, ViewStyle,Text, Pressable } from "react-native";
import React from "react";
import { Category } from "types";
import Octicons from "@expo/vector-icons/Octicons";
import { useTheme } from "../providers/ThemeProvider";

type Props = {
  item: Category;
  onPress: (item: Category) => void;
  style?: ViewStyle;
  itemColor?: string;
};

const CategoryItem = ({ item, onPress, style, itemColor }: Props) => {
  const {
   textStyle
  } = useTheme();

  const categoryColor = itemColor ? itemColor : item.color;

  return (
    <View style={[styles.overflowContainer, { borderColor: categoryColor, borderRadius: 8 }, style]}>
      <Pressable style={styles.container} onPress={() => onPress(item)}>
        <View style={styles.innerContainer}>
          <View style={[styles.iconContainer, { backgroundColor: categoryColor }]}>
            <Octicons name={item.icon as undefined} size={40} />
          </View>
          <View style={[styles.content]}>
            <Text style={textStyle.title}>{item.title}</Text>
            <Text style={textStyle.body} >{item.type}</Text>
          </View>
        </View>
      </Pressable>
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
