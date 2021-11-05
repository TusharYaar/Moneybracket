import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List, withTheme, Caption} from 'react-native-paper';

import {useSelector} from 'react-redux';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

const CurrencyBottomSheet = ({fref, snapPoints, onPress, theme}) => {
  const {colors} = theme;
  const currency = useSelector(state => state.settings.currency);
  const avalibleExchangeRates = useSelector(state => state.exchangeRates.rates);
  return (
    <BottomSheet
      ref={fref}
      index={-1}
      snapPoints={snapPoints}
      backgroundStyle={[
        styles.bottomsheet,
        {
          backgroundColor: colors.background,
          borderColor: colors.primary,
        },
      ]}
      handleIndicatorStyle={{backgroundColor: colors.accent}}
      enablePanDownToClose={true}>
      <Caption>Base {currency.base}</Caption>
      <BottomSheetFlatList
        data={avalibleExchangeRates}
        keyExtractor={item => item.code}
        contentContainerStyle={styles.contentContainer}
        enablePanDownToClose={true}
        renderItem={item => (
          <BottomSheetItem
            item={item.item}
            onPress={onPress}
            currency={currency}
          />
        )}
      />
    </BottomSheet>
  );
};

const BottomSheetItem = ({item, currency, onPress}) => {
  const handlePress = () => {
    onPress(item.code);
  };
  return (
    <List.Item
      title={`(${item.code}) ${item.country}`}
      description={`1${currency.symbol} = ${item.rate}${item.symbol} `}
      onPress={handlePress}
      left={props => (
        <List.Icon {...props} icon={{uri: item.flag}} color={item.color} />
      )}
    />
  );
};

export default withTheme(CurrencyBottomSheet);

const styles = StyleSheet.create({
  bottomsheet: {
    borderWidth: 2,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
});
