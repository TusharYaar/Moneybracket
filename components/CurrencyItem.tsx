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
  selected?: boolean;
}

const CurrencyItem = ({ item, onPress, style, rate, baseCurrency, selected = false }: CurrencyItemProps) => {
  const { textStyle, colors } = useTheme();
  return (
    <Pressable
      onPress={() => (onPress ? onPress(item) : undefined)}
      style={[
        styles.container,
        { backgroundColor: selected ? colors.headerBackground : colors.sectionBackground },
        style,
      ]}
    >
      <Text
        style={[
          styles.currencySymbol,
          textStyle.header,
          { backgroundColor: colors.headerBackground, color: colors.headerText },
        ]}
      >
        {item.symbol}
      </Text>
      <View style={[styles.textContainer]}>
        <Text style={[textStyle.bodyBold, { color: selected ? colors.headerText : colors.text }]}>{item.name}</Text>
        {rate && (
          <Text style={[textStyle.label, { color: selected ? colors.headerText : colors.text }]}>
            {`${baseCurrency} ${rate.toFixed(2)} = 1 ${item.code}`}{" "}
          </Text>
        )}
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
