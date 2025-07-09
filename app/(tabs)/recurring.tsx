import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import { useHeader } from "providers/HeaderProvider";

const AllRecurring = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "app.tabs.recurring" });
  const rootNavigation = useNavigation("/");
  const { headerHeight, tabbarHeight } = useHeader();
  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({
        title: t("title"), headerRightBtn: [
          { icon: "add", onPress: () => router.push("addRecurring"), action: "add_recurring", testId: "add-recurring" },
        ]
      });
    }, [])
  );



  return (
    <FlashList
      estimatedItemSize={78}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: tabbarHeight + 8, paddingTop: headerHeight + 8, backgroundColor: colors.screen }}
      data={[]}
      renderItem={({ item }) => <View />}
    />
  );
};

export default AllRecurring;

const styles = StyleSheet.create({});
