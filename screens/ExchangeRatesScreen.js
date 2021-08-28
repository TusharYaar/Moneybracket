import React, {useEffect, useCallback, useState} from 'react';
import {StyleSheet, View, Alert, ImageBackground} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {
  Divider,
  Icon,
  Text,
  List,
  Input,
  Button,
  ButtonGroup,
} from '@ui-kitten/components';

import {useSelector, useDispatch} from 'react-redux';

import avalibleExchangeRates from '../data/exchangeRates.js';
import RateListItem from '../components/RateListItem.js';

import IconButton from '../components/IconButton';

import {updateFavorites} from '../store/actions/settings';

const ExchangeRatesScreen = ({navigation}) => {
  const baseCurrency = useSelector(state => state.settings.currency.base);
  const baseSymbol = useSelector(state => state.settings.currency.symbol);
  const favorites = useSelector(state => state.settings.currency.favorites);
  const allExchangeRates = useSelector(state => state.exchangeRates.rates);
  console.log(allExchangeRates);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('1');
  const [viewFav, setViewFav] = useState(false);
  const sectionHeight = useSharedValue(200);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: sectionHeight.value,
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        sectionHeight.value,
        [60, 200],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  });
  const fetchExchangeRates = useCallback(async () => {}, [baseCurrency]);

  const handleInputChange = value => {
    setInputValue(value.replace(/([^0-9.])/g, ''));
  };

  const exchangeRatesList = allExchangeRates.filter(rate => {
    if (viewFav) {
      return favorites.includes(rate.code);
    } else return true;
  });
  const updateFavoritesHandler = code => {
    if (favorites.indexOf(code) !== -1)
      dispatch(
        updateFavorites({favorites: favorites.filter(item => item !== code)}),
      );
    else dispatch(updateFavorites({favorites: favorites.concat(code)}));
  };

  const handleScroll = event => {
    const {contentOffset} = event.nativeEvent;
    if (contentOffset.y > 200 && sectionHeight.value === 200) {
      sectionHeight.value = withTiming(60, 2000);
    } else if (contentOffset.y < 20 && sectionHeight.value === 60) {
      sectionHeight.value = withTiming(200, 2000);
    }
  };
  return (
    <View style={styles.screen}>
      <Animated.View style={[animatedStyles]}>
        <ImageBackground
          source={require('../assets/images/India-sunset.png')}
          resizeMode="cover"
          style={styles.background}>
          <View style={styles.topSection}>
            <View style={styles.header}>
              <IconButton
                name="menu-outline"
                onPress={() => navigation.openDrawer()}
              />
              <Animated.View style={animatedTextStyle}>
                <Text category="h6">
                  {inputValue} {baseSymbol}
                </Text>
              </Animated.View>
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
        </ImageBackground>
      </Animated.View>
      <List
        data={exchangeRatesList}
        ItemSeparatorComponent={Divider}
        onScroll={handleScroll}
        // onRefresh={() => fetchExchangeRates()}
        // refreshing={isLoading}
        renderItem={({item}) => (
          <RateListItem
            item={item}
            value={parseFloat(inputValue)}
            baseSymbol={baseSymbol}
            baseCurrency={baseCurrency}
            updateFavorites={updateFavoritesHandler}
            isFavorite={favorites.includes(item.code)}
          />
        )}
      />
    </View>
  );
};

export default ExchangeRatesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
  },

  topSection: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 15,
  },
  background: {
    width: '100%',
    height: '100%',
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
