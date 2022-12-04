import React, {useMemo} from "react";
import {View, StyleSheet, ScrollView} from "react-native";

import {MaterialTopTabScreenProps} from "@react-navigation/material-top-tabs";
import {TabParamList} from "../../navigators/TabNavigators";
import {useData} from "../../providers/DataProvider";
import {Caption, Paragraph, Surface, Title} from "react-native-paper";
import {Transaction} from "../../realm/Transaction";
import GroupTransactions from "../../components/GroupTransactions";
import {FlashList} from "@shopify/flash-list";
import {useTranslation} from "react-i18next";
import {groupTransactionByDate} from "../../utils/transaction";
import {useCustomTheme} from "../../themes";
import Amount from "../../components/Amount";
type Props = MaterialTopTabScreenProps<TabParamList, "AllTransactionScreen">;

const AllTransaction = ({}: Props) => {
  const {transaction, showAddTransactionModal, dateFilter} = useData();
  const {t} = useTranslation("", {
    keyPrefix: "screens.tracker.allTransaction",
  });

  const grouped = useMemo(() => {
    if (dateFilter.type !== "all")
      return groupTransactionByDate(
        transaction,
        dateFilter.startDate,
        dateFilter.endDate,
      );
    return groupTransactionByDate(transaction);
  }, [transaction, dateFilter]);

  const handlePressTransaction = (transaction: Transaction) => {
    showAddTransactionModal(transaction);
  };

  const values = useMemo(() => {
    let income = 0,
      expense = 0,
      transfer = 0,
      total = 0;

    transaction.forEach(trans => {
      if (trans.category.type === "income") {
        income += trans.amount;
        total += trans.amount;
      }
      if (trans.category.type === "expense") {
        expense += trans.amount;
        total -= trans.amount;
      }
      if (trans.category.type === "transfer") {
        transfer += trans.amount;
      }
    });

    return {income, expense, transfer, total};
  }, [transaction]);

  if (transaction.length === 0) {
    return (
      <View style={styles.screen}>
        <Paragraph>{t("noTransaction")}</Paragraph>
      </View>
    );
  }

  return (
    <>
      <View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.briefContainer}
        >
          <Surface style={styles.brief}>
            <Paragraph>Income</Paragraph>
            <Amount sign={true} amount={values.income} type={"income"} />
          </Surface>
          <Surface style={styles.brief}>
            <Paragraph>Expense</Paragraph>
            <Amount sign={true} amount={values.expense} type={"expense"} />
          </Surface>
          <Surface style={styles.brief}>
            <Paragraph>Transfer</Paragraph>
            <Amount sign={true} type="transfer" amount={values.transfer} />
          </Surface>
          <Surface style={styles.brief}>
            <View style={styles.titleContainer}>
              <Paragraph>Total</Paragraph>
              <Caption style={styles.titleCaption}>w/o transfer</Caption>
            </View>
            <Amount
              sign={true}
              amount={values.total - values.transfer}
              type={values.total - values.transfer > 0 ? "income" : "expense"}
            />
          </Surface>
        </ScrollView>
      </View>
      <FlashList
        data={grouped}
        renderItem={({item}) => (
          <GroupTransactions data={item} onPressItem={handlePressTransaction} />
        )}
        estimatedItemSize={200}
      />
    </>
  );
};

export default AllTransaction;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  briefContainer: {
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  brief: {
    elevation: 2,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  titleCaption: {
    marginLeft: 5,
  },
});
