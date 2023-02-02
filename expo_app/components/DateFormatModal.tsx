import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalContainer from "./ModalContainer";
import { FlashList } from "@shopify/flash-list";
import { DATE } from "../data";
import DateFormatItem from "./Charts/DateFormatItem";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onItemSelect: (code: string) => void;
};

const DateFormatModal = ({ visible, onDismiss, onItemSelect }: Props) => {
  return (
    <ModalContainer visible={visible} onDismiss={onDismiss} title={"title"} contentContainerStyle={styles.modal}>
      <FlashList
        data={DATE}
        renderItem={({ item, index }) => <DateFormatItem date={item} key={item} onPress={() => onItemSelect(item)} />}
        estimatedItemSize={44}
      />
    </ModalContainer>
  );
};

export default DateFormatModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    maxHeight: 300,
  },
});
