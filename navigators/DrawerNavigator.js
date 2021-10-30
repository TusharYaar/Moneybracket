import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from '../components/DrawerContent';

import {
  SettingsStackNavigator,
  CategoriesStackNavigator,
  HomeStackNavigator,
  ExchangeStackNavigator,
  RecurringTransactionStackNavigator,
} from './StackNavigators';

const SideDrawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <SideDrawer.Navigator
      screenOptions={screenOptions}
      drawerContent={props => <DrawerContent {...props} />}>
      <SideDrawer.Screen name="HomeStack" component={HomeStackNavigator} />
      <SideDrawer.Screen
        name="SettingsStack"
        component={SettingsStackNavigator}
      />
      <SideDrawer.Screen
        name="ExchangeStack"
        component={ExchangeStackNavigator}
      />
      <SideDrawer.Screen
        name="CategoriesStack"
        component={CategoriesStackNavigator}
      />
      <SideDrawer.Screen
        name="RecurringTransactionsStack"
        component={RecurringTransactionStackNavigator}
      />
    </SideDrawer.Navigator>
  );
};

export default DrawerNavigator;

const screenOptions = {
  headerStyle: {
    backgroundColor: '#00bcd4',
  },
  headerShown: false,
};
