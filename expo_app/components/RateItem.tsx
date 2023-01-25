import {StyleSheet, View, ViewToken} from "react-native";
import React from "react";
import {RateType} from "../providers/ExchangeRatesProvider";
import {IconButton, Text, TouchableRipple} from "react-native-paper";
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";

interface Props {
  item: RateType;
  onPress?: () => void;
  visibleItems?: Animated.SharedValue<ViewToken[]>;
  base: string;
  toggleFavorite?: () => void;
  isDefault?: boolean;
  value?: number;
}

const RateItem = ({
  item: {rate, symbol_native, name, code, symbol, isFavorite},
  onPress,
  visibleItems,
  base,
  isDefault,
  value,
  toggleFavorite,
}: Props) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      visibleItems
        ? visibleItems.value.find(({item}) => item.code === code)
        : true,
    );
    return {
      transform: [{scale: withTiming(isVisible ? 1 : 0.6)}],
    };
  });
  return (
    <Animated.View style={rStyle}>
      <TouchableRipple onPress={onPress}>
        <View style={styles.container}>
          <Text variant="headlineSmall" numberOfLines={1} style={styles.symbol}>
            {symbol}
          </Text>
          <View style={{flex: 1}}>
            <Text variant="titleMedium" numberOfLines={1}>
              {name}
            </Text>
            <View style={{flex: 1, flexDirection: "row", flexWrap: "wrap"}}>
              <Text numberOfLines={1} variant="bodyMedium">
                {`${base} ${value ? value : "1000"}`}
              </Text>
              <Text numberOfLines={1} variant="bodyMedium">
                {" = "}
              </Text>
              <Text numberOfLines={1} variant="bodyMedium">
                {`${symbol_native} ${
                  value && value > 0
                    ? ((value / 1000) * rate).toFixed(2)
                    : rate.toFixed(2)
                }`}
              </Text>
            </View>
          </View>
          <IconButton
            icon={isFavorite ? "star" : "star-outline"}
            onPress={toggleFavorite}
          />
        </View>
      </TouchableRipple>
    </Animated.View>
  );
};

export default RateItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  symbol: {
    width: 70,
  },
});
