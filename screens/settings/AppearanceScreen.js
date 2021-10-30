import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  RadioButton,
  Button,
  Switch,
  Title,
  Subheading,
  Paragraph,
} from 'react-native-paper';

import DropDown from 'react-native-paper-dropdown';

import {useSelector, useDispatch} from 'react-redux';
import {updateLanguage, updateTheme} from '../../store/actions/settings';
import {changeTheme} from '../../store/actions/allThemes';

import TranslateText from '../../components/TranslateText';

import {removeSettings} from '../../helpers/asyncFunctions';

const AppearanceScreen = () => {
  const language = useSelector(state => state.settings.language);
  const currentTheme = useSelector(state => state.settings.theme);
  const nativeNumbers = useSelector(state => state.settings.nativeNumbers);
  const allThemes = useSelector(state => state.themes.allThemes);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const dispatch = useDispatch();

  const changeLanguage = value => {
    dispatch(updateLanguage({language: value}));
  };
  const changeNativeNumbers = value => {
    dispatch(updateLanguage({nativeNumbers: value}));
  };

  const handlechangeTheme = id => {
    dispatch(updateTheme(id));
    dispatch(changeTheme(id));
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
      <DropDown
        label="Theme"
        mode="outlined"
        visible={showThemeDropdown}
        showDropDown={() => setShowThemeDropdown(true)}
        onDismiss={() => setShowThemeDropdown(false)}
        value={currentTheme}
        setValue={handlechangeTheme}
        list={allThemes.map(theme => {
          return {label: theme.name, value: theme.id};
        })}
      />
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
