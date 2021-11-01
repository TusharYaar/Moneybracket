import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Alert} from 'react-native';

import USID from 'usid';
import {useDispatch} from 'react-redux';
import {addTheme} from '../../store/actions/allThemes';

import {themeDetailsToObject, addThemeToDB} from '../../helpers/asyncFunctions';

import {Button, TextInput, Headline} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import ThemeColor from '../../components/ThemeColor';
const themeTypes = [
  {label: 'Light', value: 'light'},
  {label: 'Dark', value: 'dark'},
];
const usid = new USID();
const AddThemeScreen = ({navigation, route}) => {
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState({
    id: null,
    label: 'Custom Theme',
    isDark: false,
    primary: '#00bcd4',
    secondary: '#ff9800',
    background: '#ffffff',
    text: '#000000',
    paper: '#ff5722',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (theme.id === null) {
      setTheme({
        ...theme,
        id: usid.uuid(9),
      });
    }
    if (route.params) {
      setTheme(current => {
        return {...current, ...route.params};
      });
    }
  }, [route.params]);
  const handleThemeLabelChange = text => {
    setTheme({...theme, label: text});
  };

  const handleThemeTypeChange = type => {
    console.log(type);
    setTheme({...theme, isDark: type === 'dark'});
  };

  handleColorPress = key => {
    navigation.navigate('ChooseColor', {
      key,
      returnScreen: 'AddTheme',
      default: theme[key],
    });
  };

  handleAddTheme = async () => {
    if (theme.label.length < 1) {
      Alert.alert('Theme Label is required');
      return;
    }
    setIsLoading(true);
    await addThemeToDB(theme);
    const themeObj = themeDetailsToObject(theme);
    dispatch(addTheme(themeObj));
    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View>
        <TextInput
          placeholder="Theme Name"
          value={theme.label}
          onChangeText={handleThemeLabelChange}
          style={styles.margin}
          disabled={isLoading}
        />
        <DropDown
          label="Theme type"
          mode="contained"
          style={styles.margin}
          visible={showThemeDropdown}
          showDropDown={() => setShowThemeDropdown(true)}
          onDismiss={() => setShowThemeDropdown(false)}
          value={theme.isDark ? 'dark' : 'light'}
          setValue={handleThemeTypeChange}
          list={themeTypes}
          disabled={isLoading}
        />

        <View style={styles.themeColorContainer}>
          <Headline>Colors</Headline>
          <ThemeColor
            color={theme.primary}
            style={styles.themeColor}
            title="Primary"
            onPress={() => handleColorPress('primary')}
          />
          <ThemeColor
            color={theme.secondary}
            style={styles.themeColor}
            title="Secondary"
            onPress={() => handleColorPress('secondary')}
          />
          <ThemeColor
            color={theme.background}
            style={styles.themeColor}
            title="Background"
            onPress={() => handleColorPress('background')}
          />
          <ThemeColor
            color={theme.paper}
            style={styles.themeColor}
            title="Paper"
            onPress={() => handleColorPress('paper')}
          />
          <ThemeColor
            color={theme.text}
            style={styles.themeColor}
            title="Text"
            onPress={() => handleColorPress('text')}
          />
        </View>
      </View>
      <Button mode="contained" onPress={handleAddTheme} disabled={isLoading}>
        Add Color
      </Button>
    </ScrollView>
  );
};

export default AddThemeScreen;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  margin: {
    marginVertical: 10,
  },
  themeColorContainer: {
    marginVertical: 5,
  },
  themeColor: {
    marginVertical: 5,
  },
});
