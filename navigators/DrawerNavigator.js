import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {SettingsStackNavigator, HomeStackNavigator} from './StackNavigators';
import ExchangeRatesScreen from '../screens/ExchangeRatesScreen';

import TranslateText from '../components/TranslateText';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={screenOptions}>
      <Drawer.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={({navigation}) => settingsOptions(navigation, 'home')}
      />
      <Drawer.Screen
        name="SettingsStack"
        component={SettingsStackNavigator}
        options={({navigation}) => settingsOptions(navigation, 'settings')}
      />
      <Drawer.Screen
        name="ExchangeRates"
        component={ExchangeRatesScreen}
        options={({navigation}) =>
          settingsOptions(navigation, 'exchange_rates')
        }
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const screenOptions = {
  headerStyle: {
    backgroundColor: '#00bcd4',
  },
  headerShown: false,
};

const settingsOptions = (navigation, label) => ({
  drawerLabel: props => (
    <TranslateText {...props} category="h6">
      {label}
    </TranslateText>
  ),
});
