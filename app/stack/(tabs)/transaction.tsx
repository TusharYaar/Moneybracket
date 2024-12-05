import React, { useEffect, useMemo } from "react";
import { useData } from "../../../providers/DataProvider";
import { useTranslation } from "react-i18next";
// import { calcuateTotal, groupTransactionByDate } from "../../../utils/transaction";
import { useRouter } from "expo-router";
import TransactionItem from "@components/TransactionItem";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import { Category, Transaction } from "types";
import { useTheme } from "providers/ThemeProvider";
import { View } from "react-native";
import { useHeader } from "providers/HeaderProvider";
import { groupTransactionByDate } from "@utils/transaction";

const AllTransaction = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { transaction, category } = useData();
  const { t } = useTranslation("", {
    keyPrefix: "app.stack.tabs.transaction",
  });
  const { setHeaderRightButtons } = useHeader();

  // const navigation = useNavigation("/stack");
  useEffect( () => {
    setHeaderRightButtons( [
      { icon: "search", onPress: () => console.log("search"), action: "search", disabled: true },
      { icon: "filter", onPress: () => console.log("filter"), action: "filter", disabled: true },
    ],
  );
},[]);

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


// console.log(_transaction);

  // const _transaction = useMemo(
  //   () => [],
  //   []
  //   // [transaction, selectedCategory
  // );
  // transaction.filter((tran) => selectedCategory.includes(tran.category._id.toHexString())),

  // const grouped = useMemo(() => {
  //   // if (dateFilter.type !== "all")
  //     // return groupTransactionByDate(_transaction, dateFilter.startDate, dateFilter.endDate);
  //   return groupTransactionByDate(transaction);
  // }, [transaction]);
  return (
    <View style={{ backgroundColor: colors.screen, flex: 1 }}>
      <CollapsibleHeaderFlatList
        data={_transaction}
        hideBackButton={true}
        renderItem={({ item }) => (
          <TransactionItem
            data={item}
            onPress={() =>
              router.push(
                `stack/addTransaction?_id=${item._id}&amount=${item.amount}&date=${item.date.toISOString()}&category=${
                  item.category._id
                }`
              )
            }
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        paddingVertical={8}
      />
    </View>
  );
};

export default AllTransaction;
