import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {IconButton, useTheme} from 'react-native-paper';

import SettingScreen from '../screens/settings/SettingScreen';
import SecurityScreen from '../screens/settings/SecurityScreen';
import CurrencyScreen from '../screens/settings/CurrencyScreen';
import AddPinScreen from '../screens/settings/AddPinScreen';

import AppearanceScreen from '../screens/settings/AppearanceScreen';
import AddThemeScreen from '../screens/settings/AddThemeScreen';
import NotificationScreen from '../screens/settings/NotificationScreen';
import TranslateText from '../components/TranslateText';
import HomeTabNavigator from './HomeTabNavigator';
import AddTransactionScreen from '../screens/home/AddTransactionScreen';
import EditTransactionScreen from '../screens/home/EditTransactionScreen';

import AllCategories from '../screens/categories/AllCategories';
import AddCategory from '../screens/categories/AddCategory';
import ViewCategory from '../screens/categories/ViewCategory';
import ExchangeTabNavigator from './ExchangeTabNavigator';

import AddRecurringTransactionScreen from '../screens/recurringTransactions/AddRecurringTransactionScreen';
import EditRecurringTransactionScreen from '../screens/recurringTransactions/EditRecurringTransactionScreen';
import AllRecurringTransactionsScreen from '../screens/recurringTransactions/AllRecurringTransactionsScreen';

import ChooseColorScreen from '../screens/ChooseColorScreen';

const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const CategoriesStack = createNativeStackNavigator();
const ExchangeStack = createNativeStackNavigator();
const RecurringTransactionStack = createNativeStackNavigator();

export const SettingsStackNavigator = () => {
  const {colors} = useTheme();
  const options = {
    headerStyle: {
      backgroundColor: colors.surface,
    },
    headerBackVisible: false,
  };
  return (
    <SettingsStack.Navigator screenOptions={options}>
      <SettingsStack.Screen
        name="Settings"
        component={SettingScreen}
        options={({navigation}) => screenOptions(navigation, 'settings')}
      />
      <SettingsStack.Screen
        name="Appearance"
        component={AppearanceScreen}
        options={({navigation}) =>
          screenOptions(navigation, 'appearance', 'arrow-left')
        }
      />
      <SettingsStack.Screen
        name="AddTheme"
        component={AddThemeScreen}
        options={({navigation}) =>
          screenOptions(navigation, 'appearance', 'arrow-left')
        }
      />
      <SettingsStack.Screen
        name="ChooseColor"
        component={ChooseColorScreen}
        options={({navigation}) =>
          screenOptions(navigation, 'appearance', 'arrow-left')
        }
      />
      <SettingsStack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={({navigation}) =>
          screenOptions(navigation, 'notifications', 'arrow-left')
        }
      />
      <SettingsStack.Screen
        name="Security"
        component={SecurityScreen}
        options={({navigation}) =>
          screenOptions(navigation, 'security', 'arrow-left')
        }
      />
      <SettingsStack.Screen
        name="AddPin"
        component={AddPinScreen}
        options={({navigation}) =>
          screenOptions(navigation, 'security', 'arrow-left')
        }
      />

      <SettingsStack.Screen
        name="Currency"
        component={CurrencyScreen}
        options={({navigation}) =>
          screenOptions(navigation, 'currency', 'arrow-left')
        }
      />
    </SettingsStack.Navigator>
  );
};

export const HomeStackNavigator = () => {
  const {colors} = useTheme();
  const options = {
    headerStyle: {
      backgroundColor: colors.surface,
    },
    headerBackVisible: false,
  };
  return (
    <HomeStack.Navigator screenOptions={options}>
      <HomeStack.Screen
        name="Home"
        component={HomeTabNavigator}
        options={({navigation}) => screenOptions(navigation, 'home')}
      />
      <HomeStack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={({navigation}) =>
          screenOptions(navigation, 'add_transaction', 'arrow-left')
        }
      />
      <HomeStack.Screen
        name="EditTransaction"
        component={EditTransactionScreen}
        options={({navigation}) =>
          screenOptions(navigation, 'edit_transaction', 'arrow-left')
        }
      />
    </HomeStack.Navigator>
  );
};

export const CategoriesStackNavigator = () => {
  const {colors} = useTheme();
  const options = {
    headerStyle: {
      backgroundColor: colors.surface,
    },
    headerBackVisible: false,
  };
  return (
    <CategoriesStack.Navigator screenOptions={options}>
      <CategoriesStack.Screen
        name="AllCategories"
        component={AllCategories}
        options={({navigation}) => screenOptions(navigation, 'categories')}
      />
      <CategoriesStack.Screen
        name="AddCategory"
        component={AddCategory}
        options={({navigation}) =>
          screenOptions(navigation, 'add_category', 'arrow-left')
        }
      />
      <CategoriesStack.Screen
        name="ViewCategory"
        component={ViewCategory}
        options={({navigation}) =>
          screenOptions(navigation, 'view_category', 'arrow-left')
        }
      />
      <CategoriesStack.Screen
        name="ChooseColor"
        component={ChooseColorScreen}
        options={({navigation}) =>
          screenOptions(navigation, 'appearance', 'arrow-left')
        }
      />
    </CategoriesStack.Navigator>
  );
};

export const ExchangeStackNavigator = () => {
  const {colors} = useTheme();
  const options = {
    headerStyle: {
      backgroundColor: colors.surface,
    },
    headerBackVisible: false,
  };
  return (
    <ExchangeStack.Navigator screenOptions={options}>
      <ExchangeStack.Screen
        name="Exchange"
        component={ExchangeTabNavigator}
        options={({navigation}) => screenOptions(navigation, 'exchange_rates')}
      />
    </ExchangeStack.Navigator>
  );
};

export const RecurringTransactionStackNavigator = () => {
  const {colors} = useTheme();
  const options = {
    headerStyle: {
      backgroundColor: colors.surface,
    },
    headerBackVisible: false,
  };
  return (
    <RecurringTransactionStack.Navigator screenOptions={options}>
      <RecurringTransactionStack.Screen
        name="AllRecurringTransaction"
        component={AllRecurringTransactionsScreen}
        options={({navigation}) =>
          screenOptions(navigation, 'recurring_transactions')
        }
      />
      <RecurringTransactionStack.Screen
        name="EditRecurringTransaction"
        component={EditRecurringTransactionScreen}
        options={({navigation}) =>
          screenOptions(navigation, 'recurring_transactions', 'arrow-left')
        }
      />
      <RecurringTransactionStack.Screen
        name="AddRecurringTransaction"
        component={AddRecurringTransactionScreen}
        options={({navigation}) =>
          screenOptions(navigation, 'recurring_transactions', 'arrow-left')
        }
      />
    </RecurringTransactionStack.Navigator>
  );
};

const screenOptions = (navigation, title, icon = 'menu') => ({
  headerLeft: () => (
    <IconButton
      icon={icon}
      onPress={() => {
        icon === 'menu' ? navigation.openDrawer() : navigation.goBack();
      }}
    />
  ),
  headerTitle: props => (
    <TranslateText
      {...props}
      category="subheading"
      style={{fontFamily: 'NotoSans-SemiBold'}}>
      {title}
    </TranslateText>
  ),
});
