import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import IconButton from '../components/IconButton';

import SettingScreen from '../screens/settings/SettingScreen';
import SecurityScreen from '../screens/settings/SecurityScreen';
import AppearanceScreen from '../screens/settings/AppearanceScreen';
import NotificationScreen from '../screens/settings/NotificationScreen';
import TranslateText from '../components/TranslateText';

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

const screenOptionsWithDrawer = (navigation, title) => ({
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

const screenOptionsWODrawer = title => ({
  headerTitle: props => <TranslateText {...props} translate={title} />,
});
