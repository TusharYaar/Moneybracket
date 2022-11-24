import {View, StyleSheet, FlatList} from "react-native";
import React, {useState, useCallback, useEffect} from "react";
import {
  Modal,
  Portal,
  Paragraph,
  TextInput,
  IconButton,
  Chip,
} from "react-native-paper";

import {useRealm} from "../realm";
import {Category} from "../realm/Category";
import ColorChoice from "./ColorChoice";
import IconModal from "./IconModal";

import {COLORS} from "../data";
import {useTranslation} from "react-i18next";
import {useCustomTheme} from "../themes";

const CATEGORY_TYPES = [
  {
    title: "income",
    value: "income",
    icon: "add",
  },
  {
    title: "expense",
    value: "expense",
    icon: "remove",
  },
];

type Props = {
  visible: boolean;
  item?: Category;
  onDismiss: () => void;
};
type ValueProps = {title: string; type: string; color: string; icon: string};
const AddCategory = ({visible, item, onDismiss}: Props) => {
  const {theme} = useCustomTheme();

  const {t} = useTranslation();
  const [values, setValues] = useState<ValueProps>({
    title: "",
    type: "income",
    color: COLORS[0],
    icon: "add",
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
        icon: "add",
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
        style={styles.modal}
        contentContainerStyle={styles.modalContainer}
      >
        <View
          style={[
            styles.topContainer,
            {backgroundColor: theme.colors.cardToneBackground},
          ]}
        >
          <View style={styles.topBtnContainer}>
            <IconButton
              icon="close"
              size={25}
              onPress={onDismiss}
              style={styles.iconBtn}
            />
            {item && (
              <IconButton
                icon="trash"
                size={25}
                onPress={() => deleteCategory(item)}
                style={styles.iconBtn}
              />
            )}
          </View>
          <View>
            <Paragraph style={styles.subheading}>
              {t("addCategory.iconAndTitle")}
            </Paragraph>
            <View style={styles.iconInputContainer}>
              <View
                style={{
                  backgroundColor: values.color,
                  borderTopLeftRadius: 7,
                  borderBottomLeftRadius: 7,
                }}
              >
                <IconButton
                  size={38}
                  icon={values.icon}
                  style={styles.iconBtn}
                  onPress={() => setIconModal(true)}
                />
              </View>
              <TextInput
                value={values.title}
                placeholder="Category Title"
                mode="outlined"
                style={styles.input}
                onChangeText={text =>
                  setValues(prev => ({...prev, title: text}))
                }
              />
            </View>
          </View>
          <IconButton
            size={40}
            icon={item ? "checkmark-done" : "add"}
            style={[styles.addBtn, {backgroundColor: values.color}]}
            onPress={handlePressAdd}
          />
        </View>
        <View>
          <Paragraph style={styles.subheading}>
            {t("addCategory.type")}
          </Paragraph>
          <FlatList
            horizontal={true}
            data={CATEGORY_TYPES}
            renderItem={option => (
              <Chip
                selected={values.type === option.item.value}
                icon={
                  values.type === option.item.value
                    ? "checkmark"
                    : option.item.icon
                }
                onPress={() =>
                  setValues(prev => ({...prev, type: option.item.value}))
                }
              >
                {t(option.item.title)}
              </Chip>
            )}
            contentContainerStyle={styles.colors}
          />
        </View>
        <View>
          <Paragraph style={styles.subheading}>
            {t("addCategory.color")}
          </Paragraph>
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
    borderRadius: 7,
  },

  modalContainer: {
    borderRadius: 7,
    backgroundColor: "white",
    marginHorizontal: 30,
  },
  topContainer: {
    flexDirection: "column",
    position: "relative",
    paddingBottom: 40,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
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
