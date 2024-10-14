import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { ALL_FONTS, DEFAULT_FONTS } from "../../data";
import { FlatList } from "react-native-gesture-handler";
import FontView from "../../components/FontView";
import { useCustomTheme } from "../../providers/ThemeProvider";

const FontSettings = () => {
  const { font, changeFont } = useCustomTheme();

  // const { unlockedFonts, offlineFonts } = useSettings();

  // useEffect(() => {
  //   getOfflineFonts();
  // }, []);

  return (
    <FlatList
      contentContainerStyle={styles.screen}
      data={DEFAULT_FONTS}
      numColumns={2}
      renderItem={({ item }) => (
        <FontView
          font={item}
          selected={item.id === font}
          onPress={() => changeFont(item.id)}
          style={styles.item}
          // isUnlocked={unlockedFonts.includes(item.id)}
          // requireDownload={!offlineFonts.includes(item.id)}
          isUnlocked={true}
          requireDownload={false}
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
