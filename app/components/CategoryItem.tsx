import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { Category } from "../realm/Category";
import { Paragraph, Subheading, TouchableRipple } from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  item: Category;
  onPress: (item: Category) => void;
  style?: ViewStyle;
};

const CategoryItem = ({ item, onPress, style }: Props) => {
  return (
    <TouchableRipple
      style={[styles.container, { borderColor: item.color }, style]}
      onPress={() => onPress(item)}>
      <View style={styles.innerContainer}>
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Icon name={item.icon} size={40} />
        </View>
        <View style={[styles.content]}>
          <Subheading>{item.title}</Subheading>
          <Paragraph>{item.type}</Paragraph>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 2,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,

  },
  iconContainer: {
    padding: 8,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  content: {
    marginLeft: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
});
