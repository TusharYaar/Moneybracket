import { Tabs } from "expo-router";
import Tabbar from "@components/Tabbar";

const icons = {
  transaction: "transactionTab",
  category: "categoryTab",
  recurring: "recurringTab",
  settings: "settingTab",
};

const visibleTabs = Object.keys(icons).filter((k) => (__DEV__ ? true : k !== "recurring"));

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <Tabbar {...props} icons={icons} visibleTabs={visibleTabs} />}
    >
      {visibleTabs.map((tab) => (
        <Tabs.Screen name={tab} key={tab} />
      ))}
    </Tabs>
  );
}
