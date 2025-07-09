import React, { useCallback } from "react";
import { useData } from "providers/DataProvider";

import { Link, router, useFocusEffect, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import GroupItem from "@components/GroupItem";
import { useTheme } from "providers/ThemeProvider";
import { FlashList } from "@shopify/flash-list";
import { useHeader } from "providers/HeaderProvider";

const GroupScreen = () => {
  const { group } = useData();
  const { colors } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "app.tabs.group" });
  const rootNavigation = useNavigation("/");
  const { headerHeight, tabbarHeight } = useHeader();
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
          }), action: "group_graph", testId: "chart-group", disabled: true },
        ],
      });
    }, [])
  );
  return (
      <FlashList
        estimatedItemSize={78}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom:tabbarHeight+8, paddingTop: headerHeight + 8, backgroundColor: colors.screen }}
        data={group}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "addGroup",
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
  );
};

export default GroupScreen;
