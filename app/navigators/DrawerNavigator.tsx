import {createDrawerNavigator} from "@react-navigation/drawer";
import {
  SettingStack,
  ExchangeStackNavigator,
  TrackerStackNavigator,
  CategoryStackNavigator,
} from "./StackNavigators";
import React from "react";
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="TrackerStack" component={TrackerStackNavigator} />
      <Drawer.Screen name="ExchangeStack" component={ExchangeStackNavigator} />
      <Drawer.Screen name="SettingsStack" component={SettingStack} />
      <Drawer.Screen name="CategoryStack" component={CategoryStackNavigator} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
