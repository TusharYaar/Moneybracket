import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';

import {Button, Divider, Icon, List, Input} from '@ui-kitten/components';

import {useSelector} from 'react-redux';

import avalibleExchangeRates from '../data/exchangeRates.js';
import RateListItem from '../components/RateListItem.js';

import IconButton from '../components/IconButton';

const ExchangeRates = ({navigation}) => {
  const baseCurrency = useSelector(state => state.settings.currency.base);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('1');

  const fetchExchangeRates = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.exchangerate.host/latest?base=${baseCurrency}`,
      );
      const jsonResponse = await response.json();
      const rates = avalibleExchangeRates.map(currency => ({
        ...currency,
        rate: jsonResponse.rates[currency.code],
      }));
      setExchangeRates(rates);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
    setIsLoading(false);
  }, [baseCurrency]);

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  const handleInputChange = value => {
    value ? setInputValue(value) : setInputValue('');
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <IconButton
          name="menu-outline"
          onPress={() => navigation.openDrawer()}
        />
      </View>
      <View>
        <Input
          value={inputValue}
          onChangeText={handleInputChange}
          label="Conversion Value"
          keyboardType="decimal-pad"
        />
      </View>
      <List
        data={exchangeRates}
        ItemSeparatorComponent={Divider}
        renderItem={({item}) => (
          <RateListItem item={item} value={parseFloat(inputValue)} />
        )}
      />
    </View>
  );
};

export default ExchangeRates;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    padding: 15,
  },
});
