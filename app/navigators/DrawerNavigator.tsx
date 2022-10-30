import {createDrawerNavigator} from "@react-navigation/drawer";
import {
  SettingStack,
  ExchangeStackNavigator,
  TrackerStackNavigator,
  CategoryStackNavigator,
} from "./StackNavigators";
import React from "react";

export type DrawerParamList = {
  TrackerStack: undefined;
  ExchangeStack: undefined;
  SettingStack: undefined;
  CategoryStack: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="CategoryStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="TrackerStack" component={TrackerStackNavigator} />
      <Drawer.Screen name="CategoryStack" component={CategoryStackNavigator} />
      <Drawer.Screen name="ExchangeStack" component={ExchangeStackNavigator} />
      <Drawer.Screen name="SettingStack" component={SettingStack} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
