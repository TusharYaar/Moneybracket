import React, { useMemo, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { TabParamList } from "../../navigators/TabNavigators";
import { useData } from "../../providers/DataProvider";
import { Text, Surface, IconButton } from "react-native-paper";
import { Transaction } from "../../realm/Transaction";
import GroupTransactions from "../../components/GroupTransactions";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { calcuateTotal, groupTransactionByDate } from "../../utils/transaction";
import Amount from "../../components/Amount";
import { StackParamList } from "../../navigators/StackNavigators";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = MaterialTopTabScreenProps<TabParamList, "AllTransactionScreen"> & {
  stackNavigation: NativeStackNavigationProp<StackParamList, "TrackerTab", undefined>;
};

const AllTransaction = ({ stackNavigation }: Props) => {
  useEffect(() => {
    stackNavigation.setOptions({
      headerRight: () => (
        <View>
          <IconButton icon="search" onPress={() => stackNavigation.navigate("SearchScreen")} />
        </View>
      ),
    });
  }, []);
  const { transaction, showAddTransactionModal, dateFilter } = useData();
  const { t } = useTranslation("", {
    keyPrefix: "screens.tracker.allTransaction",
  });

  const grouped = useMemo(() => {
    if (dateFilter.type !== "all") return groupTransactionByDate(transaction, dateFilter.startDate, dateFilter.endDate);
    return groupTransactionByDate(transaction);
  }, [transaction, dateFilter]);

  const handlePressTransaction = (transaction: Transaction) => {
    showAddTransactionModal(transaction);
  };

  const values = useMemo(() => calcuateTotal(transaction), [transaction]);

  if (transaction.length === 0) {
    return (
      <View style={styles.screen}>
        <Text>{t("noTransaction")}</Text>
      </View>
    );
  }

  return (
    <>
      <View>
        <ScrollView horizontal={true} contentContainerStyle={styles.briefContainer}>
          <Surface style={styles.brief}>
            <Text variant="labelLarge">Income</Text>
            <Amount variant="titleLarge" amount={values.allTime.income} type={"income"} />
          </Surface>
          <Surface style={styles.brief}>
            <Text variant="labelLarge">Expense</Text>
            <Amount variant="titleLarge" amount={values.allTime.expense * -1} type={"expense"} />
          </Surface>
          <Surface style={styles.brief}>
            <Text variant="labelLarge">Transfer</Text>
            <Amount variant="titleLarge" type="transfer" amount={values.allTime.transfer} />
          </Surface>
          <Surface style={styles.brief}>
            <View style={styles.titleContainer}>
              <Text variant="labelLarge">Total</Text>
              <Text style={styles.titleCaption} variant="bodySmall">
                w/o transfer
              </Text>
            </View>
            <Amount
              variant="titleLarge"
              amount={values.allTime.income - values.allTime.expense}
              type={values.allTime.income - values.allTime.expense > 0 ? "income" : "expense"}
            />
          </Surface>
        </ScrollView>
      </View>
      <FlashList
        data={grouped}
        renderItem={({ item }) => <GroupTransactions data={item} onPressItem={handlePressTransaction} />}
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
    padding: 8,
  },
  briefContainer: {
    justifyContent: "space-around",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  brief: {
    elevation: 2,
    paddingHorizontal: 8,
    marginHorizontal: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  titleCaption: {
    marginLeft: 4,
  },
});
