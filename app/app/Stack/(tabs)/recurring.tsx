import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { useData } from "providers/DataProvider";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import { useTheme } from "providers/ThemeProvider";
import { useHeader } from "providers/HeaderProvider";
import { useTranslation } from "react-i18next";

const AllRecurring = () => {
  const { category } = useData();
  const router = useRouter();
  const { colors } = useTheme();
  const { showTabbar } = useHeader();
  const { t } = useTranslation("", { keyPrefix: "app.stack.tabs.recurring" });

  const navigation = useNavigation("/Stack");
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: t("title"),
        headerRightBtn: [{ icon: "add", onPress: () => router.push("Stack/addCategory"), label: "add_category" }],
      });
      showTabbar();
    }, [])
  );

  return (
    <View style={{ backgroundColor: colors.screen, flex: 1 }}>
      <CollapsibleHeaderFlatList
        title="Recurring"
        hideBackButton={true}
        paddingTop={8}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 112 }}
        data={category}
        renderItem={({ item }) => <View />}
        headerBtns={[
          { icon: "plus", onPress: () => router.push("addShortcut"), label: "add_shortcut", disabled: true },
        ]}
        // estimatedItemSize={76}
      />
    </View>
  );
};

export default AllRecurring;

const styles = StyleSheet.create({});
