import {StyleSheet} from "react-native";
import React from "react";

import {FlashList} from "@shopify/flash-list";
import {Modal, Portal, Text} from "react-native-paper";

import CategoryItem from "./CategoryItem";
import {useData} from "../providers/DataProvider";
import {Category} from "../realm/Category";
import {useCustomTheme} from "../themes";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onItemSelect: (category: Category) => void;
};

const CategoryModal = ({visible, onDismiss, onItemSelect}: Props) => {
  const {category} = useData();
  const {
    theme: {roundness},
  } = useCustomTheme();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalContainer,
          {borderRadius: roundness * 4},
        ]}
        style={{borderRadius: roundness * 4}}
      >
        <Text style={styles.headline}>Choose Currency</Text>
        <FlashList
          data={category}
          estimatedItemSize={19}
          renderItem={({item}) => (
            <CategoryItem
              item={item}
              onPress={() => onItemSelect(item)}
              style={styles.category}
            />
          )}
        />
      </Modal>
    </Portal>
  );
};

export default CategoryModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 24,
    marginBottom: 24,
  },
  headline: {
    margin: 10,
  },
  category: {
    margin: 8,
  },
});
