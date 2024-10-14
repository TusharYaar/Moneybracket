import React, { useCallback, useEffect, useMemo } from "react";
import { useData } from "../../../providers/DataProvider";
import { useTranslation } from "react-i18next";
// import { calcuateTotal, groupTransactionByDate } from "../../../utils/transaction";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import TransactionItem from "@components/TransactionItem";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import { Transaction } from "types";
import { useTheme } from "providers/ThemeProvider";
import { View } from "react-native";
import { useHeader } from "providers/HeaderProvider";

const AllTransaction = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { transaction } = useData();
  const { t } = useTranslation("", {
    keyPrefix: "app.stack.tabs.transaction",
  });
  const { showTabbar } = useHeader();

  const navigation = useNavigation("/stack");
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: t("title"),
        headerRightBtn: [
          { icon: "search", onPress: () => console.log("search"), label: "search", disabled: true },
          { icon: "filter", onPress: () => console.log("filter"), label: "filter", disabled: true },
        ],
      });
      showTabbar();
    }, [])
  );

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

  return (
    <View style={{ backgroundColor: colors.screen, flex: 1 }}>
      <CollapsibleHeaderFlatList
        title="transactions"
        data={transaction}
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
        paddingTop={8}
      />
    </View>
  );
};

export default AllTransaction;
