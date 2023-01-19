import {StyleSheet} from "react-native";
import React from "react";

import {FlashList} from "@shopify/flash-list";

import CategoryItem from "./CategoryItem";
import {useData} from "../providers/DataProvider";
import {Category} from "../realm/Category";
import {useCustomTheme} from "../themes";
import ModalContainer from "./ModalContainer";

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
    <ModalContainer
      visible={visible}
      title="Choose Category"
      onDismiss={onDismiss}
      contentContainerStyle={{flex: 1}}
    >
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
    </ModalContainer>
  );
};

export default CategoryModal;

const styles = StyleSheet.create({
  category: {
    margin: 8,
  },
});
