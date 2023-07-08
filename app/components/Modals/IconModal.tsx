import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { IconButton, Text, TextInput } from "react-native-paper";

import { ICONS } from "../../data";
import { useCustomTheme } from "../../providers/ThemeProvider";

import { chooseBetterContrast } from "../../utils/colors";
import ModalContainer from "./ModalContainer";
import { useDebounce } from "use-debounce";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onItemSelect: (icon: string) => void;
  color: string;
};

const IconModal = ({ visible, onDismiss, color, onItemSelect }: Props) => {
  const { theme } = useCustomTheme();
  const [search, setSearch] = useState("");
  const [query] = useDebounce(search, 500);
  return (
    <ModalContainer visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal} title={"Choose Icon"}>
      <View style={{ margin: 8, marginBottom: 0 }}>
        <Text variant="labelLarge">Search Icon</Text>
        <TextInput value={search} onChangeText={(text) => setSearch(text)} />
      </View>
      <FlashList
        estimatedItemSize={71}
        extraData={query}
        numColumns={5}
        data={ICONS.filter((icon) => icon.includes(search.toLowerCase()))}
        renderItem={({ item }) => (
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
    </ModalContainer>
  );
};

export default IconModal;

const styles = StyleSheet.create({
  modal: { flex: 1 },
});
