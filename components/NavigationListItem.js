import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon, ListItem} from '@ui-kitten/components';
import TranslateText from '../components/TranslateText';
const NavigationListItem = ({item, navigation}) => {
  const navigate = () => {
    navigation.navigate(item.screen, {...item.params});
  };

  return (
    <ListItem
      {...item}
      title={() => <TranslateText translate={item.key} style={styles.title} />}
      accessoryLeft={props => <Icon {...props} name={item.icon} />}
      onPress={navigate}
    />
  );
};

export default NavigationListItem;

const styles = StyleSheet.create({
  title: {fontSize: 16},
});
