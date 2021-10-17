import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import {Text} from '@ui-kitten/components';
import TranslateText from '../components/TranslateText';
import avalibleExchangeRates from '../data/exchangeRates';

import {useSelector} from 'react-redux';
import {format, parseISO} from 'date-fns';

import languages from '../languages/languages';

const TransactionItem = ({transaction, onPress}) => {
  const category = useSelector(state =>
    state.categories.categories.find(c => c.category === transaction.category),
  );
  const language = useSelector(state => state.settings.language);
  const currency = useSelector(state => state.settings.currency);
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.leftContainer}>
          <ImageBackground
            source={{uri: category.imageUri}}
            style={styles.categoryImg}
          />
          <View style={styles.textContainer}>
            <Text>{transaction.category}</Text>
            <Text category="c1">
              {format(parseISO(transaction.transaction_date), 'Lo MMM, yy', {
                locale: languages[language].locale,
              })}
            </Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <TranslateText category="h5" tag="numbers">
            {`${currency.symbol} ${transaction.transaction_amount.toFixed(2)}`}
          </TranslateText>
          {transaction.transaction_currency !== transaction.base_currency && (
            <TranslateText tag="numbers">
              {${
                avalibleExchangeRates.find(
                  rate => rate.code === transaction.transaction_currency,
                ).symbol
              } ${(
                transaction.transaction_amount * transaction.conversion_rate
              ).toFixed(2)}`}
            </TranslateText>
          )}
        </View>
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
  textContainer: {
    marginHorizontal: 20,
  },
  rightContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
