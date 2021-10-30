import React, {useEffect, useState, useRef} from 'react';
import {AppState} from 'react-native';
import AppNavigator from './navigators/AppNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

import defaultThemes from './data/defaultThemes';

import {useDispatch, useSelector} from 'react-redux';
import {lockOnBackgroundFunction} from './store/actions/settings';

const AppContainer = () => {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const currentThemeObj = useSelector(state => state.themes.currentTheme);
  useEffect(() => {}, []);

  // useEffect(() => {
  //   // This function dispatches a redux action to lock the app on background if the appstatus  is inactive or background
  //   // it makes its own payload
  //   // for some reason store defaults to initialState when appState chances for a breif moment
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     )
  //       dispatch(lockOnBackgroundFunction());
  //     appState.current = nextAppState;
  //   });
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  return (
    <NavigationContainer>
      <PaperProvider theme={currentThemeObj}>
        <AppNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default AppContainer;
