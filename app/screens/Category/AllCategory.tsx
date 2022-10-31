import React from "react";

import {MaterialTopTabScreenProps} from "@react-navigation/material-top-tabs";
import {TabParamList} from "../../navigators/TabNavigators";
import {useData} from "../../providers/DataProvider";
import CategoryItem from "../../components/CategoryItem";

import {FlatList, StyleSheet, View} from "react-native";
import {Paragraph} from "react-native-paper";

type Props = MaterialTopTabScreenProps<TabParamList, "AllCategoryScreen">;

const AllCategory = ({}: Props) => {
  const {showAddCategoryModal} = useData();
  const {category} = useData();

  if (category.length === 0) {
    return (
      <View style={styles.screen}>
        <Paragraph>No Category Added</Paragraph>
      </View>
    );
  }

  return (
    <FlatList
      data={category}
      renderItem={({item}) => (
        <CategoryItem item={item} onPress={() => showAddCategoryModal(item)} />
      )}
    />
  );
};

export default AllCategory;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
});
