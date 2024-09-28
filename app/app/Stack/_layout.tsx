import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Header from "@components/Header";
import { useTheme } from "providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const StackLayout = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screen }}>
      <Stack screenOptions={{ header: (props) => <Header {...props} />, animation: "none" }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="addTransaction" options={{ title: "Add Transaction" }} />
        <Stack.Screen name="addCategory" options={{ title: "Add Category" }} />
        <Stack.Screen name="backup" options={{ title: "Backup" }} />
        <Stack.Screen name="export" options={{ title: "Export" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
        <Stack.Screen name="help" options={{ title: "Help" }} />
      </Stack>
    </SafeAreaView>
  );
};

export default StackLayout;

const styles = StyleSheet.create({});
