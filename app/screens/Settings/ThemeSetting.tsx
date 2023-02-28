import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import { ALL_THEMES } from "../../data";
import ThemeObject from "../../components/ThemeObject";
import { useSettings } from "../../providers/SettingsProvider";
import { FlashList } from "@shopify/flash-list";

const window = Dimensions.get("window");

const ThemeSetting = () => {
  const { theme, updateTheme, unlockedThemes } = useSettings();

  return (
    <FlashList
      horizontal={true}
      data={ALL_THEMES}
      renderItem={({ item }) => (
        <ThemeObject
          key={item.id}
          theme={item}
          selected={theme === item.id}
          onSelect={() => updateTheme(item.id)}
          isUnlocked={true || unlockedThemes.includes(item.id)}
          imageSize={{
            height: window.height - 84,
            width: window.width - window.width / 8 - 16,
          }}
          style={{ ...styles.item, height: window.height - 70, width: window.width - window.width / 8 }}
        />
      )}
      showsHorizontalScrollIndicator={false}
      estimatedItemSize={window.width - window.width / 8}
      extraData={theme}
    />
  );
};

export default ThemeSetting;

const styles = StyleSheet.create({
  item: {
    margin: 8,
  },
});
