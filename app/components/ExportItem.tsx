import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { TouchableRipple } from "react-native-paper";
import Icon from "@expo/vector-icons/Ionicons";

const ExportItem = ({ item, onPress }: { item: string; onPress: () => void }) => {
  const icon = useMemo(() => {
    const type = item.split(".");
    switch (type[type.length - 1]) {
      case "json":
        return "code-slash";
      case "pdf":
        return "document-text";
      default:
        return "document";
    }
  }, [item]);

  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.container}>
        <Icon name={icon} size={36} />
        <Text style={{ flex: 1 }}>{item}</Text>
      </View>
    </TouchableRipple>
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
