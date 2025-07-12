import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { Link, useFocusEffect, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { useData } from "providers/DataProvider";
import { useTheme } from "providers/ThemeProvider";
import { groupTransactionByDate } from "@utils/transaction";
import TransactionItem from "@components/TransactionItem";
import TransactionDateItem from "@components/TransactionDateItem";
import { Category, TransactionDate, TransactionWithCategory } from "types";
import { FlashList } from "@shopify/flash-list";
import { useHeader } from "providers/HeaderProvider";
import TransactionPageSummary from "@components/TransactionPageSummary";
import { compareAsc, compareDesc, endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";

const PADDING = 8;

const current_date = new Date();

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
  const { colors } = useTheme();
  const { transaction, category } = useData();
  const { t } = useTranslation("", {
    keyPrefix: "app.tabs.transaction",
  });
  // const summaryViewTop = useSharedValue(PADDING);
  // const summaryViewHeight = useSharedValue(100);
  // const incomeSummaryHeight = useSharedValue(32);
  // const lastContentOffset = useSharedValue(0);
  const rootNavigation = useNavigation("/");
  const { headerHeight, tabbarHeight } = useHeader();

  const [dateFilter, setDateFilter] = useState({
    start: startOfMonth(current_date),
    end: endOfMonth(current_date),
  });

  const [summaryHeight, setSummaryHeight] = useState(110);

  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({
        title: t("title"),
        headerRightBtn: [
          { icon: "search", onPress: () => console.log("search"), action: "search", disabled: true },
          { icon: "filter", onPress: () => console.log("filter"), action: "filter", disabled: true },
        ],
      });
    }, [])
  );

  const categoryObj: Record<string, Category> = useMemo(() => {
    if (category) return category.reduce((prev, curr) => ({ ...prev, [curr._id]: curr }), {});
    else return {};
  }, [category]);

  const _transaction = useMemo(
    () =>
      transaction
        .filter((val) => compareAsc(val.date, dateFilter.start) > -1 && compareDesc(val.date, dateFilter.end) > -1)
        .map((trans) => ({
          ...trans,
          category: categoryObj[trans.category],
        })),
    [transaction, categoryObj, dateFilter]
  );

  const sortedData = useMemo(() => {
    return _transaction;
  }, [_transaction]);

  const totalAmount = useMemo(() => {
    const amt = { income: 0, expense: 0, transfer: 0 };
    for (const trxn of sortedData) {
      amt[trxn.category.type] = amt[trxn.category.type] + trxn.amount;
    }
    return amt;
  }, [sortedData]);

  const groupedToDates = useMemo(() => {
    return groupTransactionByDate(sortedData);
  }, [sortedData]);

  const presentationData: ListItem[] = useMemo(() => {
    return groupedToDates.flatMap((group) => [
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
    ]);
  }, [groupedToDates]);

  // const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const diff = lastContentOffset.value - event.nativeEvent.contentOffset.y;
  //   lastContentOffset.value = event.nativeEvent.contentOffset.y;

  //   if (event.nativeEvent.contentOffset.y < 64) {
  //     summaryViewTop.value = withTiming(8);
  //   } else if (diff < 0) summaryViewTop.value = withTiming(0);
  //   else summaryViewTop.value = withTiming(8);
  // };

  const updateDateFilter = useCallback((start: Date, end: Date) => {
    setDateFilter({
      start: startOfDay(start),
      end: endOfDay(end),
    });
  }, []);
  return (
    <>
      <TransactionPageSummary
        totalAmount={totalAmount}
        style={[styles.summaryView, { top: headerHeight }]}
        date={dateFilter}
        onLayout={(e) => setSummaryHeight(e.nativeEvent.layout.height)}
        updateDate={updateDateFilter}
      />
      <FlashList
        data={presentationData}
        estimatedItemSize={78}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: { type, data }, index }) =>
          type === "date" ? (
            <TransactionDateItem {...data} style={{ marginTop: index === 0 ? 0 : 8 }} />
          ) : (
            <Link
              href={{
                pathname: "addTransaction",
                params: {
                  _id: data._id,
                  amount: data.amount,
                  date: data.date.toISOString(),
                  category: data.category._id,
                },
              }}
              asChild
              style={{ marginBottom: 8 }}
            >
              <TransactionItem data={data} />
            </Link>
          )
        }
        contentContainerStyle={{
          paddingBottom: tabbarHeight,
          paddingTop: headerHeight + summaryHeight,
          paddingHorizontal: 8,
          backgroundColor: colors.screen,
        }}
      />
    </>
  );
};

export default AllTransaction;

const styles = StyleSheet.create({
  summaryView: {
    padding: PADDING,
    position: "absolute",
  },
});
