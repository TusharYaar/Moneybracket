import React from 'react';

import {StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';

import {Drawer} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useSelector} from 'react-redux';
import {translateAppText} from '../helpers/translate';

const DrawerContent = props => {
  const language = useSelector(state => state.settings.language);
  const translateScreenLabel = label => {
    return translateAppText(language, false, label);
  };
  const handlePress = stackName => {
    props.navigation.navigate(stackName);
  };
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section>
        <Drawer.Item
          icon={({color, size}) => (
            <Icon name="home-currency-usd" color={color} size={size} />
          )}
          label={translateScreenLabel('home')}
          onPress={() => {
            handlePress('HomeStack');
          }}
        />
        <Drawer.Item
          icon={({color, size}) => (
            <Icon name="tune" color={color} size={size} />
          )}
          label={translateScreenLabel('settings')}
          onPress={() => {
            handlePress('SettingsStack');
          }}
        />
        <Drawer.Item
          icon={({color, size}) => (
            <Icon name="calculator-variant" color={color} size={size} />
          )}
          label={translateScreenLabel('exchange_rates')}
          onPress={() => {
            handlePress('ExchangeStack');
          }}
        />
        <Drawer.Item
          icon={({color, size}) => (
            <Icon name="buffer" color={color} size={size} />
          )}
          label={translateScreenLabel('categories')}
          onPress={() => {
            handlePress('CategoriesStack');
          }}
        />
        <Drawer.Item
          icon={({color, size}) => (
            <Icon name="cached" color={color} size={size} />
          )}
          label={translateScreenLabel('recurring_transactions')}
          onPress={() => {
            handlePress('RecurringTransactionsStack');
          }}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({});
