import React from 'react';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import TranslateText from '../components/TranslateText';
const NavigationListItem = ({item, navigation}) => {
  const navigate = () => {
    navigation.navigate(item.screen, {...item.params});
  };

  return (
    <List.Item
      title={<TranslateText translate={item.key} style={styles.title} />}
      left={props => <List.Icon {...props} icon={item.icon} />}
      onPress={navigate}
    />
  );
};

export default NavigationListItem;

const styles = StyleSheet.create({
  title: {fontWeight: 'bold', color: 'green'},
});
