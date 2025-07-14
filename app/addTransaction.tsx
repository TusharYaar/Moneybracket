import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { StyleSheet, View, TextInput, Pressable, Keyboard, useWindowDimensions, Text, ScrollView } from "react-native";
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { format, parseISO } from "date-fns";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

// Providers
import { useSettings } from "providers/SettingsProvider";
import { useData } from "providers/DataProvider";
import { useTheme } from "providers/ThemeProvider";
import { useHeader } from "providers/HeaderProvider";

// Types
import { Category, Group, Transaction } from "types";

// Components
import SwipeButton from "@components/SwipeButton";
import CategoryItem from "@components/CategoryItem";
import PrimaryInput from "@components/AmountInput";
import DeleteContainer from "@components/DeleteContainer";
import GroupItem from "@components/GroupItem";

type SearchParams = {
  _id: string;
  date: string;
  amount: string;
  category: string;
};

const _NULL_GROUP = {
  _id: "noGroup",
  isFavorite: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  color: "#7f7f7f",
  icon: "unknown",
  description: "No group",
};

const _NULL_CATEGORY: Omit<Category, "title"> = {
  _id: "noCategory",
  createdAt: new Date(),
  updatedAt: new Date(),
  type: "expense",
  color: "#7f7f7f",
  icon: "unknown",
  isFavorite: false,
};

const AddTransaction = () => {
  const {
    _id = null,
    amount = "0",
    date = new Date().toISOString(),
    category: tcategory,
  } = useLocalSearchParams<SearchParams>();
  const { t } = useTranslation("", { keyPrefix: "app.addTransaction" });
  const { currency: defaultCurrency, dateFormat } = useSettings();
  const { category, addTransaction, updateTransaction, deleteTransaction, transaction, group } = useData();
  const amtInputRef = useRef<TextInput>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const [sheetView, setSheetView] = useState("category");
  const { textStyle, colors } = useTheme();
  const [values, setValues] = useState<Omit<Transaction, "_id" | "updatedAt">>({
    category: category.length > 0 ? category[0]._id : _NULL_CATEGORY._id,
    amount: parseFloat(amount),
    date: parseISO(date),
    note: "",
    currency: defaultCurrency.code,
    image: "",
    createdAt: new Date(),
    group: null,
  });
  const { bottom: bottomInset } = useSafeAreaInsets();
  const animatedColor = useSharedValue(category.length > 0 ? category[0].color : "orange");
  // const { rates } = useExchangeRate();
  const router = useRouter();
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const keyboardHeight = useSharedValue(0);

  const { height } = useWindowDimensions();
  const { headerHeight } = useHeader();
  const showDeleteModal = useCallback(() => {
    setSheetView("delete");
    // TODO: Resolve this
    sheetRef.current?.snapToPosition(225);
  }, [sheetRef, setSheetView]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ title: _id ? t("updateTitle") : t("addTitle"), headerRightBtn: _id ? [{ icon: "delete", onPress: showDeleteModal, action: "delete_transaction" }] : [] });
      sheetRef.current?.close();

    }, [_id, sheetRef, navigation, showDeleteModal])
  );

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
      keyboardHeight.value = e.endCoordinates.height;
      sheetRef.current?.close();
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      keyboardHeight.value = 0;
      amtInputRef.current?.blur();
    });

    return () => {
      hideSubscription.remove();
      showSubscription.remove();
    };
  }, [amtInputRef, sheetRef]);


  const NULL_GROUP = useMemo(() => ({ ..._NULL_GROUP, title: t("noGroup") }), []);
  const NULL_CATEGORY = useMemo(() => ({ ..._NULL_CATEGORY, title: t("noCategory") }), []);


  useEffect(() => {
    if (tcategory) {
      setValues((prev) => ({ ...prev, category: tcategory }));
    } else {
      setValues((prev) => ({ ...prev, category: category.length > 0 ? category[0]._id : _NULL_CATEGORY._id }));
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
    sheetRef.current?.close();
    if (_id) deleteTransaction(_id);
    router.back();
  }, [_id]);

  const handleTextBoxPress = useCallback(() => {
    amtInputRef.current?.focus();
  }, []);

  const updateCategory = useCallback((category: Category) => {
    sheetRef.current?.close();
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

  const handleDateChange = useCallback(
    (event: DateTimePickerEvent, date: Date) => {
      setSheetView("category");
      setValues((prev) => ({ ...prev, date }));
    },
    [setSheetView]
  );

  const handleChangeGroup = useCallback((group: Group | null) => {
    setValues((prev) => ({ ...prev, group: group ? group._id : null }));
    sheetRef.current?.close();
  }, []);

  const disableSwipeBtn = useMemo(() => {
    if (values.amount <= 0 || values.category === NULL_CATEGORY._id) return true;
    else return false;
  }, [values]);

  
  return (
    <>
      <ScrollView
        contentContainerStyle={[{ paddingHorizontal: 8, minHeight: height, paddingTop: headerHeight + 8, flexGrow: 1, paddingBottom: bottomInset + 8 }]}
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
                sheetRef.current?.snapToIndex(1);
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
                  sheetRef.current?.snapToIndex(1);
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
        <Animated.View style={{height: keyboardHeight}}/>
      </ScrollView>
      <BottomSheet
        style={{ backgroundColor: colors.screen }}
        ref={sheetRef}
        snapPoints={[225, "69%", "100%"]}
        enablePanDownToClose
        index={-1}
        backdropComponent={renderBackdrop}
        enableHandlePanningGesture={sheetView === "category" || sheetView === "group"}
        enableDynamicSizing={false}
      >
        {sheetView === "category" && (
          <BottomSheetFlatList
            style={{ backgroundColor: colors.screen }}
            contentContainerStyle={{ paddingBottom: bottom + 8, paddingHorizontal: 16 }}
            data={category}
            renderItem={({ item }) => (
              <CategoryItem
                item={item}
                onPress={() => updateCategory(item)}
                style={{ marginVertical: 8 }}
              />
            )}
            ListEmptyComponent={
              <Text style={textStyle.bodyBold}>{t("noCategoryList")}</Text>}
          />
        )}
        {sheetView === "delete" && (
          <DeleteContainer
            text={t("deleteText")}
            title={t("deleteTitle")}
            onComfirm={handlePressDelete}
            onCancel={() => sheetRef.current?.close()}
            cancel={t("cancel")}
            color={selectedCategory.color}
            confirm={t("confirm")}
          />
        )}
        {sheetView === "group" && (
          <BottomSheetFlatList
            style={{ backgroundColor: colors.screen }}
            contentContainerStyle={{ paddingBottom: bottom + 8, paddingHorizontal: 16 }}
            data={group.concat(NULL_GROUP)}
            renderItem={({ item }) => (
              <GroupItem
                item={item}
                onPress={handleChangeGroup}
                style={{ marginVertical: 8 }}
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
