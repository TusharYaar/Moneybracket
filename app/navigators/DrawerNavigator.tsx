import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  SettingStack,
  ExchangeStackNavigator,
  TrackerStackNavigator,
  CategoryStackNavigator,
  StoreStackNavigator,
  AboutStackNavigator,
  HelpStackNavigator,
  RecurringStackNavigator,
  ShortcutStackNavigator,
} from "./StackNavigators";
import React, { useState, useEffect } from "react";
import Purchases from "react-native-purchases";
import CustomDrawerContent from "../components/CustomDrawer";

export type DrawerParamList = {
  RecurringStack: undefined;
  TrackerStack: undefined;
  ShortcutStack: undefined;
  ExchangeStack: undefined;
  SettingStack: undefined;
  CategoryStack: undefined;
  StoreStack: undefined;
  AboutStack: undefined;
  HelpStack: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const MyDrawer = () => {
  const [canMakePayments, setCanMakePayments] = useState(false);

  useEffect(() => {
    const check = async () => {
      const can = await Purchases.canMakePayments();
      setCanMakePayments(can);
    };

    check();
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="TrackerStack" component={TrackerStackNavigator} />
      {__DEV__ && <Drawer.Screen name="RecurringStack" component={RecurringStackNavigator} />}
      <Drawer.Screen name="CategoryStack" component={CategoryStackNavigator} />
      {__DEV__ && <Drawer.Screen name="ShortcutStack" component={ShortcutStackNavigator} />}
      <Drawer.Screen name="ExchangeStack" component={ExchangeStackNavigator} />
      <Drawer.Screen name="SettingStack" component={SettingStack} />
      {__DEV__ && <Drawer.Screen name="StoreStack" component={StoreStackNavigator} />}
      {__DEV__ && <Drawer.Screen name="HelpStack" component={HelpStackNavigator} />}
      <Drawer.Screen name="AboutStack" component={AboutStackNavigator} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
