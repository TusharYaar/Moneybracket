import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="transaction" />
      <Tabs.Screen name="category" />
      <Tabs.Screen name="recurring" options={{ href: null }} />
      <Tabs.Screen name="exchange" options={{ href: null }} />
    </Tabs>
  );
}
