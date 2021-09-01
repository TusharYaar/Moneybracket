import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  Drawer,
  DrawerItem,
  Layout,
  Text,
  IndexPath,
} from '@ui-kitten/components';

import {SettingsStackNavigator, HomeStackNavigator} from './StackNavigators';
import ExchangeRatesScreen from '../screens/ExchangeRatesScreen';

import TranslateText from '../components/TranslateText';

const SideDrawer = createDrawerNavigator();

const DrawerContent = ({navigation, state}) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem
      title={() => <TranslateText category="c1">home</TranslateText>}
    />
    <DrawerItem
      title={() => <TranslateText category="c1">settings</TranslateText>}
    />
    <DrawerItem
      title={() => <TranslateText category="c1">exchange_rates</TranslateText>}
    />
  </Drawer>
);

const DrawerNavigator = () => {
  return (
    <SideDrawer.Navigator
      screenOptions={screenOptions}
      drawerContent={props => <DrawerContent {...props} />}>
      <SideDrawer.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={() => settingsOptions('home')}
      />
      <SideDrawer.Screen
        name="SettingsStack"
        component={SettingsStackNavigator}
        options={() => settingsOptions('settings')}
      />
      <SideDrawer.Screen
        name="ExchangeRates"
        component={ExchangeRatesScreen}
        options={() => settingsOptions('exchange_rates')}
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

const settingsOptions = label => ({
  drawerLabel: props => (
    <TranslateText {...props} category="h6">
      {label}
    </TranslateText>
  ),
});
