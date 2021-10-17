import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  RadioButton,
  Button,
  Text,
  Switch,
  Title,
  Subheading,
  Paragraph,
} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {updateLanguage} from '../../store/actions/settings';

import TranslateText from '../../components/TranslateText';

import {removeSettings} from '../../helpers/asyncFunctions';

const AppearanceScreen = () => {
  const language = useSelector(state => state.settings.language);
  const nativeNumbers = useSelector(state => state.settings.nativeNumbers);
  const dispatch = useDispatch();

  const changeLanguage = value => {
    dispatch(updateLanguage({language: value}));
  };
  const changeNativeNumbers = value => {
    dispatch(updateLanguage({nativeNumbers: value}));
  };

  return (
    <View>
      <Title>Appearance Screen</Title>
      <Subheading>Language Settings (experimental)</Subheading>
      <RadioButton.Group onValueChange={changeLanguage} value={language}>
        <View style={styles.radioOption}>
          <RadioButton value="en" />
          <TranslateText translate="english" tag="languages" />
        </View>
        <View style={styles.radioOption}>
          <RadioButton value="hi" />
          <TranslateText translate="hindi" tag="languages" />
        </View>
      </RadioButton.Group>
      <View style={styles.switchOption}>
        <Paragraph category="h6">Enable Native Language Numbers </Paragraph>
        <Switch value={nativeNumbers} onValueChange={changeNativeNumbers} />
      </View>

      <Button onPress={removeSettings} mode="contained">
        Clear Storage
      </Button>
    </View>
  );
};

export default AppearanceScreen;

const styles = StyleSheet.create({
  radioOption: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
