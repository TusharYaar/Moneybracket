import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const StackLayout = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screen }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)/transaction" />
        <Stack.Screen name="(tabs)/category" />
        <Stack.Screen name="(tabs)/group" />
        <Stack.Screen name="(tabs)/recurring" />
        <Stack.Screen name="(tabs)/settings" />
        <Stack.Screen name="addTransaction" />
        <Stack.Screen name="addCategory" />
        <Stack.Screen name="addGroup" />
        <Stack.Screen name="backup" />
        <Stack.Screen name="export" />
        <Stack.Screen name="about" />
        <Stack.Screen name="help" />
      </Stack>
    </SafeAreaView>
  );
};

export default StackLayout;
