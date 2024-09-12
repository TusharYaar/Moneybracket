import React from "react";
import { useData } from "../../../providers/DataProvider";
import CategoryItem from "../../../components/CategoryItem";

import { StyleSheet } from "react-native";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import { useRouter } from "expo-router";

const AllCategory = () => {
  const { category } = useData();
  const router = useRouter();

  return (
    <CollapsibleHeaderFlatList
      title="Category"
      paddingTop={8}
      contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 112 }}
      data={category}
      renderItem={({ item }) => <CategoryItem item={item} onPress={() => console.log(item)} style={styles.category} />}
      headerBtns={[{ icon: "plus", onPress: () => router.push("addCategory") , label: "add_category" }]}
      // estimatedItemSize={76}
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
