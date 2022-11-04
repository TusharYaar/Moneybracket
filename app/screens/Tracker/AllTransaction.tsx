import React, { useMemo } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { TabParamList } from "../../navigators/TabNavigators";
import { useData } from "../../providers/DataProvider";
import { Paragraph } from "react-native-paper";
import TransactionItem from "../../components/TransactionItem";
import { Transaction } from "../../realm/Transaction";
import GroupTransactions from "../../components/GroupTransactions";
import { compareAsc } from "date-fns";
// import { differenceInCalendarDays } from "date-fns";
type Props = MaterialTopTabScreenProps<TabParamList, "AllTransactionScreen">;

type GroupedTransactions = {
  date: Date;
  transactions: Transaction[];
}
const AllTransaction = ({ }: Props) => {
  const { transaction, showAddTransactionModal } = useData();

  const grouped = useMemo(() => {
    return transaction.reduce<GroupedTransactions[]>((result, val) => {
      if (result.length === 0) {
        let obj: GroupedTransactions = {
          date: val.date,
          transactions: [val],
        };
        result.push(obj);
        return result;
      }
      else {
        if (compareAsc(result[result.length - 1].date, val.date) === 0) {
          result[result.length - 1].transactions.push(val);
          return result;
        }
        else {
          let obj: GroupedTransactions = {
            date: val.date,
            transactions: [val],
          };
          result.push(obj);
          return result;
        }
      }
    }, [] as GroupedTransactions[]);

  }, [transaction]);


  const handlePressTransaction = (transaction: Transaction) => {

  }

  if (transaction.length === 0) {
    return (
      <View style={styles.screen}>
        <Paragraph>No Transaction added</Paragraph>
      </View>
    );
  }



  return (
    <FlatList data={grouped} renderItem={({ item }) => (<GroupTransactions data={item} onPressItem={handlePressTransaction} />)} />
  );
};

export default AllTransaction;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
});
