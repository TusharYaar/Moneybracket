import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from 'react-native-paper';

const BottomSheetCurrency = ({item, onPress}) => {
  const handlePress = () => {
    onPress(item.code);
  };
  console.log(item);
  return (
    <List.Item
      title={item.country}
      description={item.symbol}
      onPress={handlePress}
      left={props => (
        <List.Icon {...props} icon={{uri: item.flag}} color={item.color} />
      )}
    />
  );
};

export default BottomSheetCurrency;

const styles = StyleSheet.create({});
