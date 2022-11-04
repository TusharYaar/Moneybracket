import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { Transaction } from '../realm/Transaction';
import TransactionItem from './TransactionItem';
import { format } from 'date-fns';

type Props = {
    data: {
        date: Date;
        transactions: Transaction[];
    };
    onPressItem: (t: Transaction) => void;

}

const GroupTransactions = ({ data, onPressItem }: Props) => {
    const totalAmt = useMemo(() => data.transactions.reduce((agg, curr) => agg + curr.amount, 0), [data]);

    return (
        <View style={styles.group} >
            <View style={styles.breif}><Text>{format(data.date, "dd mm yyyy")}</Text>
                <Text>{totalAmt}</Text>
            </View>
            {data.transactions.map(transaction =>
                <TransactionItem data={transaction} onPress={() => onPressItem(transaction)} />
            )}
        </View>
    )
}

export default GroupTransactions

const styles = StyleSheet.create({
    group: {
        margin: 10,
    },
    breif: {
        flexDirection: "row",
        backgroundColor: "orange",
        justifyContent: "space-between",
        flex: 1,
    }
})