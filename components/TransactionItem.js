import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import {Text} from '@ui-kitten/components';

import {useSelector} from 'react-redux';

const TransactionItem = ({transaction}) => {
  const category = useSelector(state =>
    state.categories.categories.find(c => c.category === transaction.category),
  );
  const currency = useSelector(state => state.settings.currency);
  return (
    <TouchableNativeFeedback>
      <View style={styles.itemContainer}>
        <View style={styles.leftContainer}>
          <ImageBackground
            source={{uri: category.imageUri}}
            style={styles.categoryImg}
          />
          <Text>{transaction.category}</Text>
        </View>
        <Text category="h4">
          {currency.symbol +
            ' ' +
            transaction.transaction_amount * transaction.conversion_rate}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryImg: {
    height: 40,
    width: 40,
  },
});
