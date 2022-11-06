import { Text, View, ViewToken } from "react-native";
import React from "react";
import { useExchangeRate } from "../../providers/ExchangeRatesProvider";
import RateItem from "../../components/RateItem";
import { useSharedValue } from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";

const Rates = () => {

  const { rates } = useExchangeRate();
  const visibleItems = useSharedValue<ViewToken[]>([]);

  if (rates.length === 0) {
    return (
      <View>
        <Text>Rates</Text>
      </View>
    );
  }
  else return <FlashList
    data={rates}
    estimatedItemSize={114}
    renderItem={({ item }) => <RateItem {...item} visibleItems={visibleItems} />}
    onViewableItemsChanged={({ viewableItems }) => visibleItems.value = viewableItems} />
};


export default Rates;
