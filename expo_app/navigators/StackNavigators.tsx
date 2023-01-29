import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "../screens/Settings/Setting";
import { CategoryTabNavigator, TrackerTabNavigator } from "./TabNavigators";
import { IconButton } from "react-native-paper";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "./DrawerNavigator";
import { useCustomTheme } from "../themes";
import FontSetting from "../screens/Settings/FontSetting";
// import {useTranslation} from "react-i18next";
import ThemeSetting from "../screens/Settings/ThemeSetting";
import Rates from "../screens/Exchange/Rates";
import ExportScreen from "../screens/Settings/ExportScreen";
import BackupScreen from "../screens/Settings/BackupScreen";

export type StackParamList = {
  TrackerTab: undefined;

  CategoryTab: undefined;

  ExchangeRateScreen: undefined;

  SettingScreen: undefined;
  FontSetting: undefined;
  ThemeSetting: undefined;
  ExportScreen: undefined;
  BackupScreen: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

type TrackerStackProps = DrawerScreenProps<DrawerParamList, "TrackerStack">;
export const TrackerStackNavigator = ({}: TrackerStackProps) => {
  const { theme } = useCustomTheme();
  // const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrackerTab"
        component={TrackerTabNavigator}
        options={({ navigation }) => ({
          headerLeft: () => <IconButton icon="menu" onPress={() => navigation.openDrawer()} />,
          headerTitleStyle: theme.fonts.titleLarge,
          title: "tracker",
        })}
      />
    </Stack.Navigator>
  );
};

export const CategoryStackNavigator = () => {
  const { theme } = useCustomTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryTab"
        component={CategoryTabNavigator}
        options={({ navigation }) => ({
          headerLeft: () => <IconButton icon="menu" onPress={() => navigation.openDrawer()} />,
          headerTitleStyle: theme.fonts.titleLarge,
          title: "category",
        })}
      />
    </Stack.Navigator>
  );
};

export const ExchangeStackNavigator = () => {
  const { theme } = useCustomTheme();
  // const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExchangeRateScreen"
        component={Rates}
        options={({ navigation }) => ({
          headerLeft: () => <IconButton icon="menu" onPress={() => navigation.openDrawer()} />,
          headerTitleStyle: theme.fonts.titleLarge,
          // title: t("exchange"),
        })}
      />
    </Stack.Navigator>
  );
};

export const SettingStack = () => {
  const { theme } = useCustomTheme();

  // const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingScreen"
        component={Setting}
        options={({ navigation }) => ({
          headerLeft: () => <IconButton icon="menu" onPress={() => navigation.openDrawer()} />,
          headerTitleStyle: theme.fonts.titleLarge,
          // title: t("settings"),
        })}
      />
      <Stack.Screen
        name="FontSetting"
        component={FontSetting}
        options={({ navigation }) => ({
          headerLeft: () => <IconButton icon="arrow-back" onPress={() => navigation.goBack()} />,
          headerTitleStyle: theme.fonts.titleLarge,
          // title: t("fontSettings"),
        })}
      />
      <Stack.Screen
        name="ThemeSetting"
        component={ThemeSetting}
        options={({ navigation }) => ({
          headerLeft: () => <IconButton icon="arrow-back" onPress={() => navigation.goBack()} />,
          headerTitleStyle: theme.fonts.titleLarge,
          // title: t("themeSettings"),
        })}
      />
      <Stack.Screen
        name="ExportScreen"
        component={ExportScreen}
        options={({ navigation }) => ({
          headerLeft: () => <IconButton icon="arrow-back" onPress={() => navigation.goBack()} />,
          headerTitleStyle: theme.fonts.titleLarge,
          // title: t("themeSettings"),
        })}
      />
      <Stack.Screen
        name="BackupScreen"
        component={BackupScreen}
        options={({ navigation }) => ({
          headerLeft: () => <IconButton icon="arrow-back" onPress={() => navigation.goBack()} />,
          headerTitleStyle: theme.fonts.titleLarge,
          // title: t("themeSettings"),
        })}
      />
    </Stack.Navigator>
  );
};
