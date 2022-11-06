import { StyleSheet, Text, View, ViewToken } from 'react-native'
import React from 'react'
import { Rate } from '../providers/ExchangeRatesProvider'
import { Headline, Subheading, Caption } from 'react-native-paper'
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

interface Props extends Rate {
    visibleItems: Animated.SharedValue<ViewToken[]>;
}

const RateItem = ({ rate, symbol_native, name, name_plural, code, visibleItems }: Props) => {
    const rStyle = useAnimatedStyle(() => {
        const isVisible = Boolean(visibleItems.value.find(({ item }) => item.code === code));
        return {
            transform: [
                { scale: withTiming(isVisible ? 1 : 0.6) }
            ]
        }
    });
    return (
        <Animated.View style={[styles.container, rStyle]}>
            <Headline style={styles.symbol}>{symbol_native}</Headline>
            <View>
                <Subheading>{name}</Subheading>
                <Caption numberOfLines={1}> 1000 YOUR CURR = {rate.toFixed(2)} {name_plural} </Caption>
            </View>
        </Animated.View>
    )
}

export default RateItem

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
    },
    symbol: {
        width: 70,
    }
})