import { Text, View, TextInput, Pressable, useWindowDimensions, ScrollView } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { COLORS } from "data";
import SwipeButton from "@components/SwipeButton";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PrimaryInput from "@components/AmountInput";
import { useData } from "providers/DataProvider";
import GroupButton from "@components/GroupButton";
import { useTheme } from "providers/ThemeProvider";
import CollapsibleHeaderScrollView from "@components/CollapsibleHeaderScrollView";
import Icon from "@components/Icon";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useHeader } from "providers/HeaderProvider";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import DeleteContainer from "@components/DeleteContainer";

const CATEGORY_TYPES = [
  {
    label: "income",
    value: "income",
    icon: "income",
  },
  {
    label: "expense",
    value: "expense",
    icon: "expense",
  },
  {
    label: "transfer",
    value: "transfer",
    icon: "transfer",
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
  const { t } = useTranslation("", { keyPrefix: "app.stack.addCategory" });
  const router = useRouter();
  const { header } = useHeader();
  const inputRef = useRef<TextInput>();
  const { textStyle, colors } = useTheme();
  const [values, setValues] = useState<ValueProps>({
    title,
    type,
    color: color ? `#${color}` : colors.screen,
    icon: "icon_6",
    description: "",
  });
  const [sheetView, setSheetView] = useState<"icon" | "delete">("icon");

  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const sheetRef = useRef<BottomSheet>();

  useEffect(() => {
    const cate = category.find(cat => cat._id === _id);
    setValues(prev => ({...prev, description: cate.description, icon: cate.icon}))
  },[_id, category]);

  const recommendColor = useMemo(() => {
    if (_id) {
      return "";
    } else {
      const color = COLORS[(Math.random() * COLORS.length).toFixed()];
      setValues((prev) => ({ ...prev, color }));
      return color;
    }
  }, [_id, setValues]);

  const handleOnAnimate = (_: number, to: number) => {
    if (to === 2) header.hide();
    else header.show();
  };
  const numCol = useMemo(() => Math.floor(width / 100), [width]);

  const handleSelectIcon = useCallback(
    (icon: string) => {
      setValues((prev) => ({ ...prev, icon }));
      sheetRef.current.close();
    },
    [sheetRef]
  );

  const handleSubmit = () => {
    const date = new Date();
    // TODO: ADD Check
    if (_id) {
      // TODO: fetch created_at date and populate here
      updateCategory(_id, { ...values, createdAt: date, updatedAt: date, isFavorite: false });
    } else addCategory({ ...values, createdAt: date, updatedAt: date, isFavorite: false });
    if (router.canGoBack) router.back();
    else router.replace("(tabs)/category");
  };
  const handlePressDelete = useCallback(() => {
    sheetRef.current.close();
    deleteCategory(_id);
    router.back();
  }, [_id]);

  const showDeleteModal = useCallback(() => {
    setSheetView("delete");
    sheetRef.current.snapToIndex(0);
  }, [sheetRef, setSheetView]);

  useEffect(() => {
    navigation.setOptions({
      title: _id ? t("updateTitle") : t("addTitle"),
      headerRightBtn: _id ? [{ icon: "delete", onPress: showDeleteModal, label: "delete_category" }] : [],
    });
  }, [_id]);

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />, []);

  return (
    <>
      <CollapsibleHeaderScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, minHeight: height }}
        title="Category"
        paddingTop={0}
        style={{ backgroundColor: colors.screen }}
        tabbarVisible={false}
      >
        <View style={{ flex: 1, marginTop: 16 }}>
          <PrimaryInput
            autofocus={_id ? false : true}
            onPress={() => {}}
            ref={inputRef}
            backgroundColor={values.color}
            initialValue={title}
            onChangeText={(title) => setValues((prev) => ({ ...prev, title }))}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between", columnGap: 16, marginTop: 32 }}>
            <View>
              <Text style={textStyle.body}>{t("icon")}</Text>
              <Pressable
                onPress={() => {
                  setSheetView("icon");
                  sheetRef.current.snapToIndex(0);
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
                  <Icon name={values.icon as undefined} size={48} />
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
          <View style={{ marginTop: 32 }}>
            <Text style={textStyle.body}>{t("type")}</Text>
            <GroupButton
              buttons={CATEGORY_TYPES.map((cat) => ({
                ...cat,
                type: cat.value === values.type ? "filled" : "outline",
                onPress: () => setValues((prev) => ({ ...prev, type: cat.value })),
              }))}
              activeColor={values.color}
            />
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={textStyle.body}>{t("description")}</Text>
            <TextInput
              value={values.description}
              numberOfLines={3}
              multiline
              onChangeText={(description) => setValues((prev) => ({ ...prev, description }))}
              style={[
                textStyle.label,
                { borderRadius: 4, borderWidth: 2, borderColor: values.color, minHeight: 30, textAlignVertical: "top" },
              ]}
            />
          </View>
        </View>

        <SwipeButton
          bgColor={values.color}
          onSwipeComplete={handleSubmit}
          style={{ marginTop: 32 }}
          text={_id ? t("swipeButtonUpdate") : t("swipeButtonAdd")}
        />
      </CollapsibleHeaderScrollView>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[225, "69%", "100%"]}
        index={-1}
        backdropComponent={renderBackdrop}
        style={{ backgroundColor: colors.screen }}
        onAnimate={handleOnAnimate}
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
            onCancel={() => sheetRef.current.close()}
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
