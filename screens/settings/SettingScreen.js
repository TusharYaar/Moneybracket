import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, List} from 'react-native-paper';

import TranslateText from '../../components/TranslateText';

const SettingScreen = ({navigation}) => {
  const handleClick = screen => {
    navigation.navigate(screen);
  };
  return (
    <View>
      <List.Item
        title={<TranslateText translate="appearance" category="subheading" />}
        left={props => <List.Icon {...props} icon="format-color-fill" />}
        onPress={() => handleClick('Appearance')}
      />
      <Divider />
      <List.Item
        title={
          <TranslateText translate="notifications" category="subheading" />
        }
        left={props => <List.Icon {...props} icon="bell-ring" />}
        onPress={() => handleClick('Notifications')}
      />
      <Divider />
      <List.Item
        title={<TranslateText translate="security" category="subheading" />}
        left={props => <List.Icon {...props} icon="account-lock" />}
        onPress={() => handleClick('Security')}
      />
      <Divider />
      <List.Item
        title={<TranslateText translate="currency" category="subheading" />}
        left={props => <List.Icon {...props} icon="credit-card" />}
        onPress={() => handleClick('Currency')}
      />
      <Divider />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listItem: {
    fontWeight: 'bold',
  },
});
