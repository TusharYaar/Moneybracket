import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  RadioButton,
  Button,
  Switch,
  Title,
  Subheading,
  Paragraph,
  Divider,
  Caption,
} from 'react-native-paper';

import Description from '../../components/Description';

import DropDown from 'react-native-paper-dropdown';

import {useSelector, useDispatch} from 'react-redux';
import {updateLanguage, updateTheme} from '../../store/actions/settings';
import {changeTheme} from '../../store/actions/allThemes';

import TranslateText from '../../components/TranslateText';

import {removeSettings} from '../../helpers/asyncFunctions';

const AppearanceScreen = ({navigation, route}) => {
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
    dispatch(updateTheme(id)); // update theme id in settings which is used to determine which theme to load on startup
    dispatch(changeTheme(id)); // change theme in allThemes Reducer which provides the theme object
  };
  return (
    <ScrollView style={styles.screen}>
      <Title>Appearance Screen</Title>
      <View style={styles.section}>
        <Subheading>
          Language Settings <Caption>(experimental)</Caption>
        </Subheading>
        <Description>
          Choose the default language for the application
        </Description>
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
        <Description>
          Enable this to show numbers in selectedlanguage, else it would show in
          english
        </Description>
      </View>
      <Divider />
      <View style={styles.section}>
        <Subheading>Theme Settings</Subheading>
        <DropDown
          label="Theme"
          mode="contained"
          visible={showThemeDropdown}
          showDropDown={() => setShowThemeDropdown(true)}
          onDismiss={() => setShowThemeDropdown(false)}
          value={currentTheme}
          setValue={handlechangeTheme}
          list={allThemes.map(theme => {
            return {label: theme.label, value: theme.id};
          })}
        />
        <Description>Choose A theme for the application</Description>
        <Button onPress={removeSettings} mode="contained" style={styles.button}>
          Clear Storage
        </Button>
        <Description>
          If you are seeing this, then the app is still in developement
        </Description>
        <Button
          onPress={() => navigation.navigate('AddTheme')}
          mode="contained"
          style={styles.button}>
          Add A Theme
        </Button>
        <Description>
          Add a custom theme, you can add upto 3 custom themes.
        </Description>
        <Button
          onPress={() => navigation.navigate('AddTheme')}
          mode="contained"
          style={styles.button}>
          Edit Custom Themes
        </Button>
        <Description>Edit themes made by you.</Description>
      </View>
    </ScrollView>
  );
};

export default AppearanceScreen;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 5,
  },
  section: {
    marginVertical: 10,
  },
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
  button: {
    marginTop: 10,
  },
});
