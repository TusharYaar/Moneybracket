import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert, FlatList} from 'react-native';
import {Button} from '@ui-kitten/components';

import {useSelector, useDispatch} from 'react-redux';
import {setExchangeRates} from '../../store/actions/exchangeRates';

import avalibleExchangeRates from '../../data/exchangeRates.js';

import {getTransactions} from '../../helpers/dbFunctions';
import {setTransactions} from '../../store/actions/transactions';

import TransactionItem from '../../components/TransactionItem';
import FloatingButton from '../../components/FloatingButton';
import TranslateText from '../../components/TranslateText';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(state => state.settings.currency.base);
  const transactions = useSelector(state => state.transactions.transactions);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate.host/latest?base=${baseCurrency}`,
        );
        const jsonResponse = await response.json();
        const rates = avalibleExchangeRates.map(currency => ({
          ...currency,
          rate: jsonResponse.rates[currency.code],
        }));
        dispatch(setExchangeRates(rates));
        const transactions = await getTransactions();
        dispatch(setTransactions(transactions));
      } catch (err) {
        Alert.alert('Error', err.message);
      }
    };
    fetchData();
  }, [dispatch, baseCurrency]);

  // if (transactions.length === 0) return <Text>NO Transaction</Text>;
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
      <FloatingButton
        onPress={() => navigation.navigate('AddTransaction')}
        icon={'plus-outline'}>
        <TranslateText category="h6">add_transaction</TranslateText>
      </FloatingButton>
      <FlatList
        data={transactions}
        renderItem={item => (
          <TransactionItem
            transaction={item.item}
            onPress={() =>
              navigation.navigate('EditTransaction', {
                transactionId: item.item.id,
              })
            }
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
