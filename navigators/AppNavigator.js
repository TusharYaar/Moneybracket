import React from 'react';

import {StyleSheet} from 'react-native';

import DrawerNavigator from './DrawerNavigator';
import {useSelector} from 'react-redux';
import LoadingScreen from '../screens/LoadingScreen';

const AppNavigator = () => {
  const settings = useSelector(state => state.settings);

  if (!settings.loaded) return <LoadingScreen />;

  return <DrawerNavigator />;
};

export default AppNavigator;

const styles = StyleSheet.create({});
