import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Transaction } from '../realm/Transaction'
import { Headline, Subheading, TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'

type Props = {
    data: Transaction
    onPress: () => void;
}


const TransactionItem = ({ data, onPress }: Props) => {
    return (
        <TouchableRipple onPress={onPress} style={[styles.outerContainer, { backgroundColor: data.category.color }]}>
            <View style={styles.innerContainer}>
                <Icon name={data.category.icon} size={20} />
                <Subheading>{data.category.title}</Subheading>
                <Headline>{`${data.amount}`}</Headline>
            </View>
        </TouchableRipple>
    )
}

export default TransactionItem

const styles = StyleSheet.create({
    outerContainer: {
        marginVertical: 5,
    },
    innerContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
})