import { StyleSheet } from "react-native";
import React from "react";
import { TouchableRipple, Text } from "react-native-paper";

type Props = {
  language: string;
  onPress: () => void;
};

const LanguageItem = ({ language, onPress }: Props) => {
  return (
    <TouchableRipple onPress={onPress} style={styles.item}>
      <Text variant="titleMedium">{language}</Text>
    </TouchableRipple>
  );
};

export default LanguageItem;

const styles = StyleSheet.create({
  item: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
