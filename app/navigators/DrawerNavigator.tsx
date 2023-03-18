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
import { useTranslation } from "react-i18next";
import Purchases from "react-native-purchases";

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
  const { t } = useTranslation("", { keyPrefix: "navigator.drawer" });
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
    >
      <Drawer.Screen name="TrackerStack" component={TrackerStackNavigator} options={{ title: t("tracker") }} />
      <Drawer.Screen name="RecurringStack" component={RecurringStackNavigator} options={{ title: t("recurring") }} />
      <Drawer.Screen name="CategoryStack" component={CategoryStackNavigator} options={{ title: t("category") }} />
      <Drawer.Screen name="ShortcutStack" component={ShortcutStackNavigator} options={{ title: t("shortcut") }} />
      <Drawer.Screen name="ExchangeStack" component={ExchangeStackNavigator} options={{ title: t("exchange") }} />
      <Drawer.Screen name="SettingStack" component={SettingStack} options={{ title: t("setting") }} />
      {canMakePayments && (
        <Drawer.Screen name="StoreStack" component={StoreStackNavigator} options={{ title: t("store") }} />
      )}
      {__DEV__ && <Drawer.Screen name="HelpStack" component={HelpStackNavigator} options={{ title: t("help") }} />}
      <Drawer.Screen name="AboutStack" component={AboutStackNavigator} options={{ title: t("about") }} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
