import React, {useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import AppNavigator from './navigators/AppNavigator';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {default as theme} from './themes/custom-theme.json';

import {useDispatch} from 'react-redux';
import {lockOnBackgroundFunction} from './store/actions/settings';

const AppContainer = () => {
  const dispatch = useDispatch();

  const appState = useRef(AppState.currentState);

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
      <IconRegistry icons={EvaIconsPack} />
      <PaperProvider>
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
          <AppNavigator />
        </ApplicationProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default AppContainer;
