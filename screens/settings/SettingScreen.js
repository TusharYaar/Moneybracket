import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Divider, Icon, List, ListItem} from '@ui-kitten/components';

import settingsData from '../../navigationData/settings';

import NavigationListItem from '../../components/NavigationListItem';

const SettingScreen = ({navigation}) => {
  return (
    <List
      data={settingsData}
      ItemSeparatorComponent={Divider}
      renderItem={({item}) => (
        <NavigationListItem item={item} navigation={navigation} />
      )}
    />
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
