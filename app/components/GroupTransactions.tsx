import {StyleSheet, View, ViewToken} from "react-native";
import React, {useMemo} from "react";
import {Transaction} from "../realm/Transaction";
import TransactionItem from "./TransactionItem";
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";
import {Paragraph, Subheading} from "react-native-paper";
import {format} from "date-fns";
import {useCustomTheme} from "../themes";

type Props = {
  data: {
    formattedDate: string;
    transactions: Transaction[];
  };
  onPressItem: (t: Transaction) => void;
  visibleItems: Animated.SharedValue<ViewToken[]>;
};

const GroupTransactions = ({data, onPressItem, visibleItems}: Props) => {
  const {theme} = useCustomTheme();

  const totalAmt = useMemo(
    () =>
      data.transactions.reduce((agg, curr) => {
        return curr.category.type === "expense"
          ? agg - curr.amount
          : agg + curr.amount;
      }, 0),
    [data],
  );

  const rstyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      visibleItems.value.find(
        ({item}) => item.formattedDate === data.formattedDate,
      ),
    );
    return {
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.group, rstyle]}>
      <View style={styles.breif}>
        <Subheading>{data.formattedDate}</Subheading>
        <Paragraph
          style={{
            color: totalAmt >= 0 ? theme.colors.income : theme.colors.expense,
            ...theme.fonts.medium,
          }}
        >
          {totalAmt > 0 ? totalAmt : totalAmt * -1}
        </Paragraph>
      </View>
      {data.transactions.map(transaction => (
        <TransactionItem
          data={transaction}
          onPress={() => onPressItem(transaction)}
          key={transaction._objectKey()}
        />
      ))}
    </Animated.View>
  );
};

export default GroupTransactions;

const styles = StyleSheet.create({
  group: {
    margin: 10,
  },
  breif: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
