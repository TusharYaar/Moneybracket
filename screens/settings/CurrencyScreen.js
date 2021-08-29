import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';

import {useSelector, useDispatch} from 'react-redux';

import avalibleExchangeRates from '../../data/exchangeRates';

import {updateCurrency} from '../../store/actions/settings';

const CurrencyScreen = () => {
  const dispatch = useDispatch();
  const currency = useSelector(state => state.settings.currency);

  const [selectedIndex, setSelectedIndex] = React.useState(
    new IndexPath(
      avalibleExchangeRates.findIndex(item => item.code === currency.base),
    ),
  );
  const changeCurrency = index => {
    const item = avalibleExchangeRates[index.row];
    dispatch(
      updateCurrency({...currency, base: item.code, symbol: item.symbol}),
    );
    setSelectedIndex(index);
  };
  return (
    <View>
      <Text>Currency Settings</Text>
      <Select
        placeholder="Default"
        value={
          avalibleExchangeRates.find(item => item.code === currency.base).symbol
        }
        selectedIndex={selectedIndex}
        onSelect={changeCurrency}>
        {avalibleExchangeRates.map((item, index) => (
          <SelectItem key={item.code} title={`${item.symbol} (${item.code})`} />
        ))}
      </Select>
    </View>
  );
};

export default CurrencyScreen;

const styles = StyleSheet.create({});
