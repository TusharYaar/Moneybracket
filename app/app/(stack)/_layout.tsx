import { Stack } from "expo-router/stack";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen  name="(tabs)"/>
        <Stack.Screen  name="settings"/>
        <Stack.Screen  name="addTransaction"/>
        <Stack.Screen  name="addCategory"/>
        </Stack>

    </SafeAreaView>
  );
}
