import { Text, View, TextInput, Pressable, useWindowDimensions } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { COLORS } from "../../data";
import SwipeButton from "@components/SwipeButton";
import { useRouter } from "expo-router";
import PrimaryInput from "@components/AmountInput";
import { Category } from "../../realm/Category";
import { useRealm } from "@realm/react";

const CATEGORY_TYPES = [
  {
    label: "income",
    value: "income",
    icon: "add",
  },
  {
    label: "expense",
    value: "expense",
    icon: "remove",
  },
  {
    label: "transfer",
    value: "transfer",
    icon: "swap-horizontal",
  },
];

type ValueProps = {
  title: string;
  type: "income" | "expense" | "transfer";
  color: string;
  icon: string;
};

const AddCategoryScreen = () => {
  const router = useRouter();
  const inputRef = useRef<TextInput>();
  const [values, setValues] = useState<ValueProps>({
    title: "",
    type: "income",
    color: COLORS[(Math.random() * COLORS.length).toFixed()],
    icon: "add",
  });

  const realm = useRealm();
  const { height, width } = useWindowDimensions();
  const handleSubmit = () => {
    addNewCategory(values);
    if (router.canGoBack) router.back();
    else router.replace("(tabs)/category");
  };

  const addNewCategory = useCallback(
    ({ title, type, color, icon }: ValueProps) => {
      realm.write(() => {
        realm.create("Category", Category.generate(title, type, color, icon));
      });
    },
    []
  );

  return (
    <View style={{ padding: 16, height }}>
      <View style={{ flex: 1}}>
        <PrimaryInput onPress={() => {}} ref={inputRef} backgroundColor={values.color} onChangeText={(title) => setValues(prev => ({...prev, title}))}/>

        <Pressable>
          <Text>Icon</Text>
        </Pressable>
      </View>

      <SwipeButton bgColor={values.color} onSwipeComplete={handleSubmit} />
    </View>
  );
};

export default AddCategoryScreen;

