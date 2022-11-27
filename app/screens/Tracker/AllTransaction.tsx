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
type Props = MaterialTopTabScreenProps<TabParamList, "AllTransactionScreen">;

const AllTransaction = ({}: Props) => {
  const {transaction, showAddTransactionModal, dateFilter} = useData();
  const {theme} = useCustomTheme();
  const {t} = useTranslation("", {
    keyPrefix: "screens.tracker.allTransaction",
  });

  const grouped = useMemo(() => {
    return groupTransactionByDate(
      transaction,
      dateFilter.startDate,
      dateFilter.endDate,
    );
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
        // total += trans.amount;
      }
    });

    return {income, expense, transfer, total};
  }, []);

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
            <Title style={{color: theme.colors.income}}>{values.income}</Title>
          </Surface>
          <Surface style={styles.brief}>
            <Paragraph>Expense</Paragraph>
            <Title style={{color: theme.colors.expense}}>
              {values.expense}
            </Title>
          </Surface>
          <Surface style={styles.brief}>
            <Paragraph>Transfer</Paragraph>
            <Title>{values.transfer}</Title>
          </Surface>
          <Surface style={styles.brief}>
            <Paragraph>Total</Paragraph>
            <Caption>with transfer</Caption>
            <Title
              style={{
                color:
                  values.total < 0 ? theme.colors.expense : theme.colors.income,
              }}
            >
              {Math.abs(values.total)}
            </Title>
          </Surface>
          <Surface style={styles.brief}>
            <Paragraph>Total</Paragraph>
            <Caption>w/o transfer</Caption>
            <Title
              style={{
                color:
                  values.total < 0 ? theme.colors.expense : theme.colors.income,
              }}
            >
              {Math.abs(values.total)}
            </Title>
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
});
