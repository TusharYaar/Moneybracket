import {StyleSheet, View} from "react-native";
import React from "react";
import {Category} from "../realm/Category";
import {Paragraph, Subheading, TouchableRipple} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  item: Category;
  onPress: (item: Category) => void;
};

const CategoryItem = ({item, onPress}: Props) => {
  return (
    <TouchableRipple
      style={[styles.container, {borderColor: item.color}]}
      onPress={() => onPress(item)}>
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
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 7,
    borderWidth: 2,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    padding: 10,
  },
  content: {
    marginLeft: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
});
