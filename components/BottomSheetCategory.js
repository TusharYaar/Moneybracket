import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {List} from 'react-native-paper';
const BottomSheetCategory = ({item, onPress}) => {
  const handlePress = () => {
    onPress(item);
  };

  return (
    <List.Item
      title={item.category}
      description={item.type}
      onPress={handlePress}
      left={props => <List.Icon {...props} icon="buffer" color={item.color} />}
    />
  );
};

export default BottomSheetCategory;

const styles = StyleSheet.create({});
