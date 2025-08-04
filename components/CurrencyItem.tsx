import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { Currency, RateType } from "types";
import { useTheme } from "providers/ThemeProvider";

interface CurrencyItemProps {
  item: Currency | RateType;
  onPress?: (item: Currency) => void;
  style?: ViewStyle;
  rate?: number;
  baseCurrency?: string;
}

const CurrencyItem = ({ item, onPress, style, rate, baseCurrency }: CurrencyItemProps) => {
  const { textStyle, colors } = useTheme();
  return (
    <Pressable
      onPress={() => (onPress ? onPress(item) : undefined)}
      style={[styles.container, { backgroundColor: colors.sectionBackground }, style]}
    >
      <Text style={[{ backgroundColor: "black" }, styles.currencySymbol, textStyle.header]}>{item.symbol}</Text>
      <View style={styles.textContainer}>
        <Text style={textStyle.bodyBold}>{item.name}</Text>
        {rate && <Text style={textStyle.label}>{`${baseCurrency} ${rate.toFixed(2)} = 1 ${item.code}`} </Text>}
      </View>
    </Pressable>
  );
};

export default CurrencyItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    padding: 4,
  },
  textContainer: {
    padding: 4,
  },
});
