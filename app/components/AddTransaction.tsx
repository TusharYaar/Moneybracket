import {StyleSheet, View} from "react-native";
import React, {useState, useCallback, useEffect} from "react";
import {
  Modal,
  Portal,
  Paragraph,
  TextInput,
  IconButton,
  Button,
} from "react-native-paper";
import {Transaction} from "../realm/Transaction";
import CategoryItem from "./CategoryItem";
import {useData} from "../providers/DataProvider";
import {Category} from "../realm/Category";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import CurrencyModal from "./CurrencyModal";
import CategoryModal from "./CategoryModal";
import {useRealm} from "../realm";
import Icon from "react-native-vector-icons/Ionicons";
import {useTranslation} from "react-i18next";
import {useCustomTheme} from "../themes";

type Props = {
  visible: boolean;
  item?: Transaction;
  onDismiss: () => void;
};

type ValueProps = {
  category: Category | null;
  amount: string;
  date: Date;
  note: string;
};
const AddTransaction = ({visible, item, onDismiss}: Props) => {
  const {t} = useTranslation();

  const {theme} = useCustomTheme();

  const [values, setValues] = useState<ValueProps>({
    category: null,
    amount: "0",
    date: new Date(),
    note: "",
  });
  const [currency, setCurrency] = useState("INR");
  const [viewModal, setViewModal] = useState("datepicker");
  const {category} = useData();
  const containerStyle = {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 7,
  };

  const realm = useRealm();

  const addNewTransaction = useCallback(
    ({amount, date, note, category}: ValueProps) => {
      realm.write(() => {
        if (category)
          realm.create(
            "Transaction",
            Transaction.generate(
              parseFloat(amount),
              "INR",
              date,
              note,
              category,
            ),
          );
        onDismiss();
      });
    },
    [realm, onDismiss],
  );

  useEffect(() => {
    setViewModal("transaction");
    if (item) {
      setValues({
        amount: `${item.amount}`,
        category: item.category,
        date: new Date(item.date),
        note: item.note,
      });
    } else {
      setValues({
        amount: "100",
        category: category[0],
        date: new Date(),
        note: "",
      });
    }
  }, [item]);

  const updateDate = useCallback((date: DateTimePickerEvent) => {
    if (date.nativeEvent.timestamp) {
      setValues(prev => ({
        ...prev,
        date: new Date(date.nativeEvent.timestamp as number),
      }));
      setViewModal("transaction");
    }
  }, []);

  const updateCurrency = useCallback((code: string) => {
    setCurrency(code.toUpperCase());
    setViewModal("transaction");
  }, []);

  const updateCategory = useCallback((category: Category) => {
    setValues(prev => ({...prev, category}));
    setViewModal("transaction");
  }, []);

  const dismissDataModal = useCallback(() => {
    setViewModal("transaction");
  }, []);

  const handlePressAdd = () => {
    // if (item) updateTransaction(item, values);
    addNewTransaction(values);
  };

  const deleteTransaction = useCallback(
    (transaction: Transaction) => {
      realm.write(() => {
        realm.delete(transaction);
        onDismiss();
      });
    },
    [realm, onDismiss],
  );

  if (visible && viewModal === "datepicker")
    return (
      <DateTimePicker
        mode="date"
        value={values.date}
        testID="dateTimePicker"
        onChange={updateDate}
      />
    );
  if (visible && viewModal === "currency")
    return (
      <CurrencyModal
        visible={visible}
        onItemSelect={updateCurrency}
        onDismiss={dismissDataModal}
      />
    );
  if (visible && viewModal === "category")
    return (
      <CategoryModal
        visible={visible}
        onItemSelect={updateCategory}
        onDismiss={dismissDataModal}
      />
    );
  if (visible && viewModal === "transaction")
    return (
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onDismiss}
          contentContainerStyle={[
            containerStyle,
            {backgroundColor: theme.colors.background},
          ]}
          style={styles.modal}
        >
          <View
            style={[styles.topContainer, {backgroundColor: theme.colors.card}]}
          >
            <View>
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
                  style={styles.iconBtn}
                  onPress={() => deleteTransaction(item)}
                />
              )}
            </View>
            <Paragraph>{t("date")}</Paragraph>
            <Button
              icon="calendar"
              mode="outlined"
              onPress={() => setViewModal("datepicker")}
            >
              {values.date.toLocaleDateString()}
            </Button>
            <Paragraph>{t("amount")}</Paragraph>
            <View style={styles.amountContainer}>
              <Button mode="contained" onPress={() => setViewModal("currency")}>
                {currency}
              </Button>
              <TextInput
                value={values.amount}
                onChangeText={text =>
                  setValues(prev => ({...prev, amount: text}))
                }
                mode="outlined"
                keyboardType="decimal-pad"
                style={styles.input}
              />
            </View>
            <IconButton
              size={40}
              icon={item ? "checkmark-done" : "add"}
              style={styles.addBtn}
              onPress={handlePressAdd}
            />
          </View>
          <View style={{padding: 10}}>
            <Paragraph>{t("category")}</Paragraph>
            {values.category && (
              <CategoryItem
                item={values.category}
                onPress={() => setViewModal("category")}
              />
            )}
            <Paragraph>
              {t("note")} ({t("optional")})
            </Paragraph>
            <TextInput
              multiline
              mode="outlined"
              value={values.note}
              onChangeText={text => setValues(prev => ({...prev, note: text}))}
            />
          </View>
        </Modal>
      </Portal>
    );
  else {
    return <View />;
  }
};

export default AddTransaction;

const styles = StyleSheet.create({
  topContainer: {
    paddingBottom: 40,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  modal: {
    borderRadius: 7,
  },
  iconBtn: {
    margin: 0,
  },
  addBtn: {
    margin: 0,
    backgroundColor: "orange",
    position: "absolute",
    bottom: -25,
    right: 10,
    zIndex: 10,
  },
});
