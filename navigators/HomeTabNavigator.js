import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TranslateText from '../components/TranslateText';

import HomeScreen from '../screens/home/HomeScreen';
import GraphScreen from '../screens/home/GraphScreen';
const Tab = createMaterialTopTabNavigator();
const HomeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={() => screenOptionsTab('transactions')}
      />
      <Tab.Screen
        name="GraphTab"
        component={GraphScreen}
        options={() => screenOptionsTab('graphs')}
      />
    </Tab.Navigator>
  );
};
export default HomeTabNavigator;

const screenOptionsTab = title => ({
  title: props => <TranslateText {...props}>{title}</TranslateText>,
});
