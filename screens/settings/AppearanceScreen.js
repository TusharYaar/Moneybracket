import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Radio, RadioGroup, Text} from '@ui-kitten/components';

import {useSelector, useDispatch} from 'react-redux';
import {LanguagesArray} from '../../languages/languages';
import {updateLanguage} from '../../store/actions/settings';

const AppearanceScreen = () => {
  const language = useSelector(state => state.settings.language);
  const dispatch = useDispatch();
  const currentIndex = LanguagesArray.findIndex(
    lang => lang.value === language,
  );
  const changeLanguage = value => {
    dispatch(updateLanguage({language: LanguagesArray[value].value}));
  };

  return (
    <View>
      <Text>Appearance Screen</Text>
      <RadioGroup onChange={changeLanguage} selectedIndex={currentIndex}>
        <Radio>English</Radio>
        <Radio>Hindi</Radio>
      </RadioGroup>
    </View>
  );
};

export default AppearanceScreen;
