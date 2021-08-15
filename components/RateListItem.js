import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const RateListItem = ({item, value}) => {
  value = value ? value : 0;
  return (
    <View style={styles.listItem}>
      <Text>
        {(item.rate * value).toFixed(2)} {item.symbol}
      </Text>
    </View>
  );
};

export default RateListItem;

const styles = StyleSheet.create({
  listItem: {
    padding: 30,
  },
});
