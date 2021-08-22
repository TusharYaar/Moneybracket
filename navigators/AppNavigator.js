import React from 'react';

import {StyleSheet} from 'react-native';

import DrawerNavigator from './DrawerNavigator';
import {useSelector} from 'react-redux';
import LoadingScreen from '../screens/LoadingScreen';
import PinLockScreen from '../screens/PinLockScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import {LockStackNavigator} from './StackNavigators';
const AppNavigator = () => {
  const settings = useSelector(state => state.settings);
  if (!settings.loaded) return <LoadingScreen />;
  else if (!settings.onboardingDone) return <OnboardingScreen />;
  else if (settings.security.enabled && settings.locked)
    return <LockStackNavigator />;
  else return <DrawerNavigator />;
};

export default AppNavigator;

const styles = StyleSheet.create({});
