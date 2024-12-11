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
  const { dateFormat } = useSettings();
  return (
    <View style={[{ flexDirection: "row", justifyContent: "space-between" }, style]}>
      <Text style={textStyle.title}>{format(date, dateFormat)}</Text>
      <Text style={[textStyle.title, { color: amount > 0 ? colors.income : colors.expense }]}>{Math.abs(amount)}</Text>
    </View>
  );
};

export default TransactionDateItem;
