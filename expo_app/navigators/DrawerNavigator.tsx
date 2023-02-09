import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  SettingStack,
  ExchangeStackNavigator,
  TrackerStackNavigator,
  CategoryStackNavigator,
  StoreStackNavigator,
  AboutStackNavigator,
  HelpStackNavigator,
} from "./StackNavigators";
import React from "react";
import { useTranslation } from "react-i18next";

export type DrawerParamList = {
  TrackerStack: undefined;
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
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="TrackerStack" component={TrackerStackNavigator} options={{ title: t("tracker") }} />
      <Drawer.Screen name="CategoryStack" component={CategoryStackNavigator} options={{ title: t("category") }} />
      <Drawer.Screen name="ExchangeStack" component={ExchangeStackNavigator} options={{ title: t("exchange") }} />
      <Drawer.Screen name="SettingStack" component={SettingStack} options={{ title: t("setting") }} />
      <Drawer.Screen name="StoreStack" component={StoreStackNavigator} options={{ title: t("store") }} />
      <Drawer.Screen name="AboutStack" component={AboutStackNavigator} options={{ title: t("about") }} />
      <Drawer.Screen name="HelpStack" component={HelpStackNavigator} options={{ title: t("help") }} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
