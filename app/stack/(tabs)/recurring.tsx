import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
// import { useData } from "providers/DataProvider";
import { useFocusEffect, useRouter } from "expo-router";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import { useTheme } from "providers/ThemeProvider";
import { useHeader } from "providers/HeaderProvider";
import { useTranslation } from "react-i18next";

const AllRecurring = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { setHeaderRightButtons, setHeaderTitle } = useHeader();
  const { t } = useTranslation("", { keyPrefix: "app.stack.tabs.recurring" });

  useFocusEffect(useCallback (() => {
    setHeaderRightButtons([
      { icon: "add", onPress: () => router.push("stack/addRecurring"), action: "add_recurring", disabled: true },
    ]);
    setHeaderTitle( t("title") );
  }, [setHeaderTitle, setHeaderRightButtons])
)

  return (
    <View style={{ backgroundColor: colors.screen, flex: 1 }}>
      <CollapsibleHeaderFlatList
        paddingVertical={8}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        data={[]}
        renderItem={({ item }) => <View />}
        // estimatedItemSize={76}
      />
    </View>
  );
};

export default AllRecurring;

const styles = StyleSheet.create({});
