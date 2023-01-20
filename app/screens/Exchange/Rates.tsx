import {Text, View, ViewToken} from "react-native";
import React, {useDeferredValue} from "react";
import {useExchangeRate} from "../../providers/ExchangeRatesProvider";
import RateItem from "../../components/RateItem";
import {useSharedValue} from "react-native-reanimated";
import {FlashList} from "@shopify/flash-list";
import {useSettings} from "../../providers/SettingsProvider";
import {TextInput} from "react-native-paper";
import {useCustomTheme} from "../../themes";
import CurrencyModal from "../../components/CurrencyModal";

const Rates = () => {
  const {rates} = useExchangeRate();
  const visibleItems = useSharedValue<ViewToken[]>([]);
  const {currency} = useSettings();
  const {
    theme: {fonts, roundness},
  } = useCustomTheme();

  const [values, setValues] = React.useState({
    amount: "1000",
    currency: currency.code,
  });

  const amount = useDeferredValue(values.amount);

  const [viewCurrencyModal, setViewCurrencyModal] = React.useState(false);

  const changeCurrency = React.useCallback((code: string) => {
    setValues(prev => ({...prev, currency: code.toUpperCase()}));
    setViewCurrencyModal(false);
  }, []);

  if (rates.length === 0) {
    return (
      <View>
        <Text>Rates</Text>
      </View>
    );
  } else
    return (
      <View style={{flex: 1}}>
        <CurrencyModal
          visible={viewCurrencyModal}
          onDismiss={() => setViewCurrencyModal(false)}
          onItemSelect={changeCurrency}
        />
        <View style={{paddingHorizontal: 8}}>
          <TextInput
            right={
              <TextInput.Icon
                onPress={() => setViewCurrencyModal(true)}
                icon="repeat"
                style={{borderRadius: roundness * 4}}
              />
            }
            left={<TextInput.Affix text={values.currency} />}
            value={values.amount}
            onChangeText={text => setValues(prev => ({...prev, amount: text}))}
            mode="outlined"
            keyboardType="decimal-pad"
            style={fonts.titleLarge}
          />
        </View>
        <FlashList
          data={rates.sort(a => (a.isFavorite ? -1 : 1))}
          estimatedItemSize={114}
          renderItem={({item}) => (
            <RateItem
              item={item}
              visibleItems={visibleItems}
              value={parseFloat(amount)}
              base={currency.symbol_native}
            />
          )}
          extraData={amount}
          onViewableItemsChanged={({viewableItems}) =>
            (visibleItems.value = viewableItems)
          }
        />
      </View>
    );
};

export default Rates;
