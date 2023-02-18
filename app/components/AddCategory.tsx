import { View, StyleSheet, FlatList } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { Text, TextInput, IconButton, SegmentedButtons } from "react-native-paper";

import { useRealm } from "../realm";
import { Category } from "../realm/Category";
import ColorChoice from "./ColorChoice";
import IconModal from "./IconModal";

import { COLORS, ICONS } from "../data";
import { useTranslation } from "react-i18next";
import { useCustomTheme } from "../themes";

import { chooseBetterContrast } from "../utils/colors";
import ModalContainer from "./ModalContainer";
import { useDebounce } from "use-debounce";

const CATEGORY_TYPES = [
  {
    label: "income",
    value: "income",
    icon: "add",
  },
  {
    label: "expense",
    value: "expense",
    icon: "remove",
  },
  {
    label: "transfer",
    value: "transfer",
    icon: "swap-horizontal",
  },
];

type Props = {
  visible: boolean;
  item?: Category;
  onDismiss: () => void;
};
type ValueProps = {
  title: string;
  type: "income" | "expense" | "transfer";
  color: string;
  icon: string;
};
const AddCategory = ({ visible, item, onDismiss }: Props) => {
  const { t } = useTranslation("", {
    keyPrefix: "components.addCategory",
  });
  const { t: wt } = useTranslation();
  const { theme } = useCustomTheme();
  const [values, setValues] = useState<ValueProps>({
    title: "",
    type: "income",
    color: COLORS[0],
    icon: "add",
  });

  const [iconModal, setIconModal] = useState(false);
  const [search] = useDebounce(values.title, 500);

  useEffect(() => {
    const icon = ICONS.find((i) => i.toLowerCase().includes(search.toLowerCase()));
    if (icon) setValues((prev) => ({ ...prev, icon }));
  }, [search]);

  useEffect(() => {
    if (item) {
      const { title, type, color, icon } = item;
      setValues({ title, type, color, icon });
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

  const changeType = useCallback((type: ValueProps["type"]) => {
    setValues((prev) => ({ ...prev, type }));
  }, []);

  const addNewCategory = useCallback(
    ({ title, type, color, icon }: ValueProps) => {
      realm.write(() => {
        realm.create("Category", Category.generate(title, type, color, icon));
        onDismiss();
      });
    },
    [realm, onDismiss]
  );
  const updateCategory = useCallback(
    (category: Category, { title, type, color, icon }: ValueProps) => {
      realm.write(() => {
        if (category.title !== title) category.title = title;
        if (category.color !== color) category.color = color;
        if (category.type !== type) category.type = type;
        if (category.icon !== icon) category.icon = icon;
        onDismiss();
      });
    },
    [realm, onDismiss]
  );

  const changeIcon = useCallback((icon: string) => {
    setValues((prev) => ({ ...prev, icon }));
    setIconModal(false);
  }, []);

  const handlePressAdd = () => {
    if (item) updateCategory(item, values);
    else addNewCategory(values);
  };

  const deleteCategory = useCallback(
    (category: Category | undefined) => {
      realm.write(() => {
        if (!category) return;
        realm.delete(category);
        onDismiss();
      });
    },
    [realm, onDismiss]
  );

  const dismissIconModal = useCallback(() => {
    setIconModal(false);
  }, []);

  if (iconModal) {
    return <IconModal visible={true} onDismiss={dismissIconModal} color={values.color} onItemSelect={changeIcon} />;
  }

  return (
    <ModalContainer
      title={t("title")}
      visible={visible}
      showDelete={Boolean(item)}
      onDismiss={onDismiss}
      onDelete={() => deleteCategory(item)}
      barColor={theme.colors.cardToneBackground}
    >
      <View style={[{ backgroundColor: theme.colors.cardToneBackground, padding: 8 }]}>
        <Text variant="labelLarge">{t("iconAndTitle")}</Text>
        <TextInput
          left={
            <TextInput.Icon
              icon={values.icon}
              style={{ borderRadius: theme.roundness * 4 }}
              onPress={() => setIconModal(true)}
            />
          }
          value={values.title}
          placeholder="Category Title"
          mode="outlined"
          style={theme.fonts.titleLarge}
          onChangeText={(text) => setValues((prev) => ({ ...prev, title: text }))}
        />
      </View>
      <View style={styles.dualToneContainer}>
        <View style={[styles.dualToneColor, { backgroundColor: theme.colors.cardToneBackground }]} />
        <IconButton
          iconColor={chooseBetterContrast(values.color)}
          size={40}
          icon={item ? "checkmark-done" : "add"}
          style={{
            marginHorizontal: 8,
            marginVertical: 0,
            backgroundColor: values.color,
            borderRadius: theme.roundness * 4,
          }}
          onPress={handlePressAdd}
        />
      </View>
      <View style={{ paddingHorizontal: 8 }}>
        <Text variant="labelLarge" style={{ marginBottom: 4 }}>
          {t("type")}
        </Text>
        <SegmentedButtons
          value={values.type}
          onValueChange={(type) => changeType(type as ValueProps["type"])}
          buttons={CATEGORY_TYPES.map((type) => ({ ...type, label: wt(type.label) }))}
        />
      </View>
      <View>
        <Text variant="labelLarge" style={{ margin: 8, marginBottom: 4 }}>
          {t("color")}
        </Text>
        <FlatList
          horizontal={true}
          data={COLORS}
          renderItem={(option) => (
            <ColorChoice
              key={option.item}
              color={option.item}
              onPress={() => setValues((prev) => ({ ...prev, color: option.item }))}
              selected={values.color === option.item}
            />
          )}
          contentContainerStyle={styles.colors}
        />
      </View>
    </ModalContainer>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  dualToneContainer: {
    position: "relative",
    alignItems: "flex-end",
  },
  dualToneColor: {
    width: "100%",
    height: "50%",
    position: "absolute",
    left: 0,
    top: 0,
  },
  colors: {
    paddingBottom: 8,
    paddingHorizontal: 5,
  },
});
