import React, { useMemo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
// import { TabParamList } from "../../navigators/TabNavigators";
import { useData } from "../../../providers/DataProvider";
// import { Transaction } from "../../../realm/Transaction";
// import GroupTransactions from "../../../components/GroupTransactions";
import { useTranslation } from "react-i18next";
import { calcuateTotal, groupTransactionByDate } from "../../../utils/transaction";
// import Amount from "../../../components/Amount";
// import NoDataSVG from "../../../components/SVGs/NoDataSVG";
import { useRouter } from "expo-router";
import TransactionItem from "../../../components/TransactionItem";
// import { useQuery } from "@realm/react";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import { Transaction } from "types";

const AllTransaction = () => {
  //   useEffect(() => {
  //     if (__DEV__)
  //       stackNavigation.setOptions({
  //         headerRight: () => (
  //           <View>
  //             <IconButton icon="search" onPress={() => stackNavigation.navigate("SearchScreen")} />
  //           </View>
  //         ),
  //       });
  //   }, []);
  const router = useRouter();
  const { selectedCategory } = useData();
  const { t } = useTranslation("", {
    keyPrefix: "screens.tracker.allTransaction",
  });

  const _transaction = useMemo(
    () => [],
    []
    // [transaction, selectedCategory
  );
  // transaction.filter((tran) => selectedCategory.includes(tran.category._id.toHexString())),

  // const grouped = useMemo(() => {
  //   // if (dateFilter.type !== "all")
  //     // return groupTransactionByDate(_transaction, dateFilter.startDate, dateFilter.endDate);
  //   return groupTransactionByDate(_transaction);
  // }, [_transaction]);

  const handlePressTransaction = (transaction: Transaction) => {
    // showAddTransactionModal(transaction);
  };

  const values = useMemo(() => {
    return calcuateTotal(_transaction);
  }, [_transaction]);

  // if (_transaction.length === 0)
  //   return (
  //     <>
  //       <NoDataSVG message={t("noTransaction")} />
  //       <FAB icon="add" style={styles.fab} onPress={() => router.push("(stack)/addTransaction")} />
  //     </>
  //   );

  return (
    <>
      {/* <ScrollView horizontal={true} contentContainerStyle={styles.briefContainer}>
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
        </ScrollView> */}
      {/* <FlashList
        data={grouped}
        renderItem={({ item }) => <GroupTransactions data={item} onPressItem={handlePressTransaction} />}
        estimatedItemSize={200}
      />
       */}
      <CollapsibleHeaderFlatList
        title="transactions"
        data={_transaction}
        renderItem={({ item }) => <TransactionItem data={item} onPress={() => {}} />}
        headerBtns={[
          { icon: "search", onPress: () => console.log("search"), label: "search", disabled: true, },
          { icon: "filter", onPress: () => console.log("filter"), label: "filter", disabled: true, },
        ]}
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
