import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import IconButton from '../components/IconButton';

import SettingScreen from '../screens/settings/SettingScreen';
import SecurityScreen from '../screens/settings/SecurityScreen';
import AppearanceScreen from '../screens/settings/AppearanceScreen';
import NotificationScreen from '../screens/settings/NotificationScreen';
import TranslateText from '../components/TranslateText';
import HomeScreen from '../screens/home/HomeScreen';
import AddTransactionScreen from '../screens/home/AddTransactionScreen';

const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

export const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingScreen}
        options={({navigation}) =>
          screenOptionsWithDrawer(navigation, 'settings')
        }
      />
      <SettingsStack.Screen
        name="Appearance"
        component={AppearanceScreen}
        options={() => screenOptionsWODrawer('appearance')}
      />
      <SettingsStack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={() => screenOptionsWODrawer('notifications')}
      />
      <SettingsStack.Screen
        name="Security"
        component={SecurityScreen}
        options={() => screenOptionsWODrawer('security')}
      />
    </SettingsStack.Navigator>
  );
};

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => screenOptionsWithDrawer(navigation, 'home')}
      />
      <HomeStack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={() => screenOptionsWODrawer('add_transaction')}
      />
    </HomeStack.Navigator>
  );
};

const screenOptionsWithDrawer = (navigation, title) => ({
  headerLeft: () => (
    <IconButton
      name="menu"
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  ),
  headerTitle: props => (
    <TranslateText {...props} category="h5">
      {title}
    </TranslateText>
  ),
});

const screenOptionsWODrawer = title => ({
  headerTitle: props => (
    <TranslateText {...props} category="h5">
      {title}
    </TranslateText>
  ),
});
