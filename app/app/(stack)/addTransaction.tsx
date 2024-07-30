import { Image, StyleSheet, View } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { TextInput, IconButton, Button, Text, TouchableRipple, Dialog } from "react-native-paper";
import { Transaction } from "../../realm/Transaction";
// import CategoryItem from "../CategoryItem";
import { Category } from "../../realm/Category";

// import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
// import CurrencyModal from "../CurrencyModal";
// import CategoryModal from "./CategoryModal";
// import { useRealm } from "../../realm";
import { useTranslation } from "react-i18next";
import { useCustomTheme } from "../../providers/ThemeProvider";

import { useSettings } from "../../providers/SettingsProvider";
// import ModalContainer from "./ModalContainer";
import { useExchangeRate } from "../../providers/ExchangeRatesProvider";
// import Amount from "../Amount";
// import DeleteDialog from "../DeleteDialog";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { IMAGES_DIRECTORY } from "../../data";
import { format } from "date-fns";
import Amount from "../../components/Amount";
import CategoryItem from "../../components/CategoryItem";
import { useRealm } from "@realm/react";
import { useRouter } from "expo-router";
import { useData } from "../../providers/DataProvider";

type Props = {
  visible: boolean;
  item?: Transaction;
  onDismiss: () => void;
  category: Realm.Results<Category>;
};

type ValueProps = {
  category: Category | null;
  amount: string;
  date: Date;
  note: string;
  currency: string;
  image: string;
};
const AddTransaction = () => {
  const { t } = useTranslation("", { keyPrefix: "components.addTransaction" });
  const { currency: defaultCurrency, dateFormat } = useSettings();
  const {category} = useData();
  const { theme } = useCustomTheme();
  const [values, setValues] = useState<ValueProps>({
    category: null,
    amount: "0",
    date: new Date(),
    note: "",
    currency: defaultCurrency.code,
    image: "",
  });

  const { rates } = useExchangeRate();
  const router = useRouter();
  // const [viewModal, setViewModal] = useState("datepicker");
  const [showDelete, setShowDelete] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const [imagePermission, requestImagePermission] = ImagePicker.useMediaLibraryPermissions();



//   const checkFolder = useCallback(async () => {
//     const { exists } = await FileSystem.getInfoAsync(IMAGES_DIRECTORY);
//     if (!exists) {
//       await FileSystem.makeDirectoryAsync(IMAGES_DIRECTORY, { intermediates: true });
//     }
//   }, []);

//   useEffect(() => {
//     checkFolder();
//   }, []);

    useEffect(() => {
      setValues(prev => ({...prev, category: category[0]}));

    },[]);

//   useEffect(() => {
//     // if (imagePermission && !imagePermission.granted && imagePermission.canAskAgain) requestImagePermission();
//   }, [cameraPermission, requestCameraPermission, imagePermission, requestImagePermission]);

  const realm = useRealm();

  const moveImage = useCallback(async (image: string) => {
    const name = image.split("/");
    await FileSystem.moveAsync({
      from: image,
      to: `${IMAGES_DIRECTORY}/${name[name.length - 1]}`,
    });
    return `${IMAGES_DIRECTORY}/${name[name.length - 1]}`;
  }, []);


  const addNewTransaction = async () => {
      const img = values.image.length > 0 ? await moveImage(values.image) : "";
      realm.write(() => {
        if (values.category) {
          realm.create(
            "Transaction",
            Transaction.generate(parseFloat(values.amount), "INR", values.date, values.note, values.category, false, img)
          );
        }
      });
      router.back();
    };

  const updateTransaction = useCallback(
    async (trans: Transaction, values: ValueProps) => {
      const img = values.image.length > 0 ? await moveImage(values.image) : "";

      // realm.write(() => {
      //   if (trans.date !== values.date) trans.date = values.date;
      //   if (trans.amount !== parseFloat(values.amount)) trans.amount = parseFloat(values.amount);
      //   if (trans.category !== values.category && values.category) trans.category = values.category;
      //   if (trans.note !== values.note) trans.note = values.note;
      //   if (trans.image !== values.image) trans.image = img;
      //   onDismiss();
      // });
    },
    [moveImage]
  );

  // useEffect(() => {
  //   setViewModal("transaction");
    // if (item) {
    //   const { amount, category, date, note, image } = item;
    //   setValues({
    //     amount: `${amount}`,
    //     category: category,
    //     date: new Date(date),
    //     note: note,
    //     currency: defaultCurrency.code,
    //     image,
    //   });
    // } else {
    //   setValues({
    //     amount: "100",
    //     category: category.length > 0 ? category[0] : null,
    //     date: new Date(),
    //     note: "",
    //     currency: defaultCurrency.code,
    //     image: "",
    //   });
    // }
  // }, []);

  // const updateDate = useCallback((date: DateTimePickerEvent) => {
  //   if (date.nativeEvent.timestamp) {
  //     setValues((prev) => ({
  //       ...prev,
  //       date: new Date(date.nativeEvent.timestamp as number),
  //     }));
  //     // setViewModal("transaction");
  //   }
  // }, []);

//   const updateCurrency = useCallback((code: string) => {
//     setValues((prev) => ({ ...prev, currency: code.toUpperCase() }));
//     setViewModal("transaction");
//   }, []);

//   const updateCategory = useCallback((category: Category) => {
//     setValues((prev) => ({ ...prev, category }));
//     setViewModal("transaction");
//   }, []);

//   const dismissDataModal = useCallback(() => {
//     setViewModal("transaction");
//   }, []);

  const handlePressAdd = () => {
    // if (item) updateTransaction(item, values);
    // else addNewTransaction(values);
  };

  const deleteTransaction = useCallback(
    (transaction: Transaction | undefined) => {
      setShowDelete(false);
      // realm.write(() => {
      //   if (!transaction) return;
      //   realm.delete(transaction);
      //   onDismiss();
      // });
    },
    []
  );

  const handleCamera = useCallback(async () => {
    if (cameraPermission && !cameraPermission.granted && cameraPermission.canAskAgain) await requestCameraPermission();
    if (!cameraPermission) {
      setShowImageOptions(false);
      const { assets, canceled } = await ImagePicker.launchCameraAsync();
      if (!canceled) {
        setValues((prev) => ({ ...prev, image: assets[0].uri }));
      }
    } else {
      console.log("No camera Permissions");
    }
  }, []);
  const removeImage = useCallback(() => {
    setValues((prev) => ({ ...prev, image: "" }));
    setShowImageOptions(false);
  }, [cameraPermission]);

  const handlePickImage = useCallback(async () => {
    if (imagePermission && !imagePermission.granted && imagePermission.canAskAgain) await requestImagePermission();
    if (imagePermission.granted) {
      setShowImageOptions(false);
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false,
        allowsEditing: true,
      });
      if (!canceled && assets.length > 0) {
        setValues((prev) => ({ ...prev, image: assets[0].uri }));
      }
    } else {
      console.log("please provide permission");
    }
  }, [imagePermission]);

  // if (viewModal === "datepicker")
  //   return (
  //     <DateTimePicker
  //       mode="date"
  //       display="calendar"
  //       value={values.date}
  //       testID="dateTimePicker"
  //       onChange={updateDate}
  //     />
  //   );
    return (
    <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: theme.colors.cardToneBackground,
            padding: 8,
          }}
        >
          <Text variant="labelLarge" style={{ marginBottom: 4 }}>
            {t("date")}
          </Text>
          {/* <Button icon="calendar" mode="outlined" onPress={() => setViewModal("datepicker")}>
            {format(values.date, dateFormat)}
          </Button> */}
        </View>
        <View
          style={{
            backgroundColor: theme.colors.cardToneBackground,
            padding: 8,
          }}
        >
          <TextInput
            // right={<TextInput.Icon onPress={() => setViewModal("currency")} icon="repeat" />}
            // left={<TextInput.Affix text={values.currency} />}
            value={values.amount}
            onChangeText={(text) => setValues((prev) => ({ ...prev, amount: text }))}
            mode="outlined"
            keyboardType="decimal-pad"
            style={theme.fonts.titleLarge}
          />
          {/* {values.currency !== defaultCurrency.code ? (
            <Amount
              amount={parseFloat(values.amount) * (rates.find((rate) => rate.code === values.currency)?.rate as number)}
            />
          ) : null} */}
        </View>
        <View
        >
          {!values.category && <Text>Please Add A category</Text>}
          {/* {values.category && <CategoryItem item={values.category} onPress={() => setViewModal("category")} />} */}
        </View>
        <View style={{ padding: 8 }}>
          <Text variant="labelLarge" style={{ marginBottom: 0 }}>
            {`${t("note")} (${t("optional")})`}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <TextInput
              multiline
              mode="outlined"
              value={values.note}
              style={{ flex: 1 }}
              onChangeText={(text) => setValues((prev) => ({ ...prev, note: text }))}
            />
            <IconButton
              icon="image"
              onPress={() => setShowImageOptions(true)}
              style={{
                marginRight: 0,
                borderRadius: theme.roundness * 4,
                backgroundColor: theme.colors.inversePrimary,
              }}
            />
          </View>
        </View>
        {values.image.length > 0 && (
          <TouchableRipple style={{ marginHorizontal: 8, marginBottom: 8 }} onPress={() => {}}>
            <Image
              source={{
                uri: values.image,
              }}
              style={{ height: 100 }}
            />
          </TouchableRipple>
        )}
        <View style={{flexDirection: "row"}}>
        <IconButton icon="add" onPress={router.back}/>
        <Button onPress={addNewTransaction}>Swipe to Add</Button>
        </View>
        <Dialog visible={showImageOptions} onDismiss={() => setShowImageOptions(false)}>
          <Dialog.Content>
            <Button onPress={handleCamera}>Open Camera</Button>
            <Button onPress={handlePickImage}>Pick Image</Button>
            {values.image.length > 0 && <Button onPress={removeImage}>Remove Image</Button>}
          </Dialog.Content>
        </Dialog>
    </View>
    );
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
