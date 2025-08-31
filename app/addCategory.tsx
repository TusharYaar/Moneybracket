import { Text, View, TextInput, Pressable, useWindowDimensions, ScrollView } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { COLORS } from "data";
import SwipeButton from "@components/SwipeButton";
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PrimaryInput from "@components/AmountInput";
import { useData } from "providers/DataProvider";
import GroupButton from "@components/GroupButton";
import { useTheme } from "providers/ThemeProvider";
import Icon from "@components/Icon";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import DeleteContainer from "@components/DeleteContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeader } from "providers/HeaderProvider";
import { usePostHog } from "posthog-react-native";

const CATEGORY_TYPES = [
  {
    id: "income",
    label: "income",
    value: "income",
    icon: "income",
    testId: "group-btn-income",
  },
  {
    id: "expense",
    label: "expense",
    value: "expense",
    icon: "expense",
    testId: "group-btn-expense",
  },
  {
    id: "transfer",
    label: "transfer",
    value: "transfer",
    icon: "transfer",
    testId: "group-btn-transfer",
  },
];

type ValueProps = {
  title: string;
  type: string;
  color: string;
  icon: string;
  description: string;
};

type SearchParams = {
  _id: string;
  color: string;
  type: string;
  title: string;
};
const AddCategoryScreen = () => {
  const { addCategory, updateCategory, deleteCategory, category } = useData();
  const { _id, color, title = "", type = "income" } = useLocalSearchParams<SearchParams>();
  const { t } = useTranslation("", { keyPrefix: "app.addCategory" });
  const router = useRouter();
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);
  const { textStyle, colors } = useTheme();
  const [values, setValues] = useState<ValueProps>({
    title,
    type,
    color: color ? color : colors.screen,
    icon: "icon_6",
    description: "",
  });
  const [sheetView, setSheetView] = useState<"icon" | "delete">("icon");
  const posthog = usePostHog();
  const { height, width } = useWindowDimensions();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheet>(null);
  const { headerHeight } = useHeader();
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: _id ? t("updateTitle") : t("addTitle"),
        headerRightBtn: _id ? [{ icon: "delete", onPress: showDeleteModal, action: "delete_category" }] : [],
      });
    }, [_id])
  );

  useEffect(() => {
    if (_id) {
      const cate = category.find((cat) => cat._id === _id);
      if (cate) {
        setValues((prev) => ({ ...prev, description: cate.description ? cate.description : "", icon: cate.icon }));
      }
    }
  }, [_id, category]);

  const recommendColor = useMemo(() => {
    if (_id) {
      return "";
    } else {
      const color = COLORS[(Math.random() * COLORS.length).toFixed()];
      setValues((prev) => ({ ...prev, color }));
      return color;
    }
  }, [_id, setValues]);

  const numCol = useMemo(() => Math.floor(width / 100), [width]);

  const handleSelectIcon = useCallback(
    (icon: string) => {
      setValues((prev) => ({ ...prev, icon }));
      sheetRef.current?.close();
    },
    [sheetRef]
  );

  const handleSubmit = () => {
    const date = new Date();
    // TODO: ADD Check
    if (_id) {
      // TODO: fetch created_at date and populate here
      updateCategory(_id, { ...values, createdAt: date, updatedAt: date, isFavorite: false });
      posthog.capture("category_update");
    } else {
      addCategory({ ...values, createdAt: date, updatedAt: date, isFavorite: false });
      posthog.capture("category_add", { color: values.color, icon: values.icon });
    }
    if (router.canGoBack()) router.back();
    else router.replace("(tabs)/category");
  };
  const handlePressDelete = useCallback(() => {
    sheetRef.current?.close();
    deleteCategory(_id);
    posthog.capture("category_delete");
    router.back();
  }, [_id]);

  const showDeleteModal = useCallback(() => {
    setSheetView("delete");
    sheetRef.current?.snapToIndex(0);
  }, [sheetRef, setSheetView]);

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />, []);

  const disableSwipeBtn = useMemo(() => {
    if (values.title.length === 0) return true;
    else return false;
  }, [values]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 8,
          minHeight: height - headerHeight,
          paddingTop: headerHeight + 8,
          paddingBottom: bottomInset + 8,
          flexGrow: 1,
        }}
        style={{ backgroundColor: colors.screen }}
      >
        <View style={{ flex: 1 }}>
          <PrimaryInput
            autofocus={_id ? false : true}
            ref={inputRef}
            backgroundColor={values.color}
            initialValue={title}
            width={width - 16}
            onChangeText={(title) => setValues((prev) => ({ ...prev, title }))}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between", columnGap: 16, marginTop: 24 }}>
            <View>
              <Text style={textStyle.body}>{t("icon")}</Text>
              <Pressable
                onPress={() => {
                  setSheetView("icon");
                  sheetRef.current?.snapToIndex(0);
                }}
              >
                <View
                  style={{
                    borderRadius: 4,
                    height: 64,
                    width: 64,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: values.color,
                  }}
                >
                  <Icon name={values.icon} size={48} />
                </View>
              </Pressable>
            </View>
            <View>
              <Text style={textStyle.body}>{t("color")}</Text>
              <ScrollView
                contentContainerStyle={{ flexDirection: "row", columnGap: 8, paddingRight: 16 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ width: width - 64 - 16 - 16 }}
              >
                {COLORS.map((color) => (
                  <Pressable key={color} onPress={() => setValues((prev) => ({ ...prev, color }))}>
                    <View style={{ backgroundColor: color, borderRadius: 4, height: 64, width: 64 }} />
                    {values.color === color && (
                      <Animated.Text
                        exiting={FadeOutUp}
                        entering={FadeInUp}
                        style={[textStyle.label, { textAlign: "center" }]}
                      >
                        {t("current")}
                      </Animated.Text>
                    )}
                    {values.color !== color && recommendColor === color && (
                      <Animated.Text
                        exiting={FadeOutUp}
                        entering={FadeInUp}
                        style={[textStyle.label, { textAlign: "center" }]}
                      >
                        {t("suggested")}
                      </Animated.Text>
                    )}
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
          <View style={{ marginTop: 24 }}>
            <Text style={textStyle.body}>{t("type")}</Text>
            <GroupButton
              selected={values.type}
              testId="category-group-btn"
              buttons={CATEGORY_TYPES.map((cat) => ({
                ...cat,
                onPress: () => setValues((prev) => ({ ...prev, type: cat.value })),
              }))}
              activeColor={values.color}
            />
          </View>
          <View style={{ marginTop: 24 }}>
            <Text style={textStyle.body}>{t("description")}</Text>
            <TextInput
              value={values.description}
              numberOfLines={3}
              multiline
              onChangeText={(description) => setValues((prev) => ({ ...prev, description }))}
              style={[
                textStyle.body,
                { borderRadius: 4, borderWidth: 2, borderColor: values.color, minHeight: 78, textAlignVertical: "top" },
              ]}
            />
          </View>
        </View>

        <SwipeButton
          bgColor={values.color}
          disable={disableSwipeBtn}
          onSwipeComplete={handleSubmit}
          style={{ marginTop: 24 }}
          text={_id ? t("swipeButtonUpdate") : t("swipeButtonAdd")}
        />
      </ScrollView>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[225, "69%", "100%"]}
        index={-1}
        backdropComponent={renderBackdrop}
        style={{ backgroundColor: colors.screen }}
        enableDynamicSizing={false}
        enableHandlePanningGesture={sheetView === "icon"}
      >
        {sheetView === "icon" && (
          <BottomSheetFlatList
            numColumns={numCol}
            key={`icon_flatlist_${numCol}`}
            style={{ backgroundColor: colors.screen }}
            contentContainerStyle={{ padding: 16 }}
            columnWrapperStyle={{ flex: 1, justifyContent: "space-around", margin: 8 }}
            data={Array(99)
              .fill(1)
              .map((_, index) => `icon_${index}`)}
            renderItem={({ item }) => (
              <Pressable key={item} onPress={() => handleSelectIcon(item)}>
                <View
                  style={{
                    borderRadius: 4,
                    height: 64,
                    width: 64,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: values.icon === item ? values.color : undefined,
                    borderColor: values.icon === item ? undefined : values.color,
                  }}
                >
                  <Icon name={item} size={48} color={values.icon === item ? colors.text : values.color} />
                </View>
              </Pressable>
            )}
          />
        )}
        {sheetView === "delete" && (
          <DeleteContainer
            text={t("deleteText")}
            title={t("deleteTitle")}
            onComfirm={handlePressDelete}
            onCancel={() => sheetRef.current?.close()}
            cancel={t("cancel")}
            color={values.color}
            confirm={t("confirm")}
          />
        )}
      </BottomSheet>
    </>
  );
};

export default AddCategoryScreen;
