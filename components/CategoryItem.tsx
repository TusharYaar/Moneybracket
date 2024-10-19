import { StyleSheet, View, ViewStyle,Text, Pressable } from "react-native";
import React from "react";
import { Category } from "types";
import { useTheme } from "../providers/ThemeProvider";
import Icon from "./Icon";
import { useTranslation } from "react-i18next";

type Props = {
  item: Category;
  onPress: (item: Category) => void;
  style?: ViewStyle;
  itemColor?: string;
};

const CategoryItem = ({ item, onPress, style, itemColor }: Props) => {
  const {
   textStyle,colors
  } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "components.categoryItem" });

  const categoryColor = itemColor ? itemColor : item.color;

  return (
    <View style={[styles.overflowContainer, { borderColor: categoryColor, borderRadius: 8 }, style]}>
      <Pressable style={styles.container} onPress={() => onPress(item)}>
        <View style={styles.innerContainer}>
          <View style={[styles.iconContainer, { backgroundColor: categoryColor }]}>
            <Icon name={item.icon as undefined} size={40} />
          </View>
          <View style={[styles.content]}>
            <Text style={[textStyle.title, {color: colors.text}]}>{item.title}</Text>
            <Text style={[textStyle.body, {color: colors.text}]} >{t(item.type)}</Text>
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
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent:"center"
  },
  content: {
    marginLeft: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
});
