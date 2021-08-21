import React from 'react';

import {StyleSheet} from 'react-native';

import DrawerNavigator from './DrawerNavigator';
import {useSelector} from 'react-redux';
import LoadingScreen from '../screens/LoadingScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const AppNavigator = () => {
  const settings = useSelector(state => state.settings);

  if (!settings.loaded) return <LoadingScreen />;
  else if (!settings.onboardingDone) return <OnboardingScreen />;
  return <DrawerNavigator />;
};

export default AppNavigator;

const styles = StyleSheet.create({});
