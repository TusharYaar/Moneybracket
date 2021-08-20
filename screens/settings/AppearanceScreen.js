import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Radio, RadioGroup, Text} from '@ui-kitten/components';

import {useSelector, useDispatch} from 'react-redux';
import {LanguagesArray} from '../../languages/languages';
import {updateLanguage} from '../../store/actions/settings';

import TranslateText from '../../components/TranslateText';
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
        <Radio>
          <TranslateText translate="english" tag="languages" />
        </Radio>
        <Radio>
          <TranslateText translate="hindi" tag="languages" />
        </Radio>
      </RadioGroup>
    </View>
  );
};

export default AppearanceScreen;
