import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "../screens/Setting";
import {
  CategoryTabNavigator,
  ExchangeTabNavigator,
  TrackerTabNavigator,
} from "./TabNavigators";
import { IconButton } from "react-native-paper";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "./DrawerNavigator";

export type StackParamList = {
  TrackerTab: undefined;

  CategoryTab: undefined;

  ExchangeTab: undefined;

  SettingScreen: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

type TrackerStackProps = DrawerScreenProps<DrawerParamList, "TrackerStack">;
export const TrackerStackNavigator = ({ }: TrackerStackProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrackerTab"
        component={TrackerTabNavigator}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export const CategoryStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryTab"
        component={CategoryTabNavigator}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export const ExchangeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExchangeTab"
        component={ExchangeTabNavigator}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingScreen"
        component={Setting}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
