import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {getAppSettings, getCategories} from '../helpers/asyncFunctions';

import {useDispatch} from 'react-redux';

import {setDefaultSettings, setSettings} from '../store/actions/settings';
import {changeTheme} from '../store/actions/allThemes';

import {setCategories} from '../store/actions/categories';

const LoadingScreen = () => {
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    try {
      const categories = await getCategories();
      dispatch(setCategories(categories));
      const settings = await getAppSettings();
      if (settings) {
        dispatch(setSettings(settings));
        dispatch(changeTheme(settings.theme));
      } else dispatch(setDefaultSettings());
    } catch (error) {
      dispatch(setDefaultSettings());
    }
  }, [getAppSettings]);

  useEffect(() => {
    getData();
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
