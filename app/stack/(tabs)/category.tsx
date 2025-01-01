import React, { useCallback, useEffect } from "react";
import { useData } from "providers/DataProvider";
import CategoryItem from "@components/CategoryItem";

import { StyleSheet, View } from "react-native";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
import { useHeader } from "providers/HeaderProvider";
import { useTranslation } from "react-i18next";

const AllCategory = () => {
  const { category } = useData();
  const router = useRouter();
  const { colors } = useTheme();
  const { setHeaderRightButtons, setHeaderTitle } = useHeader();
  const { t } = useTranslation("", { keyPrefix: "app.stack.tabs.category" });
  useFocusEffect(
    useCallback(() => {
      setHeaderRightButtons([
        {
          icon: "add",
          onPress: () => router.push("stack/addCategory"),
          action: "add_category",
          testId: "add-category",
        },
      ]);
      setHeaderTitle(t("title"));
    }, [])
  );

  return (
    <View style={{ backgroundColor: colors.screen, flex: 1 }}>
      <CollapsibleHeaderFlatList
        paddingVertical={8}
        contentContainerStyle={{ paddingHorizontal: 8 }}
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
