import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AddTransaction from "../screens/Tracker/AddTransaction";
import Setting from "../screens/Setting";
import {
  CategoryTabNavigator,
  ExchangeTabNavigator,
  TrackerTabNavigator,
} from "./TabNavigators";
import AddCategory from "../screens/Category/AddCategory";

const Stack = createNativeStackNavigator();

export const TrackerStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TrackerTab" component={TrackerTabNavigator} />
      <Stack.Screen name="AddTransactionScreen" component={AddTransaction} />
    </Stack.Navigator>
  );
};

export const CategoryStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CategoryTab" component={CategoryTabNavigator} />
      <Stack.Screen name="AddCategorycreen" component={AddCategory} />
    </Stack.Navigator>
  );
};

export const ExchangeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExchangeTab" component={ExchangeTabNavigator} />
    </Stack.Navigator>
  );
};

export const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingScreen" component={Setting} />
    </Stack.Navigator>
  );
};
