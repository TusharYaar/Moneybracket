import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {SettingsStackNavigator} from "./StackNavigators";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => { 
  return (
      <Drawer.Navigator screenOptions={screenOptions}>
        <Drawer.Screen name="SettingsStack" component={SettingsStackNavigator}  options={settingsOptions}/>
      </Drawer.Navigator>
    );
  }


export default DrawerNavigator;

const screenOptions = {
  headerStyle: {
    backgroundColor: '#00bcd4',
  },
  headerShown: false,
}

const settingsOptions =({navigation}) => ({
  drawerLabel:"Settings",
})
