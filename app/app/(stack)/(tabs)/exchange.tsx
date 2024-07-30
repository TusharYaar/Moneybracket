import { View } from "react-native";
import React, { useEffect } from "react";
import { useExchangeRate } from "../../../providers/ExchangeRatesProvider";
import RateItem from "../../../components/RateItem";
import { FlashList } from "@shopify/flash-list";
import { useSettings } from "../../../providers/SettingsProvider";
import { IconButton, TextInput, Text } from "react-native-paper";
import { useCustomTheme } from "../../../providers/ThemeProvider";
import CurrencyModal from "../../../components/Modals/CurrencyModal";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../../navigators/StackNavigators";
import { useDebounce } from "use-debounce";
import { format } from "date-fns";

type Props = NativeStackScreenProps<StackParamList, "ExchangeRateScreen">;

const Rates = ({ navigation }: Props) => {
  const { rates, toggleFavorite, lastUpdated } = useExchangeRate();
  const { currency, dateFormat } = useSettings();
  const {
    theme: { fonts, roundness },
  } = useCustomTheme();
  const [showSearchInput, setShowSearchInput] = React.useState(false);

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: (props) => (
  //       <IconButton
  //         icon="search"
  //         style={{ borderRadius: roundness * 4 }}
  //         onPress={() => setShowSearchInput((prev) => !prev)}
  //       />
  //     ),
  //   });
  // }, [navigation]);

  const [values, setValues] = React.useState({
    amount: "1000",
    currency: currency.code,
  });
  const [searchValue, setSearchvalue] = React.useState("");
  const [search] = useDebounce(searchValue, 1000);

  const [amount] = useDebounce(values.amount, 1000);

  const [viewCurrencyModal, setViewCurrencyModal] = React.useState(false);

  const changeCurrency = React.useCallback((code: string) => {
    setValues((prev) => ({ ...prev, currency: code.toUpperCase() }));
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
      <View style={{ flex: 1 }}>
        <CurrencyModal
          visible={viewCurrencyModal}
          onDismiss={() => setViewCurrencyModal(false)}
          onItemSelect={changeCurrency}
        />
        <View style={{ paddingHorizontal: 8 }}>
          <TextInput
            right={
              <TextInput.Icon
                onPress={() => setViewCurrencyModal(true)}
                icon="repeat"
                style={{ borderRadius: roundness * 4 }}
              />
            }
            left={<TextInput.Affix text={values.currency} />}
            value={values.amount}
            onChangeText={(text) => setValues((prev) => ({ ...prev, amount: text }))}
            mode="outlined"
            keyboardType="decimal-pad"
            style={fonts.titleLarge}
          />
          {showSearchInput && (
            <TextInput
              left={<TextInput.Icon icon="search" style={{ borderRadius: roundness * 4 }} />}
              value={searchValue}
              onChangeText={(text) => setSearchvalue(text)}
              mode="outlined"
              style={fonts.titleLarge}
            />
          )}
          <Text>Last Updated {format(new Date(lastUpdated), dateFormat)} </Text>
        </View>
        <FlashList
          data={rates
            .filter((a) => search.length === 0 || a.name.toLowerCase().includes(search.toLowerCase()))
            .sort((a) => (a.isFavorite ? -1 : 0))}
          estimatedItemSize={114}
          renderItem={({ item }) => (
            <RateItem
              item={item}
              value={parseFloat(amount.length > 0 ? amount : "1000")}
              base={currency.symbol_native}
              toggleFavorite={() => toggleFavorite(item.code)}
            />
          )}
          extraData={amount + search}
        />
      </View>
    );
};

export default Rates;
