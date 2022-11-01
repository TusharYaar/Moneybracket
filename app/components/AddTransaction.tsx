import { StyleSheet, View } from 'react-native'
import React, { useState, useCallback, useEffect } from "react";
import {
    Modal,
    Portal,
    Paragraph,
    TextInput,
    IconButton,
    Button
} from "react-native-paper";
import { Transaction } from '../realm/Transaction';
import CategoryItem from './CategoryItem';
import { useData } from '../providers/DataProvider';
import { Category } from '../realm/Category';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import CurrencyModal from './CurrencyModal';
import CategoryModal from './CategoryModal';
import { useRealm } from '../realm';


type Props = {
    visible: boolean;
    item?: Transaction;
    onDismiss: () => void;
};

type ValueProps = {
    category: Category | null,
    amount: string;
    date: Date;
    note: string;
}
const AddTransaction = ({ visible, item, onDismiss }: Props) => {
    const [values, setValues] = useState<ValueProps>({
        category: null,
        amount: "0",
        date: new Date(),
        note: ""
    });
    const [currency, setCurrency] = useState("INR");
    const [viewModal, setViewModal] = useState("datepicker");
    const { category } = useData();
    const containerStyle = { backgroundColor: 'white', marginHorizontal: 10, };

    const realm = useRealm();


    const addNewTransaction = useCallback(
        ({ amount, date, note, category, }: ValueProps) => {
            realm.write(() => {
                if (category)
                    realm.create("Transaction", Transaction.generate(parseFloat(amount), "INR", date, note, category));
                onDismiss();
            });
        },
        [realm, onDismiss],
    );

    useEffect(() => {
        setViewModal("transaction");
        if (item) { }
        else {
            setValues({
                amount: "100",
                category: category[0],
                date: new Date(),
                note: "",
            })
        }
    }, [item]);

    const updateDate = useCallback((date: DateTimePickerEvent) => {
        if (date.nativeEvent.timestamp) {
            setValues(prev => ({ ...prev, date: new Date(date.nativeEvent.timestamp as number) }))
            setViewModal("transaction");
        }
    }, []);

    const updateCurrency = useCallback((code: string) => {
        setCurrency(code.toUpperCase());
        setViewModal("transaction");
    }, [])

    const updateCategory = useCallback((category: Category) => {
        setValues(prev => ({ ...prev, category }))
        setViewModal("transaction");
    }, []);

    const dismissDataModal = useCallback(() => {
        setViewModal("transaction")
    }, []);

    if (visible && viewModal === "datepicker") return < DateTimePicker mode="date" value={values.date} testID="dateTimePicker" onChange={updateDate} />

    if (visible && viewModal === "currency") return <CurrencyModal visible={visible} onItemSelect={updateCurrency} onDismiss={dismissDataModal} />

    if (visible && viewModal === "category") return <CategoryModal visible={visible} onItemSelect={updateCategory} onDismiss={dismissDataModal} />

    if (visible && viewModal === "transaction")
        return (
            <Portal>
                <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={containerStyle}>
                    <View style={styles.topContainer}>
                        <Paragraph>Date</Paragraph>
                        <Button icon="calendar" mode='outlined' onPress={() => setViewModal("datepicker")}>{values.date.toLocaleDateString()}</Button>
                        <Paragraph>Amount</Paragraph>
                        <View style={styles.amountContainer}>
                            <Button mode='contained' onPress={() => setViewModal("currency")}>{currency}</Button>
                            <TextInput mode="outlined" keyboardType="decimal-pad" style={styles.input} />
                        </View>
                        <IconButton
                            size={40}
                            icon={item ? "update" : "plus"}
                            style={styles.addBtn}
                            onPress={() => addNewTransaction(values)}
                        />
                    </View>
                    <View style={{ padding: 10, }}>

                        <Paragraph>Category</Paragraph>
                        {values.category && <CategoryItem item={values.category} onPress={() => setViewModal("category")} />}
                        <Paragraph>Note (Optional)</Paragraph>
                        <TextInput multiline mode='outlined' />
                    </View>
                </Modal>
            </Portal>
        )
    else {
        return <View />;
    }
}

export default AddTransaction

const styles = StyleSheet.create({
    topContainer: {
        padding: 10,
        paddingBottom: 40,
        backgroundColor: "#f2f8d7"
    },
    amountContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
    },
    addBtn: {
        margin: 0,
        backgroundColor: "orange",
        position: "absolute",
        bottom: -25,
        right: 10,
        zIndex: 10,
    },
})