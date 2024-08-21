import React from "react";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { TabParamList } from "../../../navigators/TabNavigators";
import { useData } from "../../../providers/DataProvider";
import CategoryItem from "../../../components/CategoryItem";

import { StyleSheet, View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { IconButton } from "react-native-paper";
import { Link } from "expo-router";

type Props = MaterialTopTabScreenProps<TabParamList, "AllCategoryScreen">;

const AllCategory = ({}: Props) => {
  const { category } = useData();

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <Text style={{ fontSize: 18, flexGrow: 1 }}>Category</Text>
        <Link asChild href="addCategory">
          <IconButton icon="add" size={20} />
        </Link>
        <Link asChild href="settings">
          <IconButton icon="camera" size={20} />
        </Link>
      </View>

      <FlashList
        contentContainerStyle={{padding: 16, paddingTop: 50}}
        data={category}
        renderItem={({ item }) => (
          <CategoryItem item={item} onPress={() => console.log(item)} style={styles.category} />
        )}
        estimatedItemSize={78}
      />
    </>
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
