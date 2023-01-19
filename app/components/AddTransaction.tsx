import {StyleSheet, View} from "react-native";
import React, {useState, useCallback, useEffect} from "react";
import {TextInput, IconButton, Button, Text} from "react-native-paper";
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
import {useTranslation} from "react-i18next";
import {useCustomTheme} from "../themes";
import {useSettings} from "../providers/SettingsProvider";
import ModalContainer from "./ModalContainer";
import {useExchangeRate} from "../providers/ExchangeRatesProvider";
import Amount from "./Amount";

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

  const {currency: defaultCurrency} = useSettings();
  const {rates} = useExchangeRate();
  const [currency, setCurrency] = useState(defaultCurrency.code);
  const [viewModal, setViewModal] = useState("datepicker");
  const {category} = useData();

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

  const updateTransaction = useCallback(
    (trans: Transaction, values: ValueProps) => {
      realm.write(() => {
        if (trans.date !== values.date) trans.date = values.date;
        if (trans.amount !== parseFloat(values.amount))
          trans.amount = parseFloat(values.amount);
        if (trans.category !== values.category && values.category)
          trans.category = values.category;
        if (trans.note !== values.note) trans.note = values.note;

        onDismiss();
      });
    },
    [onDismiss, realm],
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
    if (item) updateTransaction(item, values);
    else addNewTransaction(values);
  };

  const deleteTransaction = useCallback(
    (transaction: Transaction | undefined) => {
      realm.write(() => {
        if (!transaction) return;
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
      <ModalContainer
        visible={visible}
        title={"Add Transaction"}
        onDelete={() => deleteTransaction(item)}
        showDelete={Boolean(item)}
        barColor={theme.colors.cardToneBackground}
        onDismiss={onDismiss}
      >
        <View
          style={{
            backgroundColor: theme.colors.cardToneBackground,
            padding: 8,
          }}
        >
          <Text variant="labelLarge" style={{marginBottom: 4}}>
            {t("date")}
          </Text>
          <Button
            icon="calendar"
            mode="outlined"
            onPress={() => setViewModal("datepicker")}
          >
            {values.date.toLocaleDateString()}
          </Button>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.cardToneBackground,
            padding: 8,
          }}
        >
          <Text variant="labelLarge">{t("amount")}</Text>
          <TextInput
            right={
              <TextInput.Icon
                onPress={() => setViewModal("currency")}
                icon="repeat"
              />
            }
            left={<TextInput.Affix text={currency} />}
            value={values.amount}
            onChangeText={text => setValues(prev => ({...prev, amount: text}))}
            mode="outlined"
            keyboardType="decimal-pad"
            style={theme.fonts.titleLarge}
          />
          {currency !== defaultCurrency.code ? (
            <Amount
              amount={
                parseFloat(values.amount) *
                (rates.find(rate => rate.code === currency)?.rate as number)
              }
            />
          ) : null}
        </View>
        <View style={styles.dualToneContainer}>
          <View
            style={[
              styles.dualToneColor,
              {backgroundColor: theme.colors.cardToneBackground},
            ]}
          />
          <IconButton
            size={40}
            icon={item ? "checkmark-done" : "add"}
            style={{
              marginHorizontal: 8,
              marginVertical: 0,
              borderRadius: theme.roundness * 4,
              backgroundColor: theme.colors.inversePrimary,
            }}
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
          <Text variant="labelLarge" style={{marginBottom: 4}}>
            {t("category")}
          </Text>
          {values.category && (
            <CategoryItem
              item={values.category}
              onPress={() => setViewModal("category")}
            />
          )}
        </View>
        <View style={{padding: 8}}>
          <Text variant="labelLarge" style={{marginBottom: 0}}>
            {t("note")} ({t("optional")})
          </Text>
          <TextInput
            multiline
            mode="outlined"
            value={values.note}
            onChangeText={text => setValues(prev => ({...prev, note: text}))}
          />
        </View>
      </ModalContainer>
    );
  else {
    return <View />;
  }
};

export default AddTransaction;

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
});
