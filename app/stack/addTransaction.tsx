import { StyleSheet, View, TextInput, Pressable, Keyboard, useWindowDimensions, Text } from "react-native";
import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import DatePicker from "react-native-date-picker";
import { useSettings } from "providers/SettingsProvider";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useData } from "providers/DataProvider";
import SwipeButton from "@components/SwipeButton";
import CategoryItem from "@components/CategoryItem";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { format, parseISO } from "date-fns";
import PrimaryInput from "@components/AmountInput";
import { Category, Transaction, TransactionWithCategory } from "types";
import { useTheme } from "providers/ThemeProvider";
import CollapsibleHeaderScrollView from "@components/CollapsibleHeaderScrollView";
import { useTranslation } from "react-i18next";
import { useHeader } from "providers/HeaderProvider";
import DeleteContainer from "@components/DeleteContainer";

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
  const { t } = useTranslation("", { keyPrefix: "app.stack.addTransaction" });
  const { currency: defaultCurrency, dateFormat } = useSettings();
  const { category, addTransaction, updateTransaction, deleteTransaction } = useData();
  const amtInputRef = useRef<TextInput>();
  const categorySheetRef = useRef<BottomSheet>();
  const [sheetView, setSheetView] = useState("category");
  const { textStyle, colors } = useTheme();
  const [values, setValues] = useState<Omit<Transaction, "_id" | "createdAt" | "updatedAt">>({
    category: category.length > 0 ? category[0]._id : null,
    amount: parseFloat(amount),
    date: parseISO(date),
    note: "",
    currency: defaultCurrency.code,
    image: "",
  });

  const animatedColor = useSharedValue(category.length > 0 ? category[0].color : "orange");
  // const { rates } = useExchangeRate();
  const router = useRouter();

  const navigation = useNavigation();
  const { showHeader, hideHeader } = useHeader();

  const showDeleteModal = useCallback(() => {
    setSheetView("delete");
    categorySheetRef.current.snapToIndex(0);
  }, [categorySheetRef, setSheetView]);

  useEffect(() => {
    navigation.setOptions({
      title: _id ? t("updateTitle") : t("addTitle"),
      headerRightBtn: _id ? [{ icon: "delete", onPress: showDeleteModal, label: "delete_transaction" }] : [],
    });
  }, [navigation, _id]);

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
      setValues((prev) => ({ ...prev, category: category2 }));
    } else {
      setValues((prev) => ({ ...prev, category: category[0]._id }));
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

  const handleSubmit = () => {
    const updatedAt = new Date();
    if (_id) {
      updateTransaction(_id, { ...values, category: values.category, updatedAt, createdAt: updatedAt });
    } else {
      addTransaction({ ...values, category: values.category, updatedAt, createdAt: updatedAt });
    }
    if (router.canGoBack) router.back();
    else router.replace("(tabs)/transaction");
  };

  const handlePressDelete = useCallback(() => {
    categorySheetRef.current.close();
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
    setValues((prev) => ({ ...prev, category: category._id }));
  }, []);

  const selectedCategory = useMemo(() => category.find((c) => c._id === values.category), [values.category]);

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />, []);
  const handleOnAnimate = useCallback(
    (_, to: number) => {
      if (to === 2) hideHeader();
      else showHeader();
    },
    [hideHeader, showHeader]
  );
  return (
    <>
      <CollapsibleHeaderScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, minHeight: height }}
        title={_id ? t("updateTitle") : t("addTitle")}
        paddingTop={0}
        style={{ backgroundColor: colors.screen }}
      >
        <View style={{ flexDirection: "column", rowGap: 16, flexGrow: 1, marginTop: 16 }}>
          <PrimaryInput
            type="amount"
            autofocus={_id ? false : true}
            onPress={handleTextBoxPress}
            onChangeText={(text) => setValues((prev) => ({ ...prev, amount: parseFloat(text) }))}
            backgroundColor={values.category ? selectedCategory.color : undefined}
            ref={amtInputRef}
            initialValue={values.amount > 0 ? values.amount.toString() : undefined}
            prefix={defaultCurrency.symbol_native}
            keyboardType="decimal-pad"
          />
          {values.category && (
            <CategoryItem
              item={selectedCategory}
              onPress={() => {
                categorySheetRef.current.snapToIndex(2);
                setSheetView("category");
              }}
            />
          )}
          <Animated.View style={[styles.outlineButton, { borderColor: animatedColor }]}>
            <Pressable
              android_ripple={{ color: selectedCategory.color || colors.rippleColor }}
              style={styles.button}
              onPress={() => {
                categorySheetRef.current.snapToIndex(1);
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
          bgColor={values.category ? selectedCategory.color : undefined}
          text={_id ? t("swipeButtonUpdate") : t("swipeButtonAdd")}
        />
      </CollapsibleHeaderScrollView>
      <BottomSheet
        style={{ backgroundColor: colors.screen }}
        ref={categorySheetRef}
        snapPoints={[225, 264, "100%"]}
        enablePanDownToClose
        index={-1}
        backdropComponent={renderBackdrop}
        enableHandlePanningGesture={sheetView === "category"}
        onAnimate={handleOnAnimate}
      >
        {sheetView === "category" && (
          <BottomSheetFlatList
            style={{ backgroundColor: colors.screen }}
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
          <View style={{ backgroundColor: colors.screen, flex: 1 }}>
            <DatePicker
              date={values.date}
              onDateChange={(date) => setValues((prev) => ({ ...prev, date }))}
              mode="date"
              maximumDate={new Date()}
              style={{ width, height: 200 }}
            />
          </View>
        )}
        {sheetView === "delete" && (
          <DeleteContainer
            text={t("deleteText")}
            title={t("deleteTitle")}
            onComfirm={handlePressDelete}
            onCancel={categorySheetRef.current.close}
            cancel={t("cancel")}
            color={selectedCategory.color}
            confirm={t("confirm")}
          />
        )}
        {sheetView === "delete" && (
          <DeleteContainer
            text={t("deleteText")}
            title={t("deleteTitle")}
            onComfirm={handlePressDelete}
            onCancel={() => categorySheetRef.current.close()}
            cancel={t("cancel")}
            color={selectedCategory.color}
            confirm={t("confirm")}
          />
        )}
      </BottomSheet>
    </>
  );
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
    flex: 1,
  },
});
