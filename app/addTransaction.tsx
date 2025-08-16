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
import { useExchangeRate } from "providers/ExchangeRatesProvider";

// Types
import { Category, Currency, Group, RateType, Transaction } from "types";

// Components
import SwipeButton from "@components/SwipeButton";
import CategoryItem from "@components/CategoryItem";
import PrimaryInput from "@components/AmountInput";
import DeleteContainer from "@components/DeleteContainer";
import GroupItem from "@components/GroupItem";
import CurrencyItem from "@components/CurrencyItem";
import { CURRENCIES } from "data";
import { usePostHog } from "posthog-react-native";

type SearchParams = {
  _id: string;
  date: string;
  amount: string;
  category: string;
};

const _NULL_GROUP:Group = {
  _id: "noGroup",
  isFavorite: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  color: "#7f7f7f",
  icon: "unknown",
  description: "No group",
  title: "noGroup",
};

const _NULL_CATEGORY: Category = {
  _id: "noCategory",
  createdAt: new Date(),
  updatedAt: new Date(),
  type: "expense",
  color: "#7f7f7f",
  icon: "unknown",
  isFavorite: false,
  title: "noCategory"

};

const AddTransaction = () => {
  const {
    _id = null,
    amount = "0",
    date = new Date().toISOString(),
    category: tcategory,
  } = useLocalSearchParams<SearchParams>();
  // 1. Context hooks (translation, theme, navigation, etc.)
  const { t } = useTranslation("", { keyPrefix: "app.addTransaction" });
  const { textStyle, colors } = useTheme();
  const { setHeaderVisible, headerHeight } = useHeader();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { bottom } = useSafeAreaInsets();
  const { height, width: screenWidth } = useWindowDimensions();
  const router = useRouter();
  const navigation = useNavigation();
  const posthog = usePostHog();

  // 2. Data hooks
  const { currency: defaultCurrency, dateFormat } = useSettings();
  const { category, addTransaction, updateTransaction, deleteTransaction, transaction, group } = useData();
  const { rates } = useExchangeRate();

  // 3. State hooks
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [sheetView, setSheetView] = useState("category");
  const [values, setValues] = useState<
    Omit<Transaction, "_id" | "updatedAt" | "currency" | "conversionCurrency" | "conversionRate">
  >({
    category: category.length > 0 ? category[0]._id : _NULL_CATEGORY._id,
    amount: parseFloat(amount),
    date: parseISO(date),
    note: "",
    image: "",
    createdAt: new Date(),
    group: null,
  });

  // 4. Ref hooks
  const amtInputRef = useRef<TextInput>(null);
  const sheetRef = useRef<BottomSheet>(null);

  // 5. Animation/shared value hooks
  const animatedColor = useSharedValue(category.length > 0 ? category[0].color : "orange");
  const keyboardHeight = useSharedValue(0);
  const showDeleteModal = useCallback(() => {
    setSheetView("delete");
    // TODO: Resolve this
    sheetRef.current?.snapToPosition(225);
  }, [sheetRef, setSheetView]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: _id ? t("updateTitle") : t("addTitle"),
        headerRightBtn: _id ? [{ icon: "delete", onPress: showDeleteModal, action: "delete_transaction" }] : [],
      });
      sheetRef.current?.close();
    }, [_id, sheetRef, navigation, showDeleteModal])
  );

  useEffect(() => {
    if (_id) {
      const t = transaction.find((trans) => trans._id === _id);
      if (t) {
        setValues((prev) => ({ ...prev, note: t.note, image: t.image, createdAt: t.createdAt, group: t.group }));
        setCurrency(CURRENCIES[t.currency]);
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

  const NULL_GROUP = useMemo(() => ({ ..._NULL_GROUP, title: t("noGroup") }), [t]);
  const NULL_CATEGORY = useMemo(() => ({ ..._NULL_CATEGORY, title: t("noCategory") }), [t]);

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

  const handleSubmit = () => {
    const updatedAt = new Date();
    if (_id) {
      updateTransaction(_id, {
        ...values,
        category: values.category,
        updatedAt,
        createdAt: updatedAt,
        currency: currency.code,
        conversionRate: currency.code === defaultCurrency.code ? 1 : rates[currency.code],
        conversionCurrency: currency.code === defaultCurrency.code ? "" : defaultCurrency.code,
      });
      posthog.capture("transaction_update");
    } else {
      addTransaction({
        ...values,
        category: values.category,
        updatedAt,
        conversionRate: currency.code === defaultCurrency.code ? 1 : rates[currency.code],
        currency: currency.code,
        conversionCurrency: currency.code === defaultCurrency.code ? "" : defaultCurrency.code,
      });
      posthog.capture("transaction_add", {currency: currency.code, category: selectedCategory.title, group: selectedGroup.title });

    }
    if (router.canGoBack()) router.back();
    else router.replace("(tabs)/transaction");
  };

  const handlePressDelete = useCallback(() => {
    sheetRef.current?.close();
    if (_id) {
      deleteTransaction(_id);
      posthog.capture("transaction_delete");
    }
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

  const changeCurrency = useCallback(
    ({ rate, ...currency }: RateType) => {
      setCurrency(currency);
      sheetRef.current?.close();
    },
    [setCurrency, sheetRef]
  );

  const rateData: RateType[] = useMemo(() => {
    return Object.entries(rates).map(([code, rate]) => ({ ...CURRENCIES[code], rate }));
  }, [rates]);

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          {
            paddingHorizontal: 8,
            minHeight: height,
            paddingTop: headerHeight + 8,
            flexGrow: 1,
            paddingBottom: bottomInset + 8,
          },
        ]}
        style={{ backgroundColor: colors.screen }}
      >
        <View style={{ flexDirection: "column", flexGrow: 1 }}>
          <PrimaryInput
            type="amount"
            autofocus={_id ? false : true}
            onPress={handleTextBoxPress}
            onChangeText={(text) => setValues((prev) => ({ ...prev, amount: text.length > 0 ? parseFloat(text) : 0 }))}
            backgroundColor={selectedCategory.color}
            ref={amtInputRef}
            initialValue={values.amount > 0 ? values.amount.toString() : undefined}
            prefix={currency.symbol_native}
            keyboardType="decimal-pad"
            width={screenWidth - 16}
            showActionButton={rateData.length > 1}
            onPressActionButton={() => {
              setSheetView("currency");
              setHeaderVisible(false);
              sheetRef.current?.snapToIndex(2);
            }}
            actionButtonText={`${currency.code} - ${currency.name}`}
            helperText={
              defaultCurrency.code === currency.code
                ? undefined
                : `${currency.code} ${values.amount} = ${defaultCurrency.code} ${(
                    values.amount * rates[currency.code]
                  ).toFixed(2)}`
            }
          />
          <View style={{ marginTop: 32 }}>
            <Text style={textStyle.body}>{t("category")}</Text>

            <CategoryItem
              item={selectedCategory}
              onPress={() => {
                setSheetView("category");
                sheetRef.current?.snapToIndex(1);
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
                  setSheetView("group");
                  sheetRef.current?.snapToIndex(1);
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
        <Animated.View style={{ height: keyboardHeight }} />
      </ScrollView>
      <BottomSheet
        style={{ backgroundColor: colors.screen }}
        ref={sheetRef}
        snapPoints={[225, "69%", "100%"]}
        enablePanDownToClose
        index={-1}
        backdropComponent={renderBackdrop}
        enableHandlePanningGesture={sheetView !== "delete"}
        enableDynamicSizing={false}
        handleComponent={sheetView === "delete" ? null : undefined}
        onChange={(index) => {
          if (index === -1) setHeaderVisible(true);
        }}
      >
        {sheetView === "category" && (
          <BottomSheetFlatList
            style={{ backgroundColor: colors.screen }}
            contentContainerStyle={{ paddingBottom: bottom + 8, paddingHorizontal: 16 }}
            data={category}
            renderItem={({ item }) => (
              <CategoryItem item={item} onPress={() => updateCategory(item)} style={{ marginVertical: 8 }} />
            )}
            ListEmptyComponent={<Text style={textStyle.bodyBold}>{t("noCategoryList")}</Text>}
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
            contentContainerStyle={{ paddingBottom: bottom, paddingHorizontal: 16 }}
            data={group.concat(NULL_GROUP)}
            renderItem={({ item }) => (
              <GroupItem item={item} onPress={handleChangeGroup} style={{ marginVertical: 8 }} />
            )}
          />
        )}
        {sheetView === "currency" && (
          <BottomSheetFlatList
            style={{ backgroundColor: colors.screen }}
            contentContainerStyle={{ paddingBottom: bottom, paddingHorizontal: 16 }}
            data={rateData}
            renderItem={({ item }) => (
              <CurrencyItem
                item={item}
                onPress={changeCurrency}
                style={{ marginVertical: 8 }}
                baseCurrency={defaultCurrency.code}
                rate={rates[item.code]}
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
