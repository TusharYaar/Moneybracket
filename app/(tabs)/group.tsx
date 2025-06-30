import React, { useCallback } from "react";
import { useData } from "providers/DataProvider";

import { View } from "react-native";
import { Link, router, useFocusEffect, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import GroupItem from "@components/GroupItem";
import { useTheme } from "providers/ThemeProvider";
import { FlashList } from "@shopify/flash-list";

const GroupScreen = () => {
  const { group } = useData();
  const { colors } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "app.stack.tabs.group" });
  const rootNavigation = useNavigation("/");
  
  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({
        title: t("title"),
        headerRightBtn: [
          { icon: "add", onPress: () => router.push("addGroup"), action: "add_group", testId: "add-group" },
          { icon: "graph", onPress: () => router.push({
            pathname: "graph",
            params: {
              type: "group",
            },
          }), action: "group_graph", testId: "chart-group" },
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
        data={group}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "stack/addGroup",
              params: {
                _id: item._id,
                color: item.color,
                title: item.title,
              },
            }}
            asChild
          >
            <GroupItem item={item} style={{ marginBottom: 8 }} />
          </Link>
        )}
      />
    </View>
  );
};

export default GroupScreen;
