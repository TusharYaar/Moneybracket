import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../data";
import SwipeButton from "../../components/SwipeButton";
import { useRouter } from "expo-router";

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

type CategoryStateType = {
  title: string;
  type: "income" | "expense" | "transfer";
  color: string;
  icon: string;
};

const AddCategoryScreen = () => {
  const router = useRouter();

  const [values, setValues] = useState<CategoryStateType>({
    title: "",
    type: "income",
    color: COLORS[(Math.random() * COLORS.length).toFixed()],
    icon: "add",
  });

  const handleSubmit = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flex: 1}}>
        <TextInput placeholder="useless placeholder" />
        <Pressable>
          <Text>Color</Text>
        </Pressable>

        <Pressable>
          <Text>Icon</Text>
        </Pressable>
      </View>

      <SwipeButton bgColor={values.color} onSwipeComplete={handleSubmit} />
    </View>
  );
};

export default AddCategoryScreen;

