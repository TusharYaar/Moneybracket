import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import IconButton from '../components/IconButton';

import SettingScreen from '../screens/settings/SettingScreen';
import SecurityScreen from '../screens/settings/SecurityScreen';
import AppearanceScreen from '../screens/settings/AppearanceScreen';
import CustomText from '../components/CustomText';

import {translateAppText, getFont} from "../helpers/translate"

import {useSelector} from 'react-redux';

const SettingsStack = createNativeStackNavigator();

export const SettingsStackNavigator = () => {
  const settings = useSelector(state => state.settings);
  // console.log(settings);

  return (
    <SettingsStack.Navigator screenOptions={stackOptions}>
      <SettingsStack.Screen
        name="Settings"
        component={SettingScreen}
        options={({navigation}) =>
          screenOptions(navigation,settings.language, "settings")
        }
      />
      <SettingsStack.Screen name="Appearance" component={AppearanceScreen} />
      <SettingsStack.Screen name="Security" component={SecurityScreen} />
    </SettingsStack.Navigator>
  );
};

const screenOptions = (navigation,language, title) => ({
  title: translateAppText(language,title),
  headerLeft: () => (
    <IconButton
      name="menu"
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  ),
});

const stackOptions = {
  headerTitleStyle: {
    fontFamily: "serif",
    fontSize: 20,
    color: "red",
  },
}