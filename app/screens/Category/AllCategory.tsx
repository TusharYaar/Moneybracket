import React from "react";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { TabParamList } from "../../navigators/TabNavigators";
import { useData } from "../../providers/DataProvider";
import CategoryItem from "../../components/CategoryItem";

import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";

type Props = MaterialTopTabScreenProps<TabParamList, "AllCategoryScreen">;

const AllCategory = ({}: Props) => {
  const { showAddCategoryModal } = useData();
  const { category } = useData();

  if (category.length === 0) {
    return (
      <View style={styles.screen}>
        <Text>No Category Added</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={category}
      renderItem={({ item }) => (
        <CategoryItem item={item} onPress={() => showAddCategoryModal(item)} style={styles.category} />
      )}
      estimatedItemSize={78}
    />
  );
};

export default AllCategory;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 8,
  },
  category: {
    margin: 8,
  },
});
