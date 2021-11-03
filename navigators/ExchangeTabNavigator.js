import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from 'react-native-paper';

import TranslateText from '../components/TranslateText';

import ExchangeRatesScreen from '../screens/exchange/ExchangeRatesScreen';
import ConversionScreen from '../screens/exchange/ConversionScreen';
const Tab = createMaterialTopTabNavigator();
const ExchangeTabNavigator = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: colors.accent},
      }}>
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
  title: props => (
    <TranslateText {...props} category="subheading">
      {title}
    </TranslateText>
  ),
});
