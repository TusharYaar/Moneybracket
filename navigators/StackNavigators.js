import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IconButton from '../components/IconButton';


import SettingScreen from "../screens/settings/SettingScreen";
import SecurityScreen from "../screens/settings/SecurityScreen";
import AppearanceScreen from "../screens/settings/AppearanceScreen";




const SettingsStack =createNativeStackNavigator();

export const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator>
        <SettingsStack.Screen name="Settings" component={SettingScreen} options={settingsOptions} />
        <SettingsStack.Screen name="Appearance" component={AppearanceScreen} />
        <SettingsStack.Screen name="Security" component={SecurityScreen} />

      
    </SettingsStack.Navigator>
  );
}

const settingsOptions =({navigation}) => ({
  drawerLabel:"Settings",
  headerLeft: ()=> <IconButton name="menu" onPress={() => {navigation.openDrawer()}} />
})