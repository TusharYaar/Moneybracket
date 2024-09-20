import { Text, View, TextInput, Pressable, useWindowDimensions, ScrollView } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { COLORS } from "../../data";
import SwipeButton from "@components/SwipeButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import PrimaryInput from "@components/AmountInput";
import { useData } from "providers/DataProvider";
import Octicons from "@expo/vector-icons/Octicons";
import GroupButton from "@components/GroupButton";
import Header from "@components/Header";

const CATEGORY_TYPES = [
  {
    label: "income",
    value: "income",
    icon: "diff-added",
  },
  {
    label: "expense",
    value: "expense",
    icon: "diff-removed",
  },
  {
    label: "transfer",
    value: "transfer",
    icon: "diff-renamed",
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
  const [values, setValues] = useState<ValueProps>({
    title,
    type,
    color: color ? `#${color}` : COLORS[(Math.random() * COLORS.length).toFixed()],
    icon: "feed-tag",
  });

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

  return (
    <View style={{ paddingHorizontal: 16, paddingBottom: 16, height }}>
      <Header
        title={_id ? "Category" : "Category"}
        headerBtns={_id ? [{ icon: "trash", onPress: handlePressDelete, label: "delete_category" }] : []}
      />
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
            <Text>Icon</Text>
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
                <Octicons name={values.icon as undefined} size={48} />
              </View>
            </Pressable>
          </View>
          <View>
            <Text>Colors</Text>
            <ScrollView
              contentContainerStyle={{ flexDirection: "row", columnGap: 8 }}
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
          <Text>Type</Text>
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

      <SwipeButton bgColor={values.color} onSwipeComplete={handleSubmit} />
    </View>
  );
};

export default AddCategoryScreen;
