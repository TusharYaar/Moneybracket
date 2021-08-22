import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {getAppSettings, removeSettings} from '../helpers/asyncFunctions';

import {useDispatch} from 'react-redux';

import {setDefaultSettings, setSettings} from '../store/actions/settings';

const LoadingScreen = () => {
  const dispatch = useDispatch();

  const getSettings = useCallback(async () => {
    try {
      const settings = await getAppSettings();
      if (settings) {
        // console.log('From Async Storage', settings);
        dispatch(setSettings(settings));
      } else dispatch(setDefaultSettings());
    } catch (error) {
      console.error(error);
      dispatch(setDefaultSettings());
    }
  }, [getAppSettings]);

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Money Bracket</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
