import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import IconButton from '../components/IconButton';

import SettingScreen from '../screens/settings/SettingScreen';
import SecurityScreen from '../screens/settings/SecurityScreen';
import CurrencyScreen from '../screens/settings/CurrencyScreen';

import AppearanceScreen from '../screens/settings/AppearanceScreen';
import NotificationScreen from '../screens/settings/NotificationScreen';
import TranslateText from '../components/TranslateText';
import HomeScreen from '../screens/home/HomeScreen';
import AddTransactionScreen from '../screens/home/AddTransactionScreen';
import EditTransactionScreen from '../screens/home/EditTransactionScreen';

import AllCategories from '../screens/categories/AllCategories';
import AddCategory from '../screens/categories/AddCategory';

const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const categoriesStack = createNativeStackNavigator();

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
      <SettingsStack.Screen
        name="Currency"
        component={CurrencyScreen}
        options={() => screenOptionsWODrawer('currency')}
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
      <HomeStack.Screen
        name="EditTransaction"
        component={EditTransactionScreen}
        options={() => screenOptionsWODrawer('edit_transaction')}
      />
    </HomeStack.Navigator>
  );
};

export const CategoriesStackNavigator = () => {
  return (
    <categoriesStack.Navigator>
      <categoriesStack.Screen
        name="AllCategories"
        component={AllCategories}
        options={({navigation}) =>
          screenOptionsWithDrawer(navigation, 'categories')
        }
      />
      <categoriesStack.Screen
        name="AddCategory"
        component={AddCategory}
        options={() => screenOptionsWODrawer('add_transaction')}
      />
    </categoriesStack.Navigator>
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
