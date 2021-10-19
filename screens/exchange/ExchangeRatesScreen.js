import React, {useEffect, useCallback, useState} from 'react';
import {FlatList, Text} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import RateListItem from '../../components/RateListItem.js';

import {updateFavorites} from '../../store/actions/settings';
import {Divider} from 'react-native-paper';

const ExchangeRatesScreen = () => {
  const baseCurrency = useSelector(state => state.settings.currency.base);
  const baseSymbol = useSelector(state => state.settings.currency.symbol);
  const favorites = useSelector(state => state.settings.currency.favorites);
  const allExchangeRates = useSelector(state => state.exchangeRates.rates);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [favoritesRate, setFavoritesRate] = useState([]);
  const fetchExchangeRates = useCallback(async () => {
    setIsLoading(false);
  }, [baseCurrency]);

  useEffect(() => {
    const rates = allExchangeRates.reduce((acc, element) => {
      if (favorites.includes(element.code)) {
        return [element, ...acc];
      }
      return [...acc, element];
    }, []);
    setFavoritesRate(rates);
  }, [favorites]);

  const updateFavoritesHandler = code => {
    if (favorites.indexOf(code) !== -1)
      dispatch(
        updateFavorites({favorites: favorites.filter(item => item !== code)}),
      );
    else dispatch(updateFavorites({favorites: favorites.concat(code)}));
  };
  if (favoritesRate.length === 0) {
    <Text>Fetching exchange rates...</Text>;
  }
  return (
    <FlatList
      data={favoritesRate}
      ItemSeparatorComponent={Divider}
      onRefresh={() => fetchExchangeRates()}
      refreshing={isLoading}
      renderItem={({item}) => (
        <RateListItem
          item={item}
          value={1}
          baseSymbol={baseSymbol}
          baseCurrency={baseCurrency}
          updateFavorites={updateFavoritesHandler}
          isFavorite={favorites.includes(item.code)}
        />
      )}
    />
  );
};

export default ExchangeRatesScreen;
