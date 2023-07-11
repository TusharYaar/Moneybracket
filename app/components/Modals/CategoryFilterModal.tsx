import { StyleSheet, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import CategoryItem from "../CategoryItem";
import { Category } from "../../realm/Category";
import { useCustomTheme } from "../../providers/ThemeProvider";

import ModalContainer from "./ModalContainer";

type Props = {
  title?: string;
  visible: boolean;
  onDismiss: () => void;
  selectedCategory: string[];
  onSelectedCategoryUpdate: (categories: string[]) => void;
  category: Realm.Results<Category>;
};

const CategoryFilterModal = ({
  title = "Choose Category",
  visible,
  onDismiss,
  category,
  selectedCategory,
  onSelectedCategoryUpdate,
}: Props) => {
  const [selected, setSelected] = useState([]);
  const { theme } = useCustomTheme();

  useEffect(() => {
    setSelected(selectedCategory);
  }, [selectedCategory]);

  const updateSelected = useCallback((id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }, []);

  return (
    <ModalContainer
      visible={visible}
      title={title}
      onDismiss={onDismiss}
      contentContainerStyle={{ flex: 1, height: 500 }}
      showRightActionButton={true}
      rightActionIcon="checkmark"
      rightActionOnPress={() => onSelectedCategoryUpdate(selected)}
    >
      <ScrollView>
        {category.map((item) => (
          <CategoryItem
            item={item}
            onPress={() => updateSelected(item._id.toHexString())}
            style={styles.category}
            key={item._id.toHexString()}
            itemColor={!selected.includes(item._id.toHexString()) && theme.colors.onSurfaceDisabled}
          />
        ))}
      </ScrollView>
    </ModalContainer>
  );
};

export default CategoryFilterModal;

const styles = StyleSheet.create({
  category: {
    margin: 8,
  },
});
