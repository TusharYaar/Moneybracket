import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useData } from "providers/DataProvider";
import { useRouter } from "expo-router";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";

const AllRecurring = () => {
  const { category } = useData();
  const router = useRouter();

  return (
    <CollapsibleHeaderFlatList
      title="Recurring"
      hideBackButton={true}
      paddingTop={8}
      contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 112 }}
      data={category}
      renderItem={({ item }) => <View />}
      headerBtns={[{ icon: "plus", onPress: () => router.push("addShortcut") , label: "add_shortcut" ,disabled: true }]}
      // estimatedItemSize={76}
    />
  );

};

export default AllRecurring;

const styles = StyleSheet.create({});
