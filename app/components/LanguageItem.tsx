import { StyleSheet } from "react-native";
import React from "react";
import { Text, Button } from "react-native-paper";

type Props = {
  language: string;
  onPress: () => void;
  focused: boolean;
};

const LanguageItem = ({ language, onPress, focused }: Props) => {
  return (
    <Button onPress={onPress} style={styles.item} mode={focused ? "contained-tonal" : "text"}>
      <Text variant="titleMedium">{language}</Text>
    </Button>
  );
};

export default LanguageItem;

const styles = StyleSheet.create({
  item: {
    marginVertical: 4,
  },
});
