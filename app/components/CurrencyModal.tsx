import React from "react";
import { StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Modal, Portal, Paragraph, TouchableRipple, Caption, Subheading, Headline, Text } from "react-native-paper";

import { View } from "react-native";

import { CURRENCIES } from "../data";

type Props = {
    visible: boolean;
    onDismiss: () => void;
    onItemSelect: (code: string) => void;
};

const CurrencyModal = ({ visible, onDismiss, onItemSelect }: Props) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={styles.modal}>
                <Paragraph>Choose Currency</Paragraph>
                <FlashList
                    data={CURRENCIES}
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
    modal: { flex: 1, backgroundColor: "white", margin: 20 },
});

type CurrencyProps = {
    item: typeof CURRENCIES[0];
    onPress: () => void;
}

const Currency = ({ item: { code, symbol, name }, onPress }: CurrencyProps) => {
    return (<TouchableRipple onPress={onPress}>
        <View style={itemStyles.container}>
            <View style={itemStyles.symbol}><Headline>{symbol}</Headline></View>
            <View style={itemStyles.textContainer}>
                <Subheading>{name}</Subheading>
                <Caption>rate</Caption>
            </View>
        </View>
    </TouchableRipple>
    )
}

const itemStyles = StyleSheet.create({
    container: {
        modal: { flex: 1, backgroundColor: "white", margin: 20 },
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

