import {StyleSheet, View, ViewToken} from "react-native";
import React from "react";
import {Rate} from "../providers/ExchangeRatesProvider";
import {Text} from "react-native-paper";
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";

interface Props extends Rate {
  visibleItems: Animated.SharedValue<ViewToken[]>;
  base: string;
}

const RateItem = ({
  rate,
  symbol_native,
  name,
  name_plural,
  code,
  visibleItems,
  base,
}: Props) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      visibleItems.value.find(({item}) => item.code === code),
    );
    return {
      transform: [{scale: withTiming(isVisible ? 1 : 0.6)}],
    };
  });
  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Text variant="headlineMedium" numberOfLines={1} style={styles.symbol}>
        {symbol_native}
      </Text>
      <View>
        <Text variant="titleMedium">{name}</Text>
        <Text numberOfLines={1} variant="bodyMedium">
          1000 {base} = {rate.toFixed(2)} {name_plural}{" "}
        </Text>
      </View>
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
