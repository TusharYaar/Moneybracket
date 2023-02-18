import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import AVALIBLE_THEMES from "../../themes/themes";
import ThemeObject from "../../components/ThemeObject";
import { useSettings } from "../../providers/SettingsProvider";
import { useCustomTheme } from "../../themes";
import { FlashList } from "@shopify/flash-list";

const window = Dimensions.get("window");

const ThemeSetting = () => {
  const { theme } = useSettings();
  const { changeTheme } = useCustomTheme();

  return (
    <FlashList
      horizontal={true}
      data={AVALIBLE_THEMES}
      renderItem={({ item }) => (
        <ThemeObject
          key={item.id}
          theme={item}
          selected={theme === item.id}
          onSelect={() => changeTheme(item.id)}
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