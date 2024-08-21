import { Tabs } from "expo-router";
import Tabbar from "../../../components/Tabbar";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={ (props) => <Tabbar {...props} />}>
      <Tabs.Screen name="transaction" />
      <Tabs.Screen name="category" />
    </Tabs>
  );
}

{/* <Tabs.Screen name="recurring" options={{href: null}} /> */}
{/* <Tabs.Screen name="exchange" options={{href: null}} /> */}