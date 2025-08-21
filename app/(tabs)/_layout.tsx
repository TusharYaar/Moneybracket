import Tabbar from "@components/Tabbar";
import { Tabs } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
function Layout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{ headerShown: false, animation: "shift", sceneStyle: { backgroundColor: colors.screen } }}
      backBehavior="initialRoute"
      tabBar={(props) => <Tabbar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Transaction" }} />
      <Tabs.Screen name="category" options={{ title: "Category" }} />
      <Tabs.Screen name="group" options={{ title: "Group" }} />
      <Tabs.Protected guard={__DEV__}>
        <Tabs.Screen name="recurring" options={{ title: "Recurring" }} />
      </Tabs.Protected>
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}

export default Layout;
