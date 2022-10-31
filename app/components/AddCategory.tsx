import {View, StyleSheet, FlatList} from "react-native";
import React, {useState, useCallback, useEffect} from "react";
import {
  Modal,
  Portal,
  Paragraph,
  TextInput,
  IconButton,
} from "react-native-paper";

import {useRealm} from "../realm";
import {Category} from "../realm/Category";
import ColorChoice from "./ColorChoice";
import SelectItem from "./SelectItem";
import IconModal from "./IconModal";

import {COLORS} from "../data";

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
type ValueProps = {title: string; type: string; color: string; icon: string};
const AddCategory = ({visible, item, onDismiss}: Props) => {
  const [values, setValues] = useState<ValueProps>({
    title: "",
    type: "income",
    color: COLORS[0],
    icon: "plus",
  });

  const [iconModal, setIconModal] = useState(false);

  useEffect(() => {
    if (item) {
      const {title, type, color, icon} = item;
      setValues({title, type, color, icon});
    } else {
      setValues({
        title: "",
        type: "income",
        color: COLORS[0],
        icon: "plus",
      });
    }
  }, [item]);
  const realm = useRealm();
  const addNewCategory = useCallback(
    ({title, type, color, icon}: ValueProps) => {
      realm.write(() => {
        realm.create("Category", Category.generate(title, type, color, icon));
        onDismiss();
      });
    },
    [realm, onDismiss],
  );
  const updateCategory = useCallback(
    (category: Category, {title, type, color, icon}: ValueProps) => {
      realm.write(() => {
        if (category.title !== title) category.title = title;
        if (category.color !== color) category.color = color;
        if (category.type !== type) category.type = type;
        if (category.icon !== icon) category.icon = icon;

        onDismiss();
      });
    },
    [realm, onDismiss],
  );

  const changeIcon = useCallback((icon: string) => {
    setValues(prev => ({...prev, icon}));
    setIconModal(false);
  }, []);

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

  const dismissIconModal = useCallback(() => {
    setIconModal(false);
  }, []);

  if (iconModal) {
    return (
      <Portal>
        <IconModal
          visible={true}
          onDismiss={dismissIconModal}
          color={values.color}
          onItemSelect={changeIcon}
        />
      </Portal>
    );
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}>
        <View style={styles.topContainer}>
          <View style={styles.topBtnContainer}>
            <IconButton
              icon="close"
              size={25}
              onPress={onDismiss}
              style={styles.iconBtn}
            />
            {item && (
              <IconButton
                icon="delete"
                size={25}
                onPress={() => deleteCategory(item)}
                style={styles.iconBtn}
              />
            )}
          </View>
          <View>
            <Paragraph style={styles.subheading}>Icon and Title</Paragraph>
            <View style={styles.iconInputContainer}>
              <View style={{backgroundColor: values.color}}>
                <IconButton
                  size={43}
                  icon={values.icon}
                  style={styles.iconBtn}
                  onPress={() => setIconModal(true)}
                />
              </View>
              <TextInput
                value={values.title}
                placeholder="Category Title"
                style={styles.input}
                onChangeText={text =>
                  setValues(prev => ({...prev, title: text}))
                }
              />
            </View>
          </View>
          <IconButton
            size={40}
            icon={item ? "update" : "plus"}
            style={[styles.addBtn, {backgroundColor: values.color}]}
            onPress={handlePressAdd}
          />
        </View>
        <View>
          <Paragraph style={styles.subheading}>Type</Paragraph>
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
          <Paragraph style={styles.subheading}>Color</Paragraph>
          <FlatList
            horizontal={true}
            data={COLORS}
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
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    marginHorizontal: 30,
  },
  topContainer: {
    flexDirection: "column",
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
  iconInputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  addBtn: {
    margin: 0,
    backgroundColor: "orange",
    position: "absolute",
    bottom: -25,
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
