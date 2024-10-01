import { Text, View, TextInput, Pressable, useWindowDimensions, ScrollView } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { COLORS } from "data";
import SwipeButton from "@components/SwipeButton";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PrimaryInput from "@components/AmountInput";
import { useData } from "providers/DataProvider";
import GroupButton from "@components/GroupButton";
import { useTheme } from "providers/ThemeProvider";
import CollapsibleHeaderScrollView from "@components/CollapsibleHeaderScrollView";
import Icon from "@components/Icon";

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
};

type SearchParams = {
  _id: string;
  color: string;
  type: string;
  title: string;
};
const AddCategoryScreen = () => {
  const { addCategory, updateCategory, deleteCategory } = useData();
  const { _id, color, title = "", type = "income" } = useLocalSearchParams<SearchParams>();
  const router = useRouter();
  const inputRef = useRef<TextInput>();
  const {textStyle, colors} = useTheme();
  const [values, setValues] = useState<ValueProps>({
    title,
    type,
    color: color ? `#${color}` : COLORS[(Math.random() * COLORS.length).toFixed()],
    icon: "feed-tag",
  });
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  const handleSubmit = () => {
    const date = new Date().toISOString();
    // TODO: ADD Check
    if (_id) {
      // TODO: fetch created_at date and populate here
      updateCategory(_id, { ...values, createdAt: date, updatedAt: date, isFavorite: false });
    } else addCategory({ ...values, createdAt: date, updatedAt: date, isFavorite: false });
    if (router.canGoBack) router.back();
    else router.replace("(tabs)/category");
  };
  const handlePressDelete = useCallback(() => {
    deleteCategory(_id);
    router.back();
  }, [_id]);

  useEffect(() => {
    navigation.setOptions({
      title: _id ? "Update Category" : "Add Category",
      headerRightBtn: _id ? [{ icon: "delete", onPress: handlePressDelete, label: "delete_category" }] : []})
  },[_id]); 

  return (
    <CollapsibleHeaderScrollView
    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, minHeight: height }}
    title={_id ? "Category" : "Category"}
    paddingTop={0}
    style={{backgroundColor: colors.screen}}
  >
        <View style={{ flex: 1, marginTop: 16 }}>
        <PrimaryInput
          onPress={() => {}}
          ref={inputRef}
          backgroundColor={values.color}
          initialValue={title}
          onChangeText={(title) => setValues((prev) => ({ ...prev, title }))}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", columnGap: 16, marginTop: 32 }}>
          <View>
            <Text style={textStyle.body}>Icon</Text>
            <Pressable>
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
            <Text style={textStyle.body}>Colors</Text>
            <ScrollView
              contentContainerStyle={{ flexDirection: "row", columnGap: 8, paddingRight: 16 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: width - 64 - 16 - 16 }}
            >
              {COLORS.map((color) => (
                <Pressable key={color} onPress={() => setValues((prev) => ({ ...prev, color }))}>
                  <View style={{ backgroundColor: color, borderRadius: 4, height: 64, width: 64 }} />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={{ marginTop: 32 }}>
          <Text  style={textStyle.body}>Type</Text>
          <GroupButton
            buttons={CATEGORY_TYPES.map((cat) => ({
              ...cat,
              type: cat.value === values.type ? "filled" : "outline",
              onPress: () => setValues((prev) => ({ ...prev, type: cat.value })),
            }))}
            activeColor={values.color}
          />
        </View>
      </View>

      <SwipeButton bgColor={values.color} onSwipeComplete={handleSubmit} style={{ marginTop: 32 }} />
    </CollapsibleHeaderScrollView>
  );
};

export default AddCategoryScreen;
