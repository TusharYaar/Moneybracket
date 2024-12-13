import { Text, View, ViewStyle } from "react-native";
import React from "react";
import { TransactionDate } from "types";
import { useTheme } from "providers/ThemeProvider";
import { useSettings } from "providers/SettingsProvider";
import { format } from "date-fns";


interface Props extends TransactionDate {
    style?: ViewStyle
}

const TransactionDateItem = ({ date, amount, label, style }: Props) => {
  const { textStyle, colors } = useTheme();
  const { dateFormat, currency } = useSettings();
  return (
    <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}, style]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", flex: 1 }}>
      <Text style={textStyle.caption}>{format(date, dateFormat)}</Text>
      <Text style={[textStyle.title, { color: amount > 0 ? colors.income : colors.expense }]}>{`${currency.symbol_native} ${Math.abs(amount)}`}</Text>
      </View>
    </View>
  );
};

export default TransactionDateItem;
