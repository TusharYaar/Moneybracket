import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  Drawer,
  DrawerItem,
  Layout,
  Text,
  IndexPath,
} from '@ui-kitten/components';

import {
  SettingsStackNavigator,
  HomeStackNavigator,
  CategoriesStackNavigator,
} from './StackNavigators';
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
    <DrawerItem
      title={() => <TranslateText category="c1">categories</TranslateText>}
    />
  </Drawer>
);

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
      <SideDrawer.Screen name="ExchangeRates" component={ExchangeRatesScreen} />
      <SideDrawer.Screen
        name="Categories"
        component={CategoriesStackNavigator}
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
