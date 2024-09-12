import { Tabs } from "expo-router";
import Tabbar from "../../../components/Tabbar";

const icons = {
  transaction: "hash",
  category: "rows",
  recurring: "iterations",
  "settings/index": "tools",
};

const visibleTabs = Object.keys(icons);

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
