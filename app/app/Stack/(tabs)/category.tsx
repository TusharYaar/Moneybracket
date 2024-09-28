import React, { useCallback} from "react";
import { useData } from "providers/DataProvider";
import CategoryItem from "@components/CategoryItem";

import { StyleSheet, View } from "react-native";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
import { useHeader } from "providers/HeaderProvider";

const AllCategory = () => {
  const { category } = useData();
  const router = useRouter();
  const {colors} = useTheme();
  const {showTabbar} = useHeader();

  const navigation = useNavigation("/Stack");
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({title: "category"});
      showTabbar();
    }, [])
  );
  // useEffect(() => {
  // },[navigation]);

  return (
  <View style={{backgroundColor: colors.screen, flex: 1}}>
    <CollapsibleHeaderFlatList
    title="Category"
    paddingTop={8}
    hideBackButton={true}
    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 112}}
    data={category}
    renderItem={({ item }) => (
      <CategoryItem item={item} onPress={() => router.push(`Stack/addCategory?_id=${item._id}&title=${item.title}&color=${item.color.replace("#", "")}&type=${item.type}`)} style={styles.category} />
    )}
    headerBtns={[{ icon: "plus", onPress: () => router.push("Stack/addCategory"), label: "add_category" }]}
    />
    </View>
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
