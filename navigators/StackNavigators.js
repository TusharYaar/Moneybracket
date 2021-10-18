import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {IconButton} from 'react-native-paper';

import SettingScreen from '../screens/settings/SettingScreen';
import SecurityScreen from '../screens/settings/SecurityScreen';
import CurrencyScreen from '../screens/settings/CurrencyScreen';

import AppearanceScreen from '../screens/settings/AppearanceScreen';
import NotificationScreen from '../screens/settings/NotificationScreen';
import TranslateText from '../components/TranslateText';
import HomeTabNavigator from './HomeTabNavigator';
import AddTransactionScreen from '../screens/home/AddTransactionScreen';
import EditTransactionScreen from '../screens/home/EditTransactionScreen';

import AllCategories from '../screens/categories/AllCategories';
import AddCategory from '../screens/categories/AddCategory';
import ViewCategory from '../screens/categories/ViewCategory';
import ExchangeTabNavigator from './ExchangeTabNavigator';

import AddRecurringPaymentsScreen from '../screens/recurringPayments/AddRecurringPaymentsScreen';
import EditRecurringPaymentsScreen from '../screens/recurringPayments/EditRecurringPaymentsScreen';
import AllRecurringPaymentsScreen from '../screens/recurringPayments/AllRecurringPaymentsScreen';

const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const CategoriesStack = createNativeStackNavigator();
const ExchangeStack = createNativeStackNavigator();
const ReccurringPaymentStack = createNativeStackNavigator();

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
        component={HomeTabNavigator}
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
    <CategoriesStack.Navigator>
      <CategoriesStack.Screen
        name="AllCategories"
        component={AllCategories}
        options={({navigation}) =>
          screenOptionsWithDrawer(navigation, 'categories')
        }
      />
      <CategoriesStack.Screen
        name="AddCategory"
        component={AddCategory}
        options={() => screenOptionsWODrawer('add_category')}
      />
      <CategoriesStack.Screen
        name="ViewCategory"
        component={ViewCategory}
        options={() => screenOptionsWODrawer('view_category')}
      />
    </CategoriesStack.Navigator>
  );
};

export const ExchangeStackNavigator = () => {
  return (
    <ExchangeStack.Navigator>
      <ExchangeStack.Screen
        name="Exchange"
        component={ExchangeTabNavigator}
        options={({navigation}) =>
          screenOptionsWithDrawer(navigation, 'exchange_rates')
        }
      />
    </ExchangeStack.Navigator>
  );
};

export const ReccurringPaymentStackNavigator = () => {
  return (
    <ReccurringPaymentStack.Navigator>
      <ReccurringPaymentStack.Screen
        name="AllRecurringPayments"
        component={AllRecurringPaymentsScreen}
        options={({navigation}) =>
          screenOptionsWithDrawer(navigation, 'recurring_payments')
        }
      />
      <ReccurringPaymentStack.Screen
        name="EditRecurringPayments"
        component={EditRecurringPaymentsScreen}
        options={({navigation}) =>
          screenOptionsWithDrawer(navigation, 'recurring_payments')
        }
      />
      <ReccurringPaymentStack.Screen
        name="AddRecurringPayments"
        component={AddRecurringPaymentsScreen}
        options={({navigation}) =>
          screenOptionsWithDrawer(navigation, 'recurring_payments')
        }
      />
    </ReccurringPaymentStack.Navigator>
  );
};

const screenOptionsWithDrawer = (navigation, title) => ({
  headerLeft: () => (
    <IconButton
      icon="menu"
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  ),
  headerTitle: props => <TranslateText {...props}>{title}</TranslateText>,
});

const screenOptionsWODrawer = title => ({
  headerTitle: props => <TranslateText {...props}>{title}</TranslateText>,
});
