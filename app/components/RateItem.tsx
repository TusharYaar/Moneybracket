import {StyleSheet, View, ViewToken} from "react-native";
import React from "react";
import {Rate} from "../providers/ExchangeRatesProvider";
import {Text, TouchableRipple} from "react-native-paper";
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";

interface Props {
  item: Rate;
  onPress?: () => void;
  visibleItems?: Animated.SharedValue<ViewToken[]>;
  base: string;
}

const RateItem = ({
  item: {rate, symbol_native, name, code, symbol},
  onPress,
  visibleItems,
  base,
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
            {symbol_native}
          </Text>
          <View>
            <Text variant="titleMedium" numberOfLines={1}>
              {name}
            </Text>
            <Text numberOfLines={1} variant="bodyMedium">
              {base}1000 = {symbol_native}
              {rate.toFixed(2)}
            </Text>
          </View>
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
