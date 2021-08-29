import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Radio, RadioGroup, Text, Toggle} from '@ui-kitten/components';

import {useSelector, useDispatch} from 'react-redux';
import {LanguagesArray} from '../../languages/languages';
import {updateLanguage} from '../../store/actions/settings';

import TranslateText from '../../components/TranslateText';

import {removeSettings} from '../../helpers/asyncFunctions';

const AppearanceScreen = () => {
  const language = useSelector(state => state.settings.language);
  const nativeNumbers = useSelector(state => state.settings.nativeNumbers);
  const dispatch = useDispatch();
  const currentIndex = LanguagesArray.findIndex(
    lang => lang.value === language,
  );
  const changeLanguage = value => {
    dispatch(updateLanguage({language: LanguagesArray[value].value}));
  };
  const changeNativeNumbers = value => {
    dispatch(updateLanguage({nativeNumbers: value}));
  };

  return (
    <View>
      <Text category="h5">Appearance Screen</Text>
      <Text category="c1">Language Settings (experimental)</Text>
      <RadioGroup onChange={changeLanguage} selectedIndex={currentIndex}>
        <Radio>
          <TranslateText translate="english" tag="languages" />
        </Radio>
        <Radio>
          <TranslateText translate="hindi" tag="languages" />
        </Radio>
      </RadioGroup>
      <Text category="h6">Enable Native Language Numbers </Text>
      <Toggle checked={nativeNumbers} onChange={changeNativeNumbers} />

      <Button onPress={removeSettings}>Clear Storage</Button>
    </View>
  );
};

export default AppearanceScreen;
