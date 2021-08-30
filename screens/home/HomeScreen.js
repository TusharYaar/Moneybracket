import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Button} from '@ui-kitten/components';

import {useSelector, useDispatch} from 'react-redux';
import {setExchangeRates} from '../../store/actions/exchangeRates';
import {setCategories} from '../../store/actions/categories';

import avalibleExchangeRates from '../../data/exchangeRates.js';

import {insertTransactions, getTransactions} from '../../helpers/dbFunctions';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(state => state.settings.currency.base);
  useEffect(() => {
    getTransactions();
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
      } catch (err) {
        Alert.alert('Error', err.message);
      }
    };
    fetchData();
  }, [dispatch, baseCurrency]);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('AddTransaction')}>
        Button
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
