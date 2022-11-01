import { StyleSheet } from 'react-native'
import React from 'react'

import { FlashList } from "@shopify/flash-list";
import { Modal, Portal, Paragraph, TouchableRipple, Caption, Subheading, Headline, Text } from "react-native-paper";

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
                contentContainerStyle={styles.modal}>
                <Paragraph>Choose Currency</Paragraph>
                <FlashList
                    data={category}
                    estimatedItemSize={19}
                    renderItem={({ item }) => (
                        <CategoryItem item={item} onPress={() => onItemSelect(item)} />
                    )}
                />
            </Modal>
        </Portal>
    )
}

export default CategoryModal

const styles = StyleSheet.create({
    modal: { flex: 1, backgroundColor: "white", margin: 20 },
});