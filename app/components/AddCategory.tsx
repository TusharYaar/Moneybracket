import {View, StyleSheet, FlatList} from "react-native";
import React, {useState, useCallback, useEffect} from "react";
import {
  Modal,
  Portal,
  Subheading,
  TextInput,
  IconButton,
} from "react-native-paper";

import {useRealm} from "../realm";
import {Category} from "../realm/Category";
import ColorChoice from "./ColorChoice";
import SelectItem from "./SelectItem";

const COLOR_OPTIONS = [
  // "#d5001a",
  "#ff6a00",
  "#ffb507",
  "#ffd972",
  "#fff5da",
  "#f2f8d7",
  "#b2ddcc",
  "#42b3d5",
  // "#27539b",
  // "#182276",
];

const CATEGORY_TYPES = [
  {
    title: "Income",
    value: "income",
    icon: "plus",
  },
  {
    title: "Expense",
    value: "expense",
    icon: "minus",
  },
];

type Props = {
  visible: boolean;
  item?: Category;
  onDismiss: () => void;
};
type ValueProps = {title: string; type: string; color: string};
const AddCategory = ({visible, item, onDismiss}: Props) => {
  const [values, setValues] = useState<ValueProps>({
    title: "",
    type: "income",
    color: COLOR_OPTIONS[0],
  });
  useEffect(() => {
    if (item) {
      const {title, type, color} = item;
      setValues({title, type, color});
    } else {
      setValues({title: "", type: "income", color: COLOR_OPTIONS[0]});
    }
  }, [item]);
  const realm = useRealm();
  const addNewCategory = useCallback(
    ({title, type, color}: ValueProps) => {
      realm.write(() => {
        realm.create("Category", Category.generate(title, type, color));
        onDismiss();
      });
    },
    [realm, onDismiss],
  );
  const updateCategory = useCallback(
    (category: Category, {title, type, color}: ValueProps) => {
      realm.write(() => {
        if (category.title !== title) category.title = title;
        if (category.color !== color) category.color = color;
        if (category.type !== type) category.type = type;
        onDismiss();
      });
    },
    [realm, onDismiss],
  );

  const handlePressAdd = () => {
    if (item) updateCategory(item, values);
    else addNewCategory(values);
  };

  const deleteCategory = useCallback(
    (category: Category) => {
      realm.write(() => {
        realm.delete(category);
        onDismiss();
      });
    },
    [realm, onDismiss],
  );

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onDismiss}
          contentContainerStyle={styles.modal}>
          <View style={styles.topContainer}>
            <View style={styles.topBtnContainer}>
              <IconButton
                icon="close"
                size={30}
                onPress={onDismiss}
                style={styles.iconBtn}
              />
              {item && (
                <IconButton
                  icon="delete"
                  size={30}
                  onPress={() => deleteCategory(item)}
                  style={styles.iconBtn}
                />
              )}
            </View>
            <View style={styles.titleContainer}>
              <Subheading>Category Title</Subheading>
              <TextInput
                value={values.title}
                placeholder="Category Title"
                onChangeText={text =>
                  setValues(prev => ({...prev, title: text}))
                }
              />
            </View>
            <IconButton
              size={40}
              icon={item ? "update" : "plus"}
              style={[styles.addBtn, {backgroundColor: values.color}]}
              onPress={handlePressAdd}
            />
          </View>
          <View>
            <Subheading style={styles.subheading}>Category Type</Subheading>
            <FlatList
              horizontal={true}
              data={CATEGORY_TYPES}
              renderItem={option => (
                <SelectItem
                  selected={values.type === option.item.value}
                  text={option.item.title}
                  icon={option.item.icon}
                  onPress={() =>
                    setValues(prev => ({...prev, type: option.item.value}))
                  }
                />
              )}
              contentContainerStyle={styles.colors}
            />
          </View>
          <View>
            <Subheading style={styles.subheading}>Category Color</Subheading>
            <FlatList
              horizontal={true}
              data={COLOR_OPTIONS}
              renderItem={option => (
                <ColorChoice
                  key={option.item}
                  color={option.item}
                  onPress={() =>
                    setValues(prev => ({...prev, color: option.item}))
                  }
                  selected={values.color === option.item}
                />
              )}
              contentContainerStyle={styles.colors}
            />
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    marginHorizontal: 30,
  },
  topContainer: {
    position: "relative",
    paddingBottom: 40,
    backgroundColor: "#f2f8d7",
  },
  topBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconBtn: {
    margin: 0,
  },
  titleContainer: {
    paddingHorizontal: 10,
  },
  addBtn: {
    margin: 0,
    backgroundColor: "orange",
    position: "absolute",
    bottom: -30,
    right: 10,
  },
  typeContainer: {
    padding: 10,
  },
  typeOptions: {
    flexDirection: "row",
  },
  subheading: {
    marginLeft: 10,
  },
  colors: {
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
});
