import { StyleSheet, Text, View, ViewToken } from 'react-native'
import React, { useMemo } from 'react'
import { Transaction } from '../realm/Transaction';
import TransactionItem from './TransactionItem';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Subheading } from 'react-native-paper';
import { format } from 'date-fns/esm';

type Props = {
    data: {
        date: string;
        transactions: Transaction[];
    };
    onPressItem: (t: Transaction) => void;
    visibleItems: Animated.SharedValue<ViewToken[]>;

}

const GroupTransactions = ({ data, onPressItem, visibleItems }: Props) => {
    const totalAmt = useMemo(() => data.transactions.reduce((agg, curr) => {
        return curr.category.type === "expense" ? agg - curr.amount : agg + curr.amount;
    }, 0), [data]);



    const rstyle = useAnimatedStyle(() => {
        const isVisible = Boolean(visibleItems.value.find(({ item }) => item.date === data.date))
        return {
            transform: [{
                scale: withTiming(isVisible ? 1 : 0.6),
            }]
        }
    });
    return (
        <Animated.View style={[styles.group, rstyle]} >
            <View style={styles.breif}><Subheading>{format(new Date(data.date), "d MMM, yy")}</Subheading>
                <Text style={{ color: totalAmt > 0 ? "green" : "red " }}>{totalAmt > 0 ? totalAmt : totalAmt * -1}</Text>
            </View>
            {data.transactions.map(transaction =>
                <TransactionItem data={transaction}
                    onPress={() => onPressItem(transaction)}
                    key={transaction._objectKey()} />
            )}
        </Animated.View>
    )
}

export default GroupTransactions

const styles = StyleSheet.create({
    group: {
        margin: 10,
    },
    breif: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    }
})