import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import TranslateText from './TranslateText';
import IconButton from './IconButton';

const RateListItem = ({
  item,
  value,
  baseSymbol,
  updateFavorites,
  isFavorite,
}) => {
  value = value ? value : 0;
  return (
    <View style={styles.listItem}>
      <View style={styles.description}>
        <Image style={styles.image} source={{uri: item.flag}} />
        <View style={styles.textDescription}>
          <TranslateText
            translate={item.key}
            tag="countries"
            style={styles.country}
          />
          <TranslateText category="c1" tag="numbers">
            {`1 ${baseSymbol} = ${item.rate.toFixed(3)} ${item.symbol}`}
          </TranslateText>

          <Text category="c1">{item.code}</Text>
        </View>
      </View>
      <View style={styles.textValue}>
        <TranslateText tag="numbers" category="h5">
          {(item.rate * value).toFixed(2)} {item.symbol}
        </TranslateText>
        <IconButton
          name={isFavorite ? 'star' : 'star-outline'}
          onPress={() => {
            updateFavorites(item.code);
          }}
        />
      </View>
    </View>
  );
};

export default RateListItem;

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    height: 64,
    width: 64,
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textDescription: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  country: {
    fontSize: 14,
  },
  textValue: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
