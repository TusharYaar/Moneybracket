import { StyleSheet } from "react-native";
import React from "react";
import { ALL_FONTS } from "../../data";
import { useSettings } from "../../providers/SettingsProvider";
import { FlatList } from "react-native-gesture-handler";
import FontView from "../../components/FontView";
import { useCustomTheme } from "../../themes";

const FontSettings = () => {
  const { font, updateFont, unlockedFonts } = useSettings();
  const {} = useCustomTheme();
  return (
    <FlatList
      contentContainerStyle={styles.screen}
      data={ALL_FONTS}
      numColumns={2}
      renderItem={({ item }) => (
        <FontView
          font={item}
          selected={item.id === font}
          onPress={() => updateFont(item.id)}
          style={styles.item}
          isUnlocked={unlockedFonts.includes(item.id)}
          // requireDownload={!offlineFonts.includes(item.id)}
        />
      )}
    />
  );
};

export default FontSettings;

const styles = StyleSheet.create({
  screen: {
    padding: 4,
  },
  item: {
    flex: 1,
    margin: 4,
    padding: 4,
  },
});
