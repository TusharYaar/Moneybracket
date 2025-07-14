import React, { useCallback } from "react";
import { useData } from "providers/DataProvider";
import CategoryItem from "@components/CategoryItem";

import { StyleSheet, Text, View } from "react-native";
import { Link, useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import { useHeader } from "providers/HeaderProvider";

const AllCategory = () => {
  const { category } = useData();
  const router = useRouter();
  const { colors, textStyle } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "app.tabs.category" });
  const rootNavigation = useNavigation("/");
  const { headerHeight, tabbarHeight } = useHeader();

  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({
        title: t("title"),
        headerRightBtn: [
          { icon: "add", onPress: () => router.push("addCategory"), action: "add_category", testId: "add-category" },
          {
            icon: "graph", onPress: () => router.push({
              pathname: "graph",
              params: {
                type: "category",
              },
            }), action: "category_graph", testId: "chart-category", disabled: true
          },
        ],
      });
    }, [])
  );
  return (
    <FlashList
      estimatedItemSize={78}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: tabbarHeight + 8, paddingTop: headerHeight + 8, backgroundColor: colors.screen, }}
      data={category}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: "listTransactions",
            params: {
              title: item.title,
              _id: item._id,
              color: item.color,
              type: "category",
            },
          }}
          asChild
        >
          <CategoryItem item={item} style={styles.category} />
        </Link>
      )}
      ListEmptyComponent={
        <Text style={textStyle.bodyBold}>{t("noCategory")}</Text>
      }
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
    marginBottom: 8,
  },
});
