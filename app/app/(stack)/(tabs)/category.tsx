import React from "react";
import { useData } from "providers/DataProvider";
import CategoryItem from "@components/CategoryItem";

import { StyleSheet } from "react-native";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import { useRouter } from "expo-router";
import { useTheme } from "providers/ThemeProvider";

const AllCategory = () => {
  const { category } = useData();
  const router = useRouter();
  const {colors} = useTheme();

  return (
    <CollapsibleHeaderFlatList
      title="Category"
      paddingTop={8}
      hideBackButton={true}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 112 }}
      data={category}
      renderItem={({ item }) => (
        <CategoryItem item={item} onPress={() => router.push(`addCategory?_id=${item._id}&title=${item.title}&color=${item.color.replace("#", "")}&type=${item.type}`)} style={styles.category} />
      )}
      headerBtns={[{ icon: "plus", onPress: () => router.push("addCategory"), label: "add_category" }]}
      // estimatedItemSize={76}
      style={{backgroundColor: colors.screen}}
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
    marginVertical: 8,
  },
});
