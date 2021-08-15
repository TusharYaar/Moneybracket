import React, {useEffect, useCallback, useState, useRef} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';

import {
  Divider,
  Icon,
  List,
  Input,
  Button,
  ButtonGroup,
} from '@ui-kitten/components';

import {useSelector} from 'react-redux';

import avalibleExchangeRates from '../data/exchangeRates.js';
import RateListItem from '../components/RateListItem.js';

import IconButton from '../components/IconButton';

const ExchangeRates = ({navigation}) => {
  const baseCurrency = useSelector(state => state.settings.currency.base);
  const baseSymbol = useSelector(state => state.settings.currency.symbol);
  const favorites = useSelector(state => state.settings.currency.favorites);
  const [allExchangeRates, setAllExchangeRates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('1');
  const [viewFav, setViewFav] = useState(false);

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
      setAllExchangeRates(rates);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
    setIsLoading(false);
  }, [baseCurrency]);

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  const handleInputChange = value => {
    setInputValue(value.replace(/([^0-9.])/g, ''));
  };

  const exchangeRatesList = allExchangeRates.filter(rate => {
    if (viewFav) {
      return favorites.includes(rate.code);
    } else return true;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.topSection}>
        <View style={styles.header}>
          <IconButton
            name="menu-outline"
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <Input
          value={inputValue}
          style={styles.input}
          onChangeText={handleInputChange}
          label="Conversion Value"
          keyboardType="decimal-pad"
        />
        <View style={styles.buttonContainer}>
          <Button
            style={[styles.button, viewFav ? null : styles.buttonActive]}
            onPress={() => setViewFav(false)}>
            All
          </Button>
          <View style={styles.buttonSeperator} />
          <Button
            style={[styles.button, viewFav ? styles.buttonActive : null]}
            onPress={() => setViewFav(true)}>
            Favorites
          </Button>
        </View>
      </View>
      <List
        data={exchangeRatesList}
        ItemSeparatorComponent={Divider}
        onRefresh={() => fetchExchangeRates()}
        refreshing={isLoading}
        renderItem={({item}) => (
          <RateListItem
            item={item}
            value={parseFloat(inputValue)}
            baseSymbol={baseSymbol}
            baseCurrency={baseCurrency}
          />
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

  topSection: {
    padding: 15,
  },
  input: {
    marginVertical: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  button: {
    flex: 1,
    backgroundColor: 'gray',
  },
  buttonActive: {
    backgroundColor: '#00bcd4',
  },
  buttonSeperator: {
    height: 5,
    width: 10,
  },
});
