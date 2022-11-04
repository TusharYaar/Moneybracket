import { StyleSheet } from 'react-native'
import React from 'react'

import { FlashList } from "@shopify/flash-list";
import { Modal, Portal, Subheading } from "react-native-paper";

import CategoryItem from './CategoryItem';
import { useData } from '../providers/DataProvider';
import { Category } from '../realm/Category';

type Props = {
    visible: boolean;
    onDismiss: () => void;
    onItemSelect: (category: Category) => void;
};

const CategoryModal = ({ visible, onDismiss, onItemSelect }: Props) => {
    const { category } = useData();
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={styles.modalContainer}
                style={styles.modal}
            >
                <Subheading style={styles.headline}>Choose Currency</Subheading>
                <FlashList
                    data={category}
                    estimatedItemSize={19}
                    renderItem={({ item }) => (
                        <CategoryItem item={item} onPress={() => onItemSelect(item)} style={styles.category} />
                    )}
                />
            </Modal>
        </Portal>
    )
}

export default CategoryModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "white",
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 7,
    },
    modal: {
        borderRadius: 7
    },
    headline: {
        margin: 10,
    },
    category: {
        marginVertical: 5,
        marginHorizontal: 10,
    }
});