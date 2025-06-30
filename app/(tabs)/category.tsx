import React, { useCallback } from "react";
import { useData } from "providers/DataProvider";
import CategoryItem from "@components/CategoryItem";

import { StyleSheet, View } from "react-native";
import { Link, useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";

const AllCategory = () => {
  const { category } = useData();
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "app.stack.tabs.category" });
  const rootNavigation = useNavigation("/");

  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({
        title: t("title"),
        headerRightBtn: [
          { icon: "add", onPress: () => router.push("addCategory"), action: "add_category", testId: "add-category" },
          { icon: "graph", onPress: () => router.push({
            pathname: "graph",
            params: {
              type: "category",
            },
          }), action: "category_graph", testId: "chart-category" },
        ],
      });
    }, [])
  );
  return (
    <View style={{ backgroundColor: colors.screen, flex: 1 }}>
      <FlashList
        estimatedItemSize={78}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 8 }}
        data={category}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "stack/addCategory",
              params: {
                title: item.title,
                _id: item._id,
                color: item.color,
                type: item.type,
              },
            }}
            asChild
          >
            <CategoryItem item={item} style={styles.category} />
          </Link>
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
    marginBottom: 8,
  },
});
