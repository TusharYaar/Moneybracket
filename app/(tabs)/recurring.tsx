import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";

const AllRecurring = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "app.stack.tabs.recurring" });
  const rootNavigation = useNavigation("/");

  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({ title: t("title"), headerRightBtn: [
        { icon: "add", onPress: () => router.push("addRecurring"), action: "add_recurring", testId: "add-recurring" },
      ] });    
    }, [])
  );



  return (
    <View style={{ backgroundColor: colors.screen, flex: 1 }}>
      <FlashList
        estimatedItemSize={78}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 8 }}
        data={[]}
        renderItem={({ item }) => <View />}
      />
    </View>
  );
};

export default AllRecurring;

const styles = StyleSheet.create({});
