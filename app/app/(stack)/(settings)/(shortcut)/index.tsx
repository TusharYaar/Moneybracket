import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FAB } from "react-native-paper";
import { useSchortcut } from "../../../../providers/ShortcutProvider";
import { FlashList } from "@shopify/flash-list";
import ShortcutItem from "../../../../components/ShortcutItem";
import NoDataSVG from "../../../../components/SVGs/NoDataSVG";

const ShortcutScreen = () => {
  const { shortcut, showAddShortcutModal } = useSchortcut();

  return (
    <View style={styles.screen}>
      {shortcut.length === 0 ? (
        <NoDataSVG message="No Shortcuts Created" />
      ) : (
        <FlashList
          data={shortcut}
          extraData={shortcut}
          contentContainerStyle={{ padding: 8 }}
          renderItem={({ item }) => <ShortcutItem data={item} onPress={() => showAddShortcutModal(item)} />}
          estimatedItemSize={59}
        />
      )}
      <FAB style={styles.fab} icon="add" onPress={() => showAddShortcutModal()} />
    </View>
  );
};

export default ShortcutScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  screen: {
    flex: 1,
  },
});
