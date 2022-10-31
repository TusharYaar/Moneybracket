import React from "react";
import {StyleSheet} from "react-native";
import {FlashList} from "@shopify/flash-list";
import {Modal, Portal, IconButton, Paragraph} from "react-native-paper";

import {ICONS} from "../data";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onItemSelect: (icon: string) => void;
  color: string;
};

const IconModal = ({visible, onDismiss, color, onItemSelect}: Props) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}>
        <Paragraph>Choose Icon</Paragraph>
        <FlashList
          estimatedItemSize={71}
          numColumns={5}
          data={ICONS}
          renderItem={({item}) => (
            <IconButton
              icon={item}
              color={color}
              size={40}
              onPress={() => onItemSelect(item)}
            />
          )}
        />
      </Modal>
    </Portal>
  );
};

export default IconModal;

const styles = StyleSheet.create({
  modal: {flex: 1, backgroundColor: "white", margin: 20},
});
