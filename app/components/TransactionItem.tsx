import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Transaction } from '../realm/Transaction'
import { Caption, Headline, Subheading, TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { chooseBetterContrast } from '../utils/colors'

type Props = {
    data: Transaction
    onPress: () => void;
}


const TransactionItem = ({ data, onPress }: Props) => {
    return (
        <TouchableRipple onPress={onPress} style={[styles.outerContainer, { backgroundColor: data.category.color }]}>
            <View style={styles.innerContainer}>
                <Icon name={data.category.icon} size={24} style={{ color: chooseBetterContrast(data.category.color) }} />
                <View style={styles.text}>
                    <View>
                        <Subheading style={{ color: chooseBetterContrast(data.category.color) }}>{data.category.title}</Subheading>
                        <Caption style={{}}>{data.category.type}</Caption>
                    </View>
                    <Headline style={{ color: chooseBetterContrast(data.category.color) }}>{`${data.amount}`}</Headline>
                </View>
            </View>
        </TouchableRipple>
    )
}

export default TransactionItem

const styles = StyleSheet.create({
    outerContainer: {
        marginTop: 8,
        borderRadius: 16,
    },
    innerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
    },
    text: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
    }
})