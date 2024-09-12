import { StyleSheet, View, TextInput, Pressable, Keyboard, ScrollView, useWindowDimensions, Text } from "react-native";
import React, { useState, useCallback, useEffect, useRef } from "react";
// import { TextInput, IconButton, Button, Text, TouchableRipple, Dialog } from "react-native-paper";
// import { Transaction } from "../../realm/Transaction";
// import CategoryItem from "../CategoryItem";
// import { Category } from "../../realm/Category";
import DatePicker from "react-native-date-picker";
// import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
// import CurrencyModal from "../CurrencyModal";
// import CategoryModal from "./CategoryModal";
// import { useRealm } from "../../realm";
// import { useTranslation } from "react-i18next";
// import { useCustomTheme } from "../../providers/ThemeProvider";

import { useSettings } from "../../providers/SettingsProvider";
// import ModalContainer from "./ModalContainer";
// import { useExchangeRate } from "../../providers/ExchangeRatesProvider";
// import Amount from "../Amount";
// import DeleteDialog from "../DeleteDialog";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import { IMAGES_DIRECTORY } from "../../data";
// import { format } from "date-fns";
// import Amount from "../../components/Amount";
// import CategoryItem from "../../components/CategoryItem";
import { useRouter } from "expo-router";
import { useData } from "../../providers/DataProvider";
import SwipeButton from "@components/SwipeButton";
import CategoryItem from "@components/CategoryItem";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { format } from "date-fns";
import PrimaryInput from "@components/AmountInput";
import { Category, Transaction } from "types";

type Props = {
  visible: boolean;
  item?: Transaction;
  onDismiss: () => void;
  category:Category;
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
  const { height, width } = useWindowDimensions();
  // const { t } = useTranslation("", { keyPrefix: "components.addTransaction" });
  const { currency: defaultCurrency, dateFormat } = useSettings();
  const { category } = useData();
  const amtInputRef = useRef<TextInput>();
  const categorySheetRef = useRef<BottomSheet>();
  const [sheetView, setSheetView] = useState("category");

  // const { theme } = useCustomTheme();
  const [values, setValues] = useState<ValueProps>({
    category: category.length > 0 ? category[0] : null,
    amount: "0",
    date: new Date(),
    note: "",
    currency: defaultCurrency.code,
    image: "",
  });

  const animatedColor = useSharedValue(category.length > 0 ? category[0].color : "orange");
  // const { rates } = useExchangeRate();
  const router = useRouter();

  // const [viewModal, setViewModal] = useState("datepicker");
  // const [showDelete, setShowDelete] = useState(false);
  // const [showImageOptions, setShowImageOptions] = useState(false);
  // const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
  // const [imagePermission, requestImagePermission] = ImagePicker.useMediaLibraryPermissions();

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
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      categorySheetRef.current.close();
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      amtInputRef.current.blur();
    });

    return () => {
      hideSubscription.remove();
      showSubscription.remove();
    };
  }, [amtInputRef, categorySheetRef]);

  useEffect(() => {
    setValues((prev) => ({ ...prev, category: category[0] }));
  }, []);

  //   useEffect(() => {
  //     // if (imagePermission && !imagePermission.granted && imagePermission.canAskAgain) requestImagePermission();
  //   }, [cameraPermission, requestCameraPermission, imagePermission, requestImagePermission]);


  // const moveImage = useCallback(async (image: string) => {
  //   const name = image.split("/");
  //   await FileSystem.moveAsync({
  //     from: image,
  //     to: `${IMAGES_DIRECTORY}/${name[name.length - 1]}`,
  //   });
  //   return `${IMAGES_DIRECTORY}/${name[name.length - 1]}`;
  // }, []);

  const addNewTransaction = async () => {
    // const img = values.image.length > 0 ? await moveImage(values.image) : "";
    // realm.write(() => {
    //   if (values.category) {
    //     realm.create(
    //       "Transaction",
    //       // Transaction.generate(parseFloat(values.amount), "INR", values.date, values.note, values.category, false)
    //     );
    //   }
    // });
  };

  const updateTransaction = useCallback(async (trans: Transaction, values: ValueProps) => {
    // const img = values.image.length > 0 ? await moveImage(values.image) : "";
    // realm.write(() => {
    //   if (trans.date !== values.date) trans.date = values.date;
    //   if (trans.amount !== parseFloat(values.amount)) trans.amount = parseFloat(values.amount);
    //   if (trans.category !== values.category && values.category) trans.category = values.category;
    //   if (trans.note !== values.note) trans.note = values.note;
    //   if (trans.image !== values.image) trans.image = img;
    //   onDismiss();
    // });
  }, []);

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

  const handleSubmit = (values: ValueProps) => {

    addNewTransaction();
    if (router.canGoBack) router.back();
    else router.replace("(tabs)/transaction");
    // if (item) updateTransaction(item, values);
    // else addNewTransaction(values);
  };

  const deleteTransaction = useCallback((transaction: Transaction | undefined) => {
    // setShowDelete(false);
    // realm.write(() => {
    //   if (!transaction) return;
    //   realm.delete(transaction);
    //   onDismiss();
    // });
  }, []);

  // const handleCamera = useCallback(async () => {
  //   if (cameraPermission && !cameraPermission.granted && cameraPermission.canAskAgain) await requestCameraPermission();
  //   if (!cameraPermission) {
  //     setShowImageOptions(false);
  //     const { assets, canceled } = await ImagePicker.launchCameraAsync();
  //     if (!canceled) {
  //       setValues((prev) => ({ ...prev, image: assets[0].uri }));
  //     }
  //   } else {
  //     console.log("No camera Permissions");
  //   }
  // }, []);
  // const removeImage = useCallback(() => {
  //   setValues((prev) => ({ ...prev, image: "" }));
  //   setShowImageOptions(false);
  // }, [cameraPermission]);

  // const handlePickImage = useCallback(async () => {
  //   if (imagePermission && !imagePermission.granted && imagePermission.canAskAgain) await requestImagePermission();
  //   if (imagePermission.granted) {
  //     setShowImageOptions(false);
  //     const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
  //       allowsMultipleSelection: false,
  //       allowsEditing: true,
  //     });
  //     if (!canceled && assets.length > 0) {
  //       setValues((prev) => ({ ...prev, image: assets[0].uri }));
  //     }
  //   } else {
  //     console.log("please provide permission");
  //   }
  // }, [imagePermission]);

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

  const handleTextBoxPress = useCallback(() => {
    amtInputRef.current.focus();
  }, []);

  const updateCategory = useCallback((category: Category) => {
    categorySheetRef.current.close();
    animatedColor.value = withTiming(category.color);
    setValues((prev) => ({ ...prev, category }));
  }, []);
  return (
    <View style={{ height }}>
      <ScrollView contentContainerStyle={{ padding: 16, flex: 1 }}>
        <View style={{ flexDirection: "column", rowGap: 16, flexGrow: 1 }}>
          <PrimaryInput
            onPress={handleTextBoxPress}
            onChangeText={(text) => setValues(prev => ({...prev, amount: text}))}
            backgroundColor={values.category ? values.category.color : undefined}
            ref={amtInputRef}
            prefix={defaultCurrency.symbol_native}
            keyboardType="decimal-pad"
          />
          {values.category && (
            <CategoryItem
              item={values.category}
              onPress={() => {
                categorySheetRef.current.snapToIndex(1);
                setSheetView("category");
              }}
            />
          )}
          <Animated.View style={[styles.outlineButton, { borderColor: animatedColor }]}>
            <Pressable
              android_ripple={{ color: values.category?.color || "black" }}
              style={styles.button}
              onPress={() => {
                categorySheetRef.current.snapToIndex(0);
                setSheetView("date");
              }}
            >
              <Text>{format(values.date, dateFormat)}</Text>
            </Pressable>
          </Animated.View>
          {/* <View style={{ height: 64, backgroundColor: "red" }}></View> */}
        </View>
        <SwipeButton
          style={{ marginTop: 16 }}
          onSwipeComplete={() => handleSubmit(values)}
          bgColor={values.category ? values.category.color : undefined}
        />
      </ScrollView>
      <BottomSheet
        ref={categorySheetRef}
        snapPoints={[264, "69%"]}
        enablePanDownToClose
        index={-1}
        // backdropComponent={(props) => {
        //   return <BottomSheetBackdrop {...props} />
        // }}
        // footerComponent={() => <Text>Hel;</Text>}
        onAnimate={(index) => setSheetView((prev) => (index > -1 ? (index === 1 ? "date" : "category") : prev))}
      >
        {sheetView === "category" && (
          <BottomSheetFlatList
            data={category}
            renderItem={({ item }) => (
              <CategoryItem
                item={item}
                onPress={() => updateCategory(item)}
                style={{ marginHorizontal: 16, marginVertical: 8 }}
              />
            )}
          />
        )}
        {sheetView === "date" && (
          <DatePicker
            date={values.date}
            onDateChange={(date) => setValues((prev) => ({ ...prev, date }))}
            mode="date"
            maximumDate={new Date()}
            style={{ width, height: 200 }}
          />
        )}
      </BottomSheet>
    </View>
  );

  // return (
  //   <View style={{ flex: 1 }}>
  //     <View
  //       style={{
  //         backgroundColor: theme.colors.cardToneBackground,
  //         padding: 8,
  //       }}
  //     >
  //       <Text variant="labelLarge" style={{ marginBottom: 4 }}>
  //         {t("date")}
  //       </Text>
  //       {/* <Button icon="calendar" mode="outlined" onPress={() => setViewModal("datepicker")}>
  //           {format(values.date, dateFormat)}
  //         </Button> */}
  //     </View>
  //     <View
  //       style={{
  //         backgroundColor: theme.colors.cardToneBackground,
  //         padding: 8,
  //       }}
  //     >
  //       <TextInput
  //         // right={<TextInput.Icon onPress={() => setViewModal("currency")} icon="repeat" />}
  //         // left={<TextInput.Affix text={values.currency} />}
  //         value={values.amount}
  //         onChangeText={(text) => setValues((prev) => ({ ...prev, amount: text }))}
  //         mode="outlined"
  //         keyboardType="decimal-pad"
  //         style={theme.fonts.titleLarge}
  //       />
  //       {/* {values.currency !== defaultCurrency.code ? (
  //           <Amount
  //             amount={parseFloat(values.amount) * (rates.find((rate) => rate.code === values.currency)?.rate as number)}
  //           />
  //         ) : null} */}
  //     </View>
  //     <View>
  //       {!values.category && <Text>Please Add A category</Text>}
  //       {/* {values.category && <CategoryItem item={values.category} onPress={() => setViewModal("category")} />} */}
  //     </View>
  //     <View style={{ padding: 8 }}>
  //       <Text variant="labelLarge" style={{ marginBottom: 0 }}>
  //         {`${t("note")} (${t("optional")})`}
  //       </Text>
  //       <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
  //         <TextInput
  //           multiline
  //           mode="outlined"
  //           value={values.note}
  //           style={{ flex: 1 }}
  //           onChangeText={(text) => setValues((prev) => ({ ...prev, note: text }))}
  //         />
  //         <IconButton
  //           icon="image"
  //           onPress={() => setShowImageOptions(true)}
  //           style={{
  //             marginRight: 0,
  //             borderRadius: theme.roundness * 4,
  //             backgroundColor: theme.colors.inversePrimary,
  //           }}
  //         />
  //       </View>
  //     </View>
  //     {values.image.length > 0 && (
  //       <TouchableRipple style={{ marginHorizontal: 8, marginBottom: 8 }} onPress={() => {}}>
  //         <Image
  //           source={{
  //             uri: values.image,
  //           }}
  //           style={{ height: 100 }}
  //         />
  //       </TouchableRipple>
  //     )}
  //     <View style={{ flexDirection: "row" }}>
  //       <IconButton icon="add" onPress={router.back} />
  //       <Button onPress={addNewTransaction}>Swipe to Add</Button>
  //     </View>
  //     <Dialog visible={showImageOptions} onDismiss={() => setShowImageOptions(false)}>
  //       <Dialog.Content>
  //         <Button onPress={handleCamera}>Open Camera</Button>
  //         <Button onPress={handlePickImage}>Pick Image</Button>
  //         {values.image.length > 0 && <Button onPress={removeImage}>Remove Image</Button>}
  //       </Dialog.Content>
  //     </Dialog>
  //   </View>
  // );
};

export default AddTransaction;

const styles = StyleSheet.create({
  outlineButton: {
    borderRadius: 4,
    borderWidth: 2,
  },
  button: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
