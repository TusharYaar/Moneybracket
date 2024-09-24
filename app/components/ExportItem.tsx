import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import Octicons from "@expo/vector-icons/Octicons";


const ExportItem = ({ item, onPress }: { item: string; onPress: () => void }) => {
  const icon = useMemo(() => {
    const type = item.split(".");
    switch (type[type.length - 1]) {
      case "json":
        return "number";
      case "pdf":
        return "number";
      default:
        return "number";
    }
  }, [item]);

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Octicons name={icon as undefined} size={36} />
        <Text style={{ flex: 1 }}>{item}</Text>
      </View>
    </Pressable>
  );
};

export default ExportItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
  },
});
