import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@ui-kitten/components';

import {useSelector, useDispatch} from 'react-redux';
import {setExchangeRates} from '../../store/actions/exchangeRates';

import avalibleExchangeRates from '../../data/exchangeRates.js';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(state => state.settings.currency.base);
  useEffect(() => {
    const fetchRates = async () => {
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

    fetchRates();
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
