import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useData } from "providers/DataProvider";
import { useRouter } from "expo-router";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import { useTheme } from "providers/ThemeProvider";
import { useHeader } from "providers/HeaderProvider";
import { useTranslation } from "react-i18next";

const AllRecurring = () => {
  const { category } = useData();
  const router = useRouter();
  const { colors } = useTheme();
  const { setHeaderRightButtons } = useHeader();
  // const { t } = useTranslation("", { keyPrefix: "app.stack.tabs.recurring" });

  useEffect(() => {
    setHeaderRightButtons([
      { icon: "add", onPress: () => router.push("stack/addRecurring"), action: "add_recurring", disabled: true },
    ]);
  }, []);

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
