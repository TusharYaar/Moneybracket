import React, { useMemo } from "react";
import { useData } from "../../../providers/DataProvider";
import { useTranslation } from "react-i18next";
// import { calcuateTotal, groupTransactionByDate } from "../../../utils/transaction";
import { useRouter } from "expo-router";
import TransactionItem from "../../../components/TransactionItem";
import CollapsibleHeaderFlatList from "@components/CollapsibleHeaderFlatList";
import { Transaction } from "types";
import { useTheme } from "providers/ThemeProvider";

const AllTransaction = () => {
  const router = useRouter();
  const {colors} = useTheme();
  const { transaction } = useData();
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

  return (
      <CollapsibleHeaderFlatList
        style={{backgroundColor: colors.screen}}
        title="transactions"
        data={transaction}
        hideBackButton={true}
        renderItem={({ item }) => (
          <TransactionItem
            data={item}
            onPress={() =>
              router.push(
                `addTransaction?_id=${item._id}&amount=${item.amount}&date=${item.date.toISOString()}&category=${
                  item.category._id
                }`
              )
            }
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        paddingTop={8}
        headerBtns={[
          { icon: "search", onPress: () => console.log("search"), label: "search", disabled: true },
          { icon: "filter", onPress: () => console.log("filter"), label: "filter", disabled: true },
        ]}
      />
  );
};

export default AllTransaction;
