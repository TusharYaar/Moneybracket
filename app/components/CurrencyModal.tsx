import React from "react";
import {FlashList} from "@shopify/flash-list";
import {useExchangeRate} from "../providers/ExchangeRatesProvider";
import RateItem from "./RateItem";
import {useSettings} from "../providers/SettingsProvider";
import ModalContainer from "./ModalContainer";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onItemSelect: (code: string) => void;
};

const CurrencyModal = ({visible, onDismiss, onItemSelect}: Props) => {
  const {rates} = useExchangeRate();
  const {currency} = useSettings();
  return (
    <ModalContainer
      visible={visible}
      onDismiss={onDismiss}
      title={"Choose Currency"}
      contentContainerStyle={{flex: 1}}
    >
      <FlashList
        data={rates.sort((a, b) => (a.isFavorite ? -1 : 1))}
        estimatedItemSize={19}
        renderItem={({item}) => (
          <RateItem
            isDefault={currency.code === item.code}
            item={item}
            onPress={() => onItemSelect(item.code)}
            base={currency.symbol_native}
          />
        )}
      />
    </ModalContainer>
  );
};

export default CurrencyModal;
