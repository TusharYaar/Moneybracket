import { StyleSheet } from "react-native";
import React from "react";
import AVALIBLE_FONTS from "../../themes/fonts/index";
import { useSettings } from "../../providers/SettingsProvider";
import { FlatList } from "react-native-gesture-handler";
import FontView from "../../components/FontView";
import { useCustomTheme } from "../../themes";

const FontSettings = () => {
  const { font } = useSettings();
  const { changeFont } = useCustomTheme();

  return (
    <FlatList
      contentContainerStyle={styles.screen}
      data={AVALIBLE_FONTS}
      renderItem={({ item }) => (
        <FontView font={item} selected={item.id === font} onPress={() => changeFont(item.id)} style={styles.item} />
      )}
    />
  );
};

export default FontSettings;

const styles = StyleSheet.create({
  screen: {
    padding: 8,
  },
  item: {
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
  },
});
