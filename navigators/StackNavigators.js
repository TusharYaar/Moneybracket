import React from 'react'
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';


import SettingScreen from "../screens/setting/SettingScreen";



const SettingsStack =createNativeStackNavigator();

export const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator>
        <SettingsStack.Screen name="Settings" component={SettingScreen} options={settingsOptions} />
    </SettingsStack.Navigator>
  );
}

const settingsOptions =({navigation}) => ({
  drawerLabel:"Settings",
  headerLeft: ()=> <Ionicons name="menu" size={24} color="black" onPress={() => {navigation.openDrawer()}} />
})