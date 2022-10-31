import {StyleSheet, View} from "react-native";
import React from "react";
import {Category} from "../realm/Category";
import {Caption, Paragraph, TouchableRipple} from "react-native-paper";

type Props = {
  item: Category;
  onPress: (item: Category) => void;
  // onLongPress: (item: Category) => void;
};

const CategoryItem = ({item, onPress}: Props) => {
  return (
    <TouchableRipple
      style={[styles.container, {backgroundColor: item.color}]}
      onPress={() => onPress(item)}>
      <View style={styles.innerContainer}>
        <Paragraph>{item.title}</Paragraph>
        <Caption>{item.type}</Caption>
      </View>
    </TouchableRipple>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 7,
  },
  innerContainer: {
    padding: 10,
  },
});
