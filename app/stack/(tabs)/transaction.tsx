import React, { useCallback, useMemo } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";
import { useData } from "providers/DataProvider";
import { useTheme } from "providers/ThemeProvider";
import { useHeader } from "providers/HeaderProvider";
import { groupTransactionByDate } from "@utils/transaction";
import TransactionItem from "@components/TransactionItem";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import TransactionDateItem from "@components/TransactionDateItem";
import { Category, TransactionDate, TransactionWithCategory } from "types";
import Animated, { useSharedValue } from "react-native-reanimated";


type ListItem =
  | {
      type: "date";
      data: TransactionDate;
    }
  | {
      type: "transaction";
      data: TransactionWithCategory;
    };

const AllTransaction = () => {
  const { colors,textStyle } = useTheme();
  const { transaction, category } = useData();
  const { t } = useTranslation("", {
    keyPrefix: "app.stack.tabs.transaction",
  });
  const { setHeaderRightButtons, setHeaderTitle, headerHeight } = useHeader();
  const summaryViewTop = useSharedValue(headerHeight);

  useFocusEffect(
    useCallback(() => {
      __DEV__ && setHeaderRightButtons([
        { icon: "search", onPress: () => console.log("search"), action: "search", disabled: true },
        { icon: "filter", onPress: () => console.log("filter"), action: "filter", disabled: true },
      ]);
    setHeaderTitle(t("title"));

    }, [])
  );

  const categoryObj: Record<string, Category> = useMemo(() => {
    if (category) return category.reduce((prev, curr) => ({ ...prev, [curr._id]: curr }), {});
    else return {};
  }, [category]);

  const _transaction = useMemo(
    () =>
      transaction.map((trans) => ({
        ...trans,
        category: categoryObj[trans.category],
      })),
    [transaction, categoryObj]
  );
  const sortedData = useMemo(() => {
    return _transaction;
  },[_transaction]);

  const totalAmount = useMemo(() => {

    const amt = {income: 0, expense: 0, transfer: 0};
     for (const trxn of sortedData) {
      amt[trxn.category.type] = amt[trxn.category.type] + trxn.amount;
     } 

     return amt;
  },[sortedData]);

  const groupedToDates = useMemo(() => {
    return groupTransactionByDate(sortedData);
  }, [sortedData]);



  const presentationData: ListItem[] = useMemo(() => {
    return (
      groupedToDates
        .flatMap((group) => [
          {
            type: "date" as const,
            data: {
              date: group.date,
              _id: group.date.toUTCString(),
              label: group.date.toISOString(),
              amount: group.amount,
              type: "income",
            },
          },
          ...group.transactions.map((data) => ({ type: "transaction" as const, data })),
        ])
    );
  }, [groupedToDates]);

  return (
    <View style={{ backgroundColor: colors.screen, flex: 1 }}>
      {/* <Animated.View style={[styles.summaryView ,{top: summaryViewTop}]}>
        <View style={{backgroundColor: colors.headerBackground, padding: 8}}>
        <Text style={[{color: colors.income}, textStyle.caption ]}>{totalAmount.income}</Text>
        <Text style={[{color: colors.expense}, textStyle.caption ]}>{totalAmount.expense}</Text>
        </View>
      </Animated.View> */}
      <CollapsibleHeaderFlatList
        data={presentationData}
        hideBackButton={true}
        renderItem={({ item: { type, data }, index }) =>
          type === "date" ? (
            <TransactionDateItem {...data} style={{marginTop: index  === 0 ? -36 : 8, height: 78}}/>
          ) : (
            <Link
              href={{
                pathname: "stack/addTransaction",
                params: {
                  _id: data._id,
                  amount: data.amount,
                  date: data.date.toISOString(),
                  category: data.category._id,
                },
              }}
              asChild
              style={{marginVertical: 4}}
            >
              <TransactionItem data={data} />
            </Link>
          )
        }
        contentContainerStyle={{ paddingHorizontal: 16 }}
        paddingVertical={8}
        // paddingTop={80}
      />
    </View>
  );
};

export default AllTransaction;


const styles = StyleSheet.create({
  summaryView: {
    position: "absolute",
    padding: 8,
    height: 115,
    width: "100%",
    zIndex: 10,
    borderRadius: 8,
    overflow: "hidden"
  }
})