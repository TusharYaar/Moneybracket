import { StyleSheet, View, ViewStyle, Text, Pressable } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { chooseBetterContrast } from "../utils/colors";

import { TransactionWithCategory } from "types";
import { useTheme } from "providers/ThemeProvider";
import { useSettings } from "providers/SettingsProvider";

type Props = {
  data: TransactionWithCategory;
  onPress: () => void;
  style?: ViewStyle;
};

const TransactionItem = ({ data, onPress, style }: Props) => {
  const { textStyle, colors } = useTheme();
  const { currency } = useSettings();

  return (
    <Pressable onPress={onPress} style={style}>
      <View style={styles.innerContainer}>
        <Octicons
          name={data.category.icon as any}
          size={36}
          style={{
            color: chooseBetterContrast(data.category.color),
            backgroundColor: data.category.color,
            padding: 8,
            borderRadius: 8,
          }}
        />
        <View style={styles.text}>
          <View>
            <Text style={textStyle.title}>{data.category.title}</Text>
            {/* {data.note.length > 0 && <Text>{data.note}</Text>} */}
          </View>
          <Text style={[ {color: colors[data.category.type] } ,textStyle.amount]}>
            {`${currency.symbol_native} ${data.amount}`}
            </Text>
      {/* {`${sign && amount !== 0 ? (amount > 0 ? "+ " : "- ") : ""}${currency.symbol_native}${t("amountValue", {
        amount,
      })}`} */}
          {/* <Amount
            amount={data.category.type === "income" ? data.amount : data.amount * -1}
            type={data.category.type}
          /> */}
        </View>
      </View>
    </Pressable>
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
