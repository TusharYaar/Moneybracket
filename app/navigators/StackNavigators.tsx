import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "../screens/Settings/Setting";
import { CategoryTabNavigator, TrackerTabNavigator } from "./TabNavigators";
import { IconButton } from "react-native-paper";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "./DrawerNavigator";
import { useCustomTheme } from "../providers/ThemeProvider";

import FontSetting from "../screens/Settings/FontSetting";
import ThemeSetting from "../screens/Settings/ThemeSetting";
import Rates from "../screens/Exchange/Rates";
import ExportScreen from "../screens/Settings/ExportScreen";
import BackupScreen from "../screens/Settings/BackupScreen";
import { useTranslation } from "react-i18next";
import HelpScreen from "../screens/HelpScreen";
import AboutScreen from "../screens/AboutScreen";
import StoreScreen from "../screens/StoreScreen";
import AllRecurring from "../screens/Recurring/AllRecurring";
import SearchScreen from "../screens/Tracker/SearchScreen";

export type StackParamList = {
  TrackerTab: undefined;
  SearchScreen: undefined;

  RecurringScreen: undefined;

  CategoryTab: undefined;

  ExchangeRateScreen: undefined;

  SettingScreen: undefined;
  FontSetting: undefined;
  ThemeSetting: undefined;
  ExportScreen: undefined;
  BackupScreen: undefined;

  HelpScreen: undefined;
  StoreScreen: undefined;
  AboutScreen: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

type TrackerStackProps = DrawerScreenProps<DrawerParamList, "TrackerStack">;
export const TrackerStackNavigator = ({}: TrackerStackProps) => {
  const {
    theme: { fonts, roundness },
  } = useCustomTheme();
  const { t } = useTranslation("", { keyPrefix: "navigator.stack" });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrackerTab"
        component={TrackerTabNavigator}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} style={{ borderRadius: roundness * 4 }} />
          ),
          headerTitleStyle: fonts.titleMedium,
          title: t("TrackerTab"),
        })}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="arrow-back" onPress={() => navigation.goBack()} style={{ borderRadius: roundness * 4 }} />
          ),
          headerTitleStyle: fonts.titleMedium,
          title: t("searchScreen"),
        })}
      />
    </Stack.Navigator>
  );
};
export const RecurringStackNavigator = () => {
  const {
    theme: { fonts, roundness },
  } = useCustomTheme();
  const { t } = useTranslation("", { keyPrefix: "navigator.stack" });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RecurringScreen"
        component={AllRecurring}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} style={{ borderRadius: roundness * 4 }} />
          ),
          headerTitleStyle: fonts.titleMedium,
          title: t("RecurringScreen"),
        })}
      />
    </Stack.Navigator>
  );
};

export const CategoryStackNavigator = () => {
  const {
    theme: { fonts, roundness },
  } = useCustomTheme();
  const { t } = useTranslation("", { keyPrefix: "navigator.stack" });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryTab"
        component={CategoryTabNavigator}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} style={{ borderRadius: roundness * 4 }} />
          ),
          headerTitleStyle: fonts.titleMedium,
          title: t("CategoryTab"),
        })}
      />
    </Stack.Navigator>
  );
};

export const ExchangeStackNavigator = () => {
  const {
    theme: { fonts, roundness },
  } = useCustomTheme();
  const { t } = useTranslation("", { keyPrefix: "navigator.stack" });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExchangeRateScreen"
        component={Rates}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} style={{ borderRadius: roundness * 4 }} />
          ),
          headerTitleStyle: fonts.titleMedium,
          title: t("ExchangeRateScreen"),
        })}
      />
    </Stack.Navigator>
  );
};

export const SettingStack = () => {
  const {
    theme: { fonts, roundness },
  } = useCustomTheme();
  const { t } = useTranslation("", { keyPrefix: "navigator.stack" });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingScreen"
        component={Setting}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} style={{ borderRadius: roundness * 4 }} />
          ),
          headerTitleStyle: fonts.titleMedium,
          title: t("SettingScreen"),
        })}
      />
      <Stack.Screen
        name="FontSetting"
        component={FontSetting}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="arrow-back" onPress={() => navigation.goBack()} style={{ borderRadius: roundness * 4 }} />
          ),
          headerTitleStyle: fonts.titleMedium,
          title: t("FontSetting"),
        })}
      />
      <Stack.Screen
        name="ThemeSetting"
        component={ThemeSetting}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="arrow-back" onPress={() => navigation.goBack()} style={{ borderRadius: roundness * 4 }} />
          ),
          headerTitleStyle: fonts.titleMedium,
          title: t("ThemeSetting"),
        })}
      />
      <Stack.Screen
        name="ExportScreen"
        component={ExportScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="arrow-back" onPress={() => navigation.goBack()} style={{ borderRadius: roundness * 4 }} />
          ),
          headerTitleStyle: fonts.titleMedium,
          title: t("ExportScreen"),
        })}
      />
      <Stack.Screen
        name="BackupScreen"
        component={BackupScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="arrow-back" onPress={() => navigation.goBack()} style={{ borderRadius: roundness * 4 }} />
          ),
          headerTitleStyle: fonts.titleMedium,
          title: t("BackupScreen"),
        })}
      />
    </Stack.Navigator>
  );
};

export const HelpStackNavigator = () => {
  const {
    theme: { fonts, roundness },
  } = useCustomTheme();
  const { t } = useTranslation("", { keyPrefix: "navigator.stack" });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} style={{ borderRadius: roundness * 4 }} />
          ),
          headerTitleStyle: fonts.titleMedium,
          title: t("HelpScreen"),
        })}
      />
    </Stack.Navigator>
  );
};

export const AboutStackNavigator = () => {
  const {
    theme: { fonts, roundness },
  } = useCustomTheme();
  const { t } = useTranslation("", { keyPrefix: "navigator.stack" });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} style={{ borderRadius: roundness * 4 }} />
          ),
          headerTitleStyle: fonts.titleMedium,
          title: t("AboutScreen"),
        })}
      />
    </Stack.Navigator>
  );
};

export const StoreStackNavigator = () => {
  const {
    theme: { fonts, roundness },
  } = useCustomTheme();
  const { t } = useTranslation("", { keyPrefix: "navigator.stack" });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StoreScreen"
        component={StoreScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} style={{ borderRadius: roundness * 4 }} />
          ),
          headerTitleStyle: fonts.titleMedium,
          title: t("StoreScreen"),
        })}
      />
    </Stack.Navigator>
  );
};
