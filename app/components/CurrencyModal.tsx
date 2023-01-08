import React from "react";
import {StyleSheet} from "react-native";
import {FlashList} from "@shopify/flash-list";
import {Modal, Portal, Text, TouchableRipple} from "react-native-paper";
import {Rate, useExchangeRate} from "../providers/ExchangeRatesProvider";
import RateItem from "./RateItem";
import {useSettings} from "../providers/SettingsProvider";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onItemSelect: (code: string) => void;
};

const CurrencyModal = ({visible, onDismiss, onItemSelect}: Props) => {
  const {rates} = useExchangeRate();
  const {currency} = useSettings();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
        style={styles.modal}
      >
        <Text>Choose Currency</Text>
        <FlashList
          data={rates}
          estimatedItemSize={19}
          renderItem={({item}) => (
            <RateItem
              item={item}
              onPress={() => onItemSelect(item.code)}
              base={currency.symbol_native}
            />
          )}
        />
      </Modal>
    </Portal>
  );
};

export default CurrencyModal;

const styles = StyleSheet.create({
  modal: {
    borderRadius: 7,
  },
  modalContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 7,
    backgroundColor: "white",
  },
});

type CurrencyProps = {
  item: Rate;
  onPress: () => void;
};

// const Currency = ({
//   item: {code, symbol, name, rate},
//   onPress,
// }: CurrencyProps) => {
//   return (
//     <TouchableRipple>
//       <View style={itemStyles.container}>
//         <View style={itemStyles.symbol}>
//           <Text>{symbol}</Text>
//         </View>
//         <View style={itemStyles.textContainer}>
//           <Text>{name}</Text>
//           <Text>1000 Your curr = {rate.toFixed(2)}</Text>
//         </View>
//       </View>
//     </TouchableRipple>
//   );
// };

const itemStyles = StyleSheet.create({
  container: {
    // modal: { flex: 1, backgroundColor: "white", margin: 20 },
    padding: 10,
    flexDirection: "row",
  },
  textContainer: {
    flexDirection: "column",
    flex: 1,
  },
  symbol: {
    width: 70,
    justifyContent: "center",
  },
});
