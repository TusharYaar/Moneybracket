import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import IconButton from '../components/IconButton';

import SettingScreen from '../screens/settings/SettingScreen';
import SecurityScreen from '../screens/settings/SecurityScreen';
import AppearanceScreen from '../screens/settings/AppearanceScreen';
import TranslateText from '../components/TranslateText';

const SettingsStack = createNativeStackNavigator();

export const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator screenOptions={stackOptions}>
      <SettingsStack.Screen
        name="Settings"
        component={SettingScreen}
        options={({navigation}) => screenOptions(navigation, 'settings')}
      />
      <SettingsStack.Screen name="Appearance" component={AppearanceScreen} />
      <SettingsStack.Screen name="Security" component={SecurityScreen} />
    </SettingsStack.Navigator>
  );
};

const screenOptions = (navigation, title) => ({
  headerLeft: () => (
    <IconButton
      name="menu"
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  ),
  headerTitle: props => <TranslateText {...props} translate={title} />,
});

const stackOptions = {
  headerTitleStyle: {
    fontWeight: '400',
    fontSize: 20,
    color: 'red',
  },
};
