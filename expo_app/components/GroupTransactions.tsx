import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Transaction } from "../realm/Transaction";
import TransactionItem from "./TransactionItem";
import { Text } from "react-native-paper";
import { GroupedTransactions } from "../types";
import Amount from "./Amount";

type Props = {
  data: GroupedTransactions;
  onPressItem: (t: Transaction) => void;
};

const MAX_PER_DAY = 3;

const GroupTransactions = ({ data, onPressItem }: Props) => {
  const [viewAll, setViewAll] = useState(false);
  const totalAmt = useMemo(
    () =>
      data.transactions.reduce((agg, curr) => {
        return curr.category.type === "transfer"
          ? agg
          : curr.category.type === "expense"
          ? agg - curr.amount
          : agg + curr.amount;
      }, 0),
    [data]
  );

  const visibleTrans = useMemo(() => {
    if (viewAll || data.transactions.length <= MAX_PER_DAY) return data.transactions;
    else return data.transactions.slice(0, MAX_PER_DAY);
  }, [viewAll, data]);

  return (
    <View style={[styles.group]}>
      <View style={styles.breif}>
        <Text variant="labelLarge">{data.date}</Text>
        <Amount variant="labelLarge" amount={totalAmt} sign={true} type={totalAmt > 0 ? "income" : "expense"} />
      </View>
      {visibleTrans.map((transaction) => (
        <TransactionItem
          data={transaction}
          style={styles.transaction}
          onPress={() => onPressItem(transaction)}
          key={transaction._objectKey()}
        />
      ))}
      {!viewAll && data.transactions.length > MAX_PER_DAY && (
        <TouchableWithoutFeedback onPress={() => setViewAll(true)}>
          <Text variant="bodySmall">Tap to view {data.transactions.length - MAX_PER_DAY} more Transactions</Text>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default GroupTransactions;

const styles = StyleSheet.create({
  group: {
    margin: 10,
  },
  breif: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  transaction: {
    marginVertical: 4,
  },
});
