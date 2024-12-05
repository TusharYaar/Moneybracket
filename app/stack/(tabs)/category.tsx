import React, { useCallback, useEffect } from "react";
import { useData } from "providers/DataProvider";
import CategoryItem from "@components/CategoryItem";

import { StyleSheet, View } from "react-native";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import { useFocusEffect, useRouter } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
import { useHeader } from "providers/HeaderProvider";
import { useTranslation } from "react-i18next";

const AllCategory = () => {
  const { category } = useData();
  const router = useRouter();
  const { colors } = useTheme();
  const { setHeaderRightButtons } = useHeader();
  const { t } = useTranslation("", { keyPrefix: "app.stack.tabs.category" });
  useFocusEffect(
    useCallback(() => {
      setHeaderRightButtons([{ icon: "add", onPress: () => router.push("stack/addCategory"), action: "add_category" }]);
    }, [])
  );

  return (
    <View style={{ backgroundColor: colors.screen, flex: 1 }}>
      <CollapsibleHeaderFlatList
        paddingVertical={8}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={category}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            onPress={() =>
              router.push(
                `stack/addCategory?_id=${item._id}&title=${item.title}&color=${
                  item.color ? item.color.replace("#", "") : "345678"
                }&type=${item.type}`
              )
            }
            style={styles.category}
          />
        )}
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
