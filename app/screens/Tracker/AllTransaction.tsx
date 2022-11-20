import React, {useCallback, useMemo} from "react";
import {View, StyleSheet} from "react-native";

import {MaterialTopTabScreenProps} from "@react-navigation/material-top-tabs";
import {TabParamList} from "../../navigators/TabNavigators";
import {useData} from "../../providers/DataProvider";
import {Paragraph} from "react-native-paper";
import {Transaction} from "../../realm/Transaction";
import GroupTransactions from "../../components/GroupTransactions";
import {FlashList} from "@shopify/flash-list";
import {useTranslation} from "react-i18next";
import {compareAsc, format} from "date-fns";
type Props = MaterialTopTabScreenProps<TabParamList, "AllTransactionScreen">;

type GroupedTransactions = {
  formattedDate: string;
  transactions: Transaction[];
};
const AllTransaction = ({}: Props) => {
  const {transaction, showAddTransactionModal, dateFilter} = useData();
  const {t} = useTranslation("", {
    keyPrefix: "screens.tracker.allTransaction",
  });
  const withinDate = useCallback((date: Date, start: Date, end: Date) => {
    if (compareAsc(date, start) && compareAsc(end, date)) {
      return true;
    }
    return false;
  }, []);

  const grouped = useMemo(() => {
    return transaction.reduce<GroupedTransactions[]>((result, val) => {
      if (withinDate(val.date, dateFilter.startDate, dateFilter.endDate)) {
        if (result.length === 0) {
          let obj: GroupedTransactions = {
            formattedDate: format(val.date, "dd MMM, yy"),
            transactions: [val],
          };
          result.push(obj);
          return result;
        } else {
          const group = result[result.length - 1];
          if (group.formattedDate === format(val.date, "dd MMM, yy")) {
            result[result.length - 1] = {
              formattedDate: group.formattedDate,
              transactions: [...group.transactions, val],
            };
            return result;
          } else {
            let obj: GroupedTransactions = {
              formattedDate: format(val.date, "dd MMM, yy"),
              transactions: [val],
            };
            result.push(obj);
            return result;
          }
        }
      } else return result;
    }, [] as GroupedTransactions[]);
  }, [transaction, dateFilter]);
  const handlePressTransaction = (transaction: Transaction) => {
    showAddTransactionModal(transaction);
  };

  if (transaction.length === 0) {
    return (
      <View style={styles.screen}>
        <Paragraph>{t("noTransaction")}</Paragraph>
      </View>
    );
  }

  return (
    <FlashList
      data={grouped}
      renderItem={({item}) => (
        <GroupTransactions data={item} onPressItem={handlePressTransaction} />
      )}
      estimatedItemSize={200}
    />
  );
};

export default AllTransaction;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
});
