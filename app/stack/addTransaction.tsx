import { StyleSheet, View, TextInput, Pressable, Keyboard, useWindowDimensions, Text } from "react-native";
import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useSettings } from "providers/SettingsProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useData } from "providers/DataProvider";
import SwipeButton from "@components/SwipeButton";
import CategoryItem from "@components/CategoryItem";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { format, parseISO } from "date-fns";
import PrimaryInput from "@components/AmountInput";
import { Category, Group, Transaction } from "types";
import { useTheme } from "providers/ThemeProvider";
import CollapsibleHeaderScrollView from "@components/CollapsibleHeaderScrollView";
import { useTranslation } from "react-i18next";
import { useHeader } from "providers/HeaderProvider";
import DeleteContainer from "@components/DeleteContainer";
import GroupItem from "@components/GroupItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SearchParams = {
  _id: string;
  date: string;
  amount: string;
  category: string;
};

const NULL_GROUP = {
  _id: "no_group",
  title: "no_group",
  isFavorite: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  color: "#7f7f7f",
  icon: "cancel",
  description: "No group",
};

const NULL_CATEGORY: Category = {
  _id: "no_category",
  title: "no_category",
  createdAt: new Date(),
  updatedAt: new Date(),
  type: "expense",
  color: "#7f7f7f",
  icon: "cancel",
  isFavorite: false,
};

const AddTransaction = () => {
  const {
    _id = null,
    amount = "0",
    date = new Date().toISOString(),
    category: tcategory,
  } = useLocalSearchParams<SearchParams>();
  const { t } = useTranslation("", { keyPrefix: "app.stack.addTransaction" });
  const { currency: defaultCurrency, dateFormat } = useSettings();
  const { category, addTransaction, updateTransaction, deleteTransaction, transaction, group } = useData();
  const amtInputRef = useRef<TextInput>(null);
  const categorySheetRef = useRef<BottomSheet>(null);
  const [sheetView, setSheetView] = useState("category");
  const { textStyle, colors } = useTheme();
  const [values, setValues] = useState<Omit<Transaction, "_id" | "updatedAt">>({
    category: category.length > 0 ? category[0]._id : NULL_CATEGORY._id,
    amount: parseFloat(amount),
    date: parseISO(date),
    note: "",
    currency: defaultCurrency.code,
    image: "",
    createdAt: new Date(),
    group: null,
  });
  const animatedColor = useSharedValue(category.length > 0 ? category[0].color : "orange");
  // const { rates } = useExchangeRate();
  const router = useRouter();

  const { header, setHeaderRightButtons, setHeaderTitle } = useHeader();

  const { height } = useWindowDimensions();
  const { top: topInset } = useSafeAreaInsets();

  const showDeleteModal = useCallback(() => {
    setSheetView("delete");
    categorySheetRef.current?.snapToIndex(0);
  }, [categorySheetRef, setSheetView]);

  useEffect(() => {
    setHeaderRightButtons(_id ? [{ icon: "delete", onPress: showDeleteModal, action: "delete_transaction" }] : []);
    setHeaderTitle(_id ? t("updateTitle") : t("addTitle"));
  }, [_id]);

  useEffect(() => {
    if (_id) {
      const t = transaction.find((trans) => trans._id === _id);
      if (t) {
        setValues((prev) => ({ ...prev, note: t.note, image: t.image, createdAt: t.createdAt, group: t.group }));
      }
    }
  }, [_id, transaction]);

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
      categorySheetRef.current?.close();
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      amtInputRef.current?.blur();
    });

    return () => {
      hideSubscription.remove();
      showSubscription.remove();
    };
  }, [amtInputRef, categorySheetRef]);

  useEffect(() => {
    if (tcategory) {
      setValues((prev) => ({ ...prev, category: tcategory }));
    } else {
      setValues((prev) => ({ ...prev, category: category.length > 0 ? category[0]._id : NULL_CATEGORY._id }));
    }
  }, [category, tcategory]);

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
      addTransaction({ ...values, category: values.category, updatedAt });
    }
    if (router.canGoBack()) router.back();
    else router.replace("(tabs)/transaction");
  };

  const handlePressDelete = useCallback(() => {
    categorySheetRef.current?.close();
    if (_id) deleteTransaction(_id);
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

  const handleTextBoxPress = useCallback(() => {
    amtInputRef.current?.focus();
  }, []);

  const updateCategory = useCallback((category: Category) => {
    categorySheetRef.current?.close();
    animatedColor.value = withTiming(category.color);
    setValues((prev) => ({ ...prev, category: category._id }));
  }, []);

  const selectedCategory = useMemo(() => {
    const _cat = category.find((c) => c._id === values.category);

    if (_cat) return _cat;
    else return NULL_CATEGORY;
  }, [values.category]);
  const selectedGroup = useMemo(() => {
    if (values.group !== null && values.group !== NULL_GROUP._id) {
      const grp = group.find((g) => g._id === values.group);
      if (grp) return grp;
      else return NULL_GROUP;
    } else return NULL_GROUP;
  }, [values.group]);

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />, []);
  const handleOnAnimate = (_, to: number) => {
    if (to === 2) header.hide();
    else header.show();
  };
  const handleDateChange = useCallback(
    (event: DateTimePickerEvent, date: Date) => {
      setSheetView("category");
      setValues((prev) => ({ ...prev, date }));
    },
    [setSheetView]
  );

  const handleChangeGroup = useCallback((group: Group | null) => {
    setValues((prev) => ({ ...prev, group: group ? group._id : null }));
    categorySheetRef.current?.close();
  }, []);

  const disableSwipeBtn = useMemo(() => {
    if (values.amount <= 0 || values.category === NULL_CATEGORY._id) return true;
    else return false;
  }, [values]);

  return (
    <>
      <CollapsibleHeaderScrollView
        contentContainerStyle={{ paddingHorizontal: 8, minHeight: height - topInset }}
        paddingVertical={8}
        tabbarVisible={false}
        style={{ backgroundColor: colors.screen }}
      >
        <View style={{ flexDirection: "column", flexGrow: 1 }}>
          <PrimaryInput
            type="amount"
            containerStyle={{ height: 200 }}
            autofocus={_id ? false : true}
            onPress={handleTextBoxPress}
            onChangeText={(text) => setValues((prev) => ({ ...prev, amount: parseFloat(text) }))}
            backgroundColor={selectedCategory.color}
            ref={amtInputRef}
            initialValue={values.amount > 0 ? values.amount.toString() : undefined}
            prefix={defaultCurrency.symbol_native}
            keyboardType="decimal-pad"
          />
          <View style={{ marginTop: 32 }}>
            <Text style={textStyle.body}>{t("category")}</Text>

            <CategoryItem
              item={selectedCategory}
              onPress={() => {
                categorySheetRef.current?.snapToIndex(2);
                setSheetView("category");
              }}
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={textStyle.body}>{t("date")}</Text>
            <Animated.View style={[styles.outlineButton, { borderColor: animatedColor }]}>
              <Pressable
                android_ripple={{ color: selectedCategory.color || colors.rippleColor }}
                style={styles.button}
                onPress={() => setSheetView("date")}
              >
                <Text style={textStyle.title}>{format(values.date, dateFormat)}</Text>
              </Pressable>
            </Animated.View>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={textStyle.body}>{t("note")}</Text>
            <TextInput
              value={values.note}
              multiline
              onChangeText={(note) => setValues((prev) => ({ ...prev, note }))}
              style={[
                textStyle.body,
                {
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: selectedCategory.color,
                  minHeight: 78,
                  textAlignVertical: "top",
                },
              ]}
            />
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={textStyle.body}>{t("group")}</Text>
            <Animated.View style={[{ backgroundColor: selectedGroup.color, borderRadius: 8 }]}>
              <Pressable
                android_ripple={{ color: selectedGroup.color || colors.rippleColor }}
                style={styles.button}
                onPress={() => {
                  categorySheetRef.current?.snapToIndex(2);
                  setSheetView("group");
                }}
              >
                <Text style={textStyle.title}>{selectedGroup ? selectedGroup.title : t("noGroup")}</Text>
              </Pressable>
            </Animated.View>
          </View>
        </View>
        <SwipeButton
          style={{ marginTop: 16 }}
          onSwipeComplete={handleSubmit}
          disable={disableSwipeBtn}
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
        {sheetView === "delete" && (
          <DeleteContainer
            text={t("deleteText")}
            title={t("deleteTitle")}
            onComfirm={handlePressDelete}
            onCancel={() => categorySheetRef.current?.close()}
            cancel={t("cancel")}
            color={selectedCategory.color}
            confirm={t("confirm")}
          />
        )}
        {sheetView === "group" && (
          <BottomSheetFlatList
            style={{ backgroundColor: colors.screen }}
            data={group.concat(NULL_GROUP)}
            renderItem={({ item }) => (
              <GroupItem
                item={{ ...item }}
                onPress={handleChangeGroup}
                style={{ marginHorizontal: 16, marginVertical: 8 }}
              />
            )}
          />
        )}
      </BottomSheet>
      {sheetView === "date" && (
        <DateTimePicker value={values.date} onChange={handleDateChange} mode="date" maximumDate={new Date()} />
      )}
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
