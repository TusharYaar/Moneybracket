import { StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { Transaction } from "../realm/Transaction";
import { Text, TouchableRipple } from "react-native-paper";
import Icon from "@expo/vector-icons/Ionicons";
import { chooseBetterContrast } from "../utils/colors";

import Amount from "./Amount";
import { useCustomTheme } from "../providers/ThemeProvider";

type Props = {
  data: Transaction;
  onPress: () => void;
  style?: ViewStyle;
};

const TransactionItem = ({ data, onPress, style }: Props) => {
  const {
    theme: { roundness },
  } = useCustomTheme();

  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.innerContainer}>
        <Icon
          name={data.category.icon as any}
          size={36}
          style={{
            color: chooseBetterContrast(data.category.color),
            backgroundColor: data.category.color,
            padding: 8,
            borderRadius: roundness * 4,
          }}
        />
        <View style={styles.text}>
          <View>
            <Text variant="titleMedium">{data.category.title}</Text>
            {data.note.length > 0 && <Text variant="bodySmall">{data.note}</Text>}
          </View>
          <Amount
            variant="titleMedium"
            amount={data.category.type === "income" ? data.amount : data.amount * -1}
            type={data.category.type}
          />
        </View>
      </View>
    </TouchableRipple>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingLeft: 8,
  },
});
