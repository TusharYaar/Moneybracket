import React, { useCallback } from "react";
import { useData } from "providers/DataProvider";

import { View } from "react-native";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { useHeader } from "providers/HeaderProvider";
import { useTranslation } from "react-i18next";
import GroupItem from "@components/GroupItem";
import { useTheme } from "providers/ThemeProvider";

const GroupScreen = () => {
  const { group } = useData();
  const router = useRouter();
  const { colors } = useTheme();
  const { setHeaderRightButtons, setHeaderTitle } = useHeader();
  const { t } = useTranslation("", { keyPrefix: "app.stack.tabs.group" });
  useFocusEffect(
    useCallback(() => {
      setHeaderRightButtons(
        [
          { icon: "add", onPress: () => router.push("stack/addGroup"), action: "add_group", testId: "add-group" },
          { icon: "graph", onPress: () => router.push("stack/addGroup"), action: "add_group", testId: "chart-group" },
        ].filter((a) => (__DEV__ ? true : a.icon !== "graph"))
      );
      setHeaderTitle(t("title"));
    }, [setHeaderRightButtons])
  );

  return (
    <View style={{ backgroundColor: colors.screen, flex: 1 }}>
      <CollapsibleHeaderFlatList
        paddingVertical={8}
        hideBackButton={true}
        contentContainerStyle={{ paddingHorizontal: 16 }}
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
