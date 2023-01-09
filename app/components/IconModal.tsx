import React, {useDeferredValue, useState} from "react";
import {StyleSheet, View} from "react-native";
import {FlashList} from "@shopify/flash-list";
import {Modal, Portal, IconButton, Text, TextInput} from "react-native-paper";

import {ICONS} from "../data";
import {useCustomTheme} from "../themes";

import {chooseBetterContrast} from "../utils/colors";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onItemSelect: (icon: string) => void;
  color: string;
};

const IconModal = ({visible, onDismiss, color, onItemSelect}: Props) => {
  const {theme} = useCustomTheme();
  const [search, setSearch] = useState("");
  const query = useDeferredValue(search);
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <IconButton
            icon="close"
            onPress={onDismiss}
            style={{margin: 0, position: "absolute", top: 0, left: 0}}
          />
          <Text style={{paddingVertical: 8}} variant="titleMedium">
            Choose Icon
          </Text>
        </View>
        <View style={{margin: 8, marginBottom: 0}}>
          <Text variant="labelLarge">Search Icon</Text>
          <TextInput value={search} onChangeText={text => setSearch(text)} />
        </View>
        <FlashList
          estimatedItemSize={71}
          extraData={query}
          numColumns={5}
          data={ICONS.filter(icon => icon.includes(search))}
          renderItem={({item}) => (
            <IconButton
              accessibilityLabel={`${item} icon`}
              icon={item}
              style={{
                backgroundColor: color,
                borderRadius: theme.roundness * 4,
              }}
              iconColor={chooseBetterContrast(color)}
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
  modal: {flex: 1, backgroundColor: "white", margin: 24},
});
