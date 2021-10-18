import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TranslateText from '../components/TranslateText';

import ExchangeRatesScreen from '../screens/exchange/ExchangeRatesScreen';
import ConversionScreen from '../screens/exchange/ConversionScreen';
const Tab = createMaterialTopTabNavigator();
const ExchangeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Rates"
        component={ExchangeRatesScreen}
        options={() => screenOptionsTab('transactions')}
      />
      <Tab.Screen
        name="Conversion"
        component={ConversionScreen}
        options={() => screenOptionsTab('graphs')}
      />
    </Tab.Navigator>
  );
};
export default ExchangeTabNavigator;

const screenOptionsTab = title => ({
  title: props => <TranslateText {...props}>{title}</TranslateText>,
});
