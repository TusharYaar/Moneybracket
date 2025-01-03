import React, { useCallback, useMemo } from "react";
import { Text, View, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
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
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSettings } from "providers/SettingsProvider";

const PADDING = 8;

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
  const { colors, textStyle } = useTheme();
  const { transaction, category } = useData();
  const { t } = useTranslation("", {
    keyPrefix: "app.stack.tabs.transaction",
  });
  const { setHeaderRightButtons, setHeaderTitle, headerHeight } = useHeader();
  const summaryViewTop = useSharedValue(headerHeight + PADDING);
  const summaryViewHeight = useSharedValue(100);
  const incomeSummaryHeight = useSharedValue(32);
  const lastContentOffset = useSharedValue(0);
  const { currency } = useSettings();

  useFocusEffect(
    useCallback(() => {
      __DEV__
        ? setHeaderRightButtons([
            { icon: "search", onPress: () => console.log("search"), action: "search", disabled: true },
            { icon: "filter", onPress: () => console.log("filter"), action: "filter", disabled: true },
          ])
        : setHeaderRightButtons([]);
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

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const diff = lastContentOffset.value - event.nativeEvent.contentOffset.y;
    lastContentOffset.value = event.nativeEvent.contentOffset.y;

    if (event.nativeEvent.contentOffset.y < 64) {
      summaryViewTop.value = withTiming(headerHeight + 8);
    } else if (diff < 0) summaryViewTop.value = withTiming(0);
    else summaryViewTop.value = withTiming(headerHeight + 8);
  };

  const summaryStyle = useAnimatedStyle(() => {
    return {
      top: summaryViewTop.value,
    };
  });

  return (
    <View style={{ backgroundColor: colors.screen, flex: 1 }}>
      <Animated.View style={[styles.summaryView, summaryStyle]}>
        <View style={{ padding: 8, backgroundColor: colors.headerBackground, borderRadius: 8 }}>
          <Animated.Text
            style={[textStyle.caption, { color: colors.income }]}
          >{`${currency.symbol_native} ${totalAmount.income}`}</Animated.Text>
          <Animated.Text
            style={[textStyle.caption, { color: colors.expense }]}
          >{`${currency.symbol_native} ${totalAmount.expense}`}</Animated.Text>
        </View>
      </Animated.View>
      <CollapsibleHeaderFlatList
        data={presentationData}
        hideBackButton={true}
        renderItem={({ item: { type, data }, index }) =>
          type === "date" ? (
            <TransactionDateItem {...data} style={{ marginTop: index === 0 ? -36 : 8, height: 78 }} />
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
              style={{ marginVertical: 4 }}
            >
              <TransactionItem data={data} />
            </Link>
          )
        }
        contentContainerStyle={{ paddingHorizontal: 16 }}
        paddingVertical={8}
        onScroll={handleOnScroll}
        paddingTop={115}
      />
    </View>
  );
};

export default AllTransaction;

const styles = StyleSheet.create({
  summaryView: {
    position: "absolute",
    paddingHorizontal: PADDING,
    width: "100%",
    zIndex: 10,
    height: 115,
    overflow: "hidden",
  },
});
