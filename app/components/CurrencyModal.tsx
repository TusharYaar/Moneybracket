import React from "react";
import { StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Modal, Portal, Paragraph, TouchableRipple, Caption, Subheading, Headline, Text } from "react-native-paper";

import { View } from "react-native";

import { Rate, useExchangeRate } from "../providers/ExchangeRatesProvider";

type Props = {
    visible: boolean;
    onDismiss: () => void;
    onItemSelect: (code: string) => void;
};

const CurrencyModal = ({ visible, onDismiss, onItemSelect }: Props) => {
    const { rates } = useExchangeRate();
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={styles.modalContainer}
                style={styles.modal}

            >
                <Paragraph>Choose Currency</Paragraph>
                <FlashList
                    data={rates}
                    estimatedItemSize={19}
                    renderItem={({ item }) => (
                        <Currency item={item} onPress={() => onItemSelect(item.code)} />
                    )}
                />
            </Modal>
        </Portal>
    );
};

export default CurrencyModal;

const styles = StyleSheet.create({
    modal: {
        borderRadius: 7,
    },
    modalContainer: {
        flex: 1,
        margin: 20,
        borderRadius: 7,
        backgroundColor: "white",

    },

});

type CurrencyProps = {
    item: Rate;
    onPress: () => void;
}

const Currency = ({ item: { code, symbol, name, rate }, onPress }: CurrencyProps) => {
    return (
        <TouchableRipple onPress={onPress}>
            <View style={itemStyles.container}>
                <View style={itemStyles.symbol}><Headline>{symbol}</Headline></View>
                <View style={itemStyles.textContainer}>
                    <Subheading>{name}</Subheading>
                    <Caption>1000 Your curr = {rate.toFixed(2)}</Caption>
                </View>
            </View>
        </TouchableRipple>
    )
}

const itemStyles = StyleSheet.create({
    container: {
        // modal: { flex: 1, backgroundColor: "white", margin: 20 },
        padding: 10,
        flexDirection: "row"
    },
    textContainer: {
        flexDirection: "column",
        flex: 1,
    },
    symbol: {
        width: 70,
        justifyContent: "center"
    }
})

