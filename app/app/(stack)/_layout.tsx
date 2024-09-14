// import Header from "@components/Header";
import { Stack } from "expo-router/stack";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen  name="(tabs)" />
        <Stack.Screen  name="addTransaction"/>
        <Stack.Screen  name="addCategory"/>
        {/* <Stack.Screen  name="font"/> */}
        {/* <Stack.Screen  name="settings/font"/> */}
        {/* <Stack.Screen  name="settings/backup"/> */}
        {/* <Stack.Screen  name="settings/about"/> */}
        {/* <Stack.Screen  name="addCategory"/> */}
        {/* <Stack.Screen  name="addCategory"/> */}
        

        </Stack>

    </SafeAreaView>
  );
}
