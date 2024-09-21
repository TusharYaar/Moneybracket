import { StyleSheet, View, TextInput, Pressable, Keyboard, ScrollView, useWindowDimensions, Text } from "react-native";
import React, { useState, useCallback, useEffect, useRef } from "react";
import DatePicker from "react-native-date-picker";
import { useSettings } from "../../providers/SettingsProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useData } from "../../providers/DataProvider";
import SwipeButton from "@components/SwipeButton";
import CategoryItem from "@components/CategoryItem";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { format, parseISO } from "date-fns";
import PrimaryInput from "@components/AmountInput";
import { Category, Transaction, TransactionWithCategory } from "types";
import Header from "@components/Header";
import { useTheme } from "providers/ThemeProvider";

type SearchParams = {
  _id: string;
  date: string;
  amount: string;
  category: string;
};
const AddTransaction = () => {
  const {
    _id,
    amount = "0",
    date = new Date().toISOString(),
    category: category2,
  } = useLocalSearchParams<SearchParams>();
  const { height, width } = useWindowDimensions();
  // const { t } = useTranslation("", { keyPrefix: "components.addTransaction" });
  const { currency: defaultCurrency, dateFormat } = useSettings();
  const { category, addTransaction, updateTransaction, deleteTransaction } = useData();
  const amtInputRef = useRef<TextInput>();
  const categorySheetRef = useRef<BottomSheet>();
  const [sheetView, setSheetView] = useState("category");
  const {textStyle} = useTheme();
  const [values, setValues] = useState<Omit<TransactionWithCategory, "_id" | "createdAt" | "updatedAt">>({
    category: category.length > 0 ? category[0] : null,
    amount: parseFloat(amount),
    date: parseISO(date),
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
    if (category2) {
      setValues((prev) => ({ ...prev, category: category.find((c) => c._id === category2) }));
    } else {
      setValues((prev) => ({ ...prev, category: category[0] }));
    }
  }, [category, category2]);

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

  const handleSubmit = () => {
    const updatedAt = new Date().toISOString();

    if (_id) {
      updateTransaction(_id, { ...values, category: values.category._id, updatedAt, createdAt: updatedAt });
    } else {
      addTransaction({ ...values, category: values.category._id, updatedAt, createdAt: updatedAt });
    }

    if (router.canGoBack) router.back();
    else router.replace("(tabs)/transaction");
    // if (item) updateTransaction(item, values);
    // else addNewTransaction(values);
  };

  const handlePressDelete = useCallback(() => {
    deleteTransaction(_id);
    router.back();
  }, [_id]);

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
    <View style={{ paddingHorizontal: 16, paddingBottom: 16, height }}>
      <Header
        title={_id ? "Transaction" : "Add Transaction"}
        headerBtns={_id ? [{ icon: "trash", onPress: handlePressDelete, label: "delete_transaction" }] : []}
      />
      <ScrollView contentContainerStyle={{ flex: 1, paddingTop: 8 }}>
        <View style={{ flexDirection: "column", rowGap: 16, flexGrow: 1 }}>
          <PrimaryInput
            type="amount"
            onPress={handleTextBoxPress}
            onChangeText={(text) => setValues((prev) => ({ ...prev, amount: parseFloat(text) }))}
            backgroundColor={values.category ? values.category.color : undefined}
            ref={amtInputRef}
            initialValue={values.amount > 0 ? values.amount.toString() : undefined}
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
              <Text style={textStyle.title}>{format(values.date, dateFormat)}</Text>
            </Pressable>
          </Animated.View>
        </View>
        <SwipeButton
          style={{ marginTop: 16 }}
          onSwipeComplete={handleSubmit}
          bgColor={values.category ? values.category.color : undefined}
        />
      </ScrollView>
      <BottomSheet
        ref={categorySheetRef}
        snapPoints={[264, "69%"]}
        enablePanDownToClose
        index={-1}
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
    borderRadius: 8,
    borderWidth: 2,
  },
  button: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
