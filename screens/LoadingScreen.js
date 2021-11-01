import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {
  getAppSettings,
  getCategories,
  getThemes,
  themeDetailsToObject,
} from '../helpers/asyncFunctions';

import {useDispatch} from 'react-redux';

import {setDefaultSettings, setSettings} from '../store/actions/settings';
import {changeTheme, mergeThemes} from '../store/actions/allThemes';

import {setCategories} from '../store/actions/categories';

const LoadingScreen = () => {
  const dispatch = useDispatch();
  const getData = useCallback(async () => {
    try {
      const categories = await getCategories();
      dispatch(setCategories(categories));
      const {themes} = await getThemes();
      themeObjs = themes.map(theme => themeDetailsToObject(theme));
      dispatch(mergeThemes(themeObjs));
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
