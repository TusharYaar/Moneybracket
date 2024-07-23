import { StyleSheet, View } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { TextInput, IconButton, Text } from "react-native-paper";

import CategoryItem from "../CategoryItem";
import { Category } from "../../realm/Category";

import CurrencyModal from "./CurrencyModal";
import CategoryModal from "./CategoryModal";
import { useRealm } from "@realm/react";
import { useTranslation } from "react-i18next";
import { useCustomTheme } from "../../providers/ThemeProvider";

import { useSettings } from "../../providers/SettingsProvider";
import ModalContainer from "./ModalContainer";
import { useExchangeRate } from "../../providers/ExchangeRatesProvider";
import Amount from "../Amount";
import DeleteDialog from "../DeleteDialog";
import { Shortcut } from "../../realm/Shortcut";

const MAX_SHORTCUTS = 4;

type Props = {
  visible: boolean;
  item?: Shortcut;
  onDismiss: () => void;
  category: Realm.Results<Category>;
};

type ValueProps = {
  title: string;
  category: Category | null;
  amount: string;
  note: string;
  currency: string;
};

const AddShortcut = ({ visible, item, onDismiss, category }: Props) => {
  const { t } = useTranslation("", { keyPrefix: "components.addShortcut" });
  const { currency: defaultCurrency } = useSettings();
  const { theme } = useCustomTheme();
  const [values, setValues] = useState<ValueProps>({
    title: "",
    category: null,
    amount: "0",
    note: "",
    currency: defaultCurrency.code,
  });

  const { rates } = useExchangeRate();
  const [viewModal, setViewModal] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const realm = useRealm();

  const addNewShortcut = useCallback(
    async ({ amount, note, category, title }: ValueProps) => {
      realm.write(() => {
        if (category) {
          const icon = `color_${category.color.slice(1).toLowerCase()}`;
          realm.create("Shortcut", Shortcut.generate(title, parseFloat(amount), "INR", note, category, icon));
        }
        onDismiss();
      });
    },
    [realm, onDismiss]
  );

  const updateShortcut = useCallback(
    async (cut: Shortcut, values: ValueProps) => {
      realm.write(() => {
        if (cut.amount !== parseFloat(values.amount)) cut.amount = parseFloat(values.amount);
        if (cut.category !== values.category && values.category) cut.category = values.category;
        if (cut.note !== values.note) cut.note = values.note;
        if (cut.title !== values.title) cut.title = values.title;
        onDismiss();
      });
    },
    [onDismiss, realm]
  );

  useEffect(() => {
    setViewModal("shortcut");
    if (item) {
      const { amount, category, note, title } = item;
      setValues({
        title,
        amount: `${amount}`,
        category: category,
        note: note,
        currency: defaultCurrency.code,
      });
    } else {
      setValues({
        amount: "100",
        title: `100${category.length > 0 ? " for " + category[0].title : ""}`,
        category: category.length > 0 ? category[0] : null,
        note: "",
        currency: defaultCurrency.code,
      });
    }
  }, [item, defaultCurrency, category]);

  const updateCurrency = useCallback((code: string) => {
    setValues((prev) => ({ ...prev, currency: code.toUpperCase() }));
    setViewModal("shortcut");
  }, []);

  const updateCategory = useCallback((category: Category) => {
    setValues((prev) => ({ ...prev, category }));
    setViewModal("shortcut");
  }, []);

  const dismissDataModal = useCallback(() => {
    setViewModal("shortcut");
  }, []);

  const handlePressAdd = () => {
    if (item) updateShortcut(item, values);
    else addNewShortcut(values);
  };

  const deleteShortcut = useCallback(
    (shortcut: Shortcut | undefined) => {
      setShowDelete(false);
      realm.write(() => {
        if (!shortcut) return;
        realm.delete(shortcut);
        console.log("deleted");
        onDismiss();
      });
    },
    [realm, onDismiss]
  );

  if (visible && viewModal === "currency")
    return <CurrencyModal visible={visible} onItemSelect={updateCurrency} onDismiss={dismissDataModal} />;
  if (visible && viewModal === "category")
    return (
      <CategoryModal visible={visible} onItemSelect={updateCategory} onDismiss={dismissDataModal} category={category} />
    );
  if (visible && viewModal === "shortcut")
    return (
      <ModalContainer
        visible={visible}
        title={t("title")}
        showRightActionButton={Boolean(item)}
        rightActionIcon="trash-outline"
        rightActionOnPress={() => setShowDelete(true)}
        barColor={theme.colors.cardToneBackground}
        onDismiss={onDismiss}
      >
        <View
          style={{
            backgroundColor: theme.colors.cardToneBackground,
            padding: 8,
            paddingTop: 0,
          }}
        >
          <Text variant="labelLarge" style={[styles.inputLabel, { marginTop: 0 }]}>
            {t("title")}
          </Text>
          <TextInput
            value={values.title}
            onChangeText={(text) => setValues((prev) => ({ ...prev, title: text }))}
            mode="outlined"
            style={[theme.fonts.bodyLarge, styles.input]}
          />
          <Text variant="labelLarge" style={styles.inputLabel}>
            {t("amount")}
          </Text>
          <TextInput
            right={<TextInput.Icon onPress={() => setViewModal("currency")} icon="repeat" />}
            left={<TextInput.Affix text={values.currency} />}
            value={values.amount}
            onChangeText={(text) => setValues((prev) => ({ ...prev, amount: text }))}
            mode="outlined"
            keyboardType="decimal-pad"
            style={[theme.fonts.titleLarge, styles.input]}
          />
          {values.currency !== defaultCurrency.code ? (
            <Amount
              amount={parseFloat(values.amount) * (rates.find((rate) => rate.code === values.currency)?.rate as number)}
            />
          ) : null}
        </View>
        <View style={styles.dualToneContainer}>
          <View style={[styles.dualToneColor, { backgroundColor: theme.colors.cardToneBackground }]} />
          <IconButton
            size={40}
            icon={item ? "checkmark-done" : "add"}
            style={{
              marginHorizontal: 8,
              marginVertical: 0,
              borderRadius: theme.roundness * 4,
              backgroundColor: theme.colors.inversePrimary,
            }}
            disabled={values.category === null}
            onPress={handlePressAdd}
          />
        </View>
        <View
          style={{
            backgroundColor: theme.colors.surface,
            zIndex: -1,
            paddingHorizontal: 8,
          }}
        >
          <Text variant="labelLarge" style={[styles.inputLabel, { marginTop: 0 }]}>
            {t("category")}
          </Text>
          {!values.category && <Text>Please Add A category</Text>}
          {values.category && <CategoryItem item={values.category} onPress={() => setViewModal("category")} />}
        </View>

        <View style={{ padding: 8 }}>
          <Text variant="labelLarge" style={styles.inputLabel}>
            {`${t("note")} (${t("optional")})`}
          </Text>
          <TextInput
            multiline
            style={[theme.fonts.bodyLarge, styles.input]}
            mode="outlined"
            value={values.note}
            onChangeText={(text) => setValues((prev) => ({ ...prev, note: text }))}
          />
        </View>

        <DeleteDialog
          visible={showDelete}
          cancelAction={() => setShowDelete(false)}
          deleteAction={() => deleteShortcut(item)}
        />
      </ModalContainer>
    );
  else {
    return <View />;
  }
};

export default AddShortcut;

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
  image: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  input: {
    marginTop: -4,
  },
  inputLabel: {
    marginTop: 8,
    marginBottom: 4,
  },
});
