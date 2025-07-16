import React, { useCallback, useMemo, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Link, router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useHeader } from "providers/HeaderProvider";
import { useData } from "providers/DataProvider";
import { useTranslation } from "react-i18next";
import TransactionItem from "@components/TransactionItem";
import { Category } from "types";
import { useTheme } from "providers/ThemeProvider";
import TransactionPageSummary from "@components/TransactionPageSummary";
import { compareAsc, compareDesc, endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Params = {
    color: string;
    _id: string;
    title: string;
    type: "group" | "category";
}

const PADDING = 8;
const current_date = new Date();



const ListTransactions = () => {
    const params = useLocalSearchParams<Params>();
    const { type, color, _id, title } = params;
    const { headerHeight } = useHeader();
    const rootNavigation = useNavigation("/");
    const { bottom } = useSafeAreaInsets();
    const { transaction, category } = useData();
    const { t } = useTranslation("", {
        keyPrefix: "app.listTransactions",
    });
    const { colors, textStyle } = useTheme();

    const [summaryHeight, setSummaryHeight] = useState(110);
    const [dateFilter, setDateFilter] = useState({
        start: startOfMonth(current_date),
        end: endOfMonth(current_date),
    });

    useFocusEffect(
        useCallback(() => {
            rootNavigation.setOptions({
                title,
                headerRightBtn: [
                    {
                        icon: "edit", onPress: () => router.push({
                            pathname: type === "category" ? "addCategory" : "addGroup", params: {
                                title,
                                _id,
                                color,
                            }
                        }), action: "edit"
                    },
                    { icon: "delete", onPress: () => console.log("delete"), action: "delete" },
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
            transaction.filter((value) => {
                if (type === "category") return value.category === _id;
                else return value.group === _id;
            }).filter((val) => compareAsc(val.date, dateFilter.start) > -1 && compareDesc(val.date, dateFilter.end) > -1)
                .map((trans) => ({
                    ...trans,
                    category: categoryObj[trans.category],
                })),
        [transaction, categoryObj, params, dateFilter]
    );

    const totalAmount = useMemo(() => {
        const amt = { income: 0, expense: 0, transfer: 0 };
        for (const trxn of _transaction) {
            amt[trxn.category.type] = amt[trxn.category.type] + trxn.amount;
        }
        return amt;
    }, [_transaction]);

    const updateDateFilter = useCallback((start: Date, end: Date) => {
        setDateFilter({
            start: startOfDay(start),
            end: endOfDay(end),
        });
    }, [setDateFilter]);

    return (
        <>
            <TransactionPageSummary
                totalAmount={totalAmount}
                style={[styles.summaryView, { top: headerHeight }]}
                date={dateFilter}
                onLayout={(e) => setSummaryHeight(e.nativeEvent.layout.height + 16)}
                updateDate={updateDateFilter}
            />
            <FlashList
                estimatedItemSize={78}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: bottom + 8, paddingTop: headerHeight + summaryHeight + 8, backgroundColor: colors.screen, }}

                data={_transaction}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Link
                        href={{
                            pathname: "addTransaction",
                            params: {
                                _id: item._id,
                                amount: item.amount,
                                date: item.date.toISOString(),
                                category: item.category._id,
                            },
                        }}
                        asChild
                        style={{ marginBottom: 8 }}
                    >
                        <TransactionItem data={item} />
                    </Link>
                )}
                ListEmptyComponent={
                    <Text style={textStyle.bodyBold}>{t("noTransactions")}</Text>
                }
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    header: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "#fafafa",
        borderRadius: 8,
        marginBottom: 8,
    },
    title: { fontSize: 16, fontWeight: "500" },
    amount: { fontSize: 16, color: "#2e7d32", marginTop: 4 },
    date: { fontSize: 12, color: "#888", marginTop: 2 },
    summaryView: {
        padding: PADDING,
        position: "absolute",
    },

});

export default ListTransactions;
