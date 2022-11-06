import {StyleSheet, View, ViewStyle} from "react-native";
import React from "react";
import {Category} from "../realm/Category";
import {Paragraph, Subheading, TouchableRipple} from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  item: Category;
  onPress: (item: Category) => void;
  style?: ViewStyle;
};

const CategoryItem = ({item, onPress, style}: Props) => {
  return (
    <View style={[styles.overflowContainer, {borderColor: item.color}, style]}>
      <TouchableRipple style={styles.container} onPress={() => onPress(item)}>
        <View style={styles.innerContainer}>
          <View style={[styles.iconContainer, {backgroundColor: item.color}]}>
            <Icon name={item.icon} size={40} />
          </View>
          <View style={[styles.content]}>
            <Subheading>{item.title}</Subheading>
            <Paragraph>{item.type}</Paragraph>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  overflowContainer: {
    borderRadius: 16,
    borderWidth: 2,
    overflow: "hidden",
  },
  container: {
    borderRadius: 16,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
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
