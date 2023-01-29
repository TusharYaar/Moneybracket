import { FlatList, StyleSheet } from "react-native";
import React from "react";
import AVALIBLE_THEMES from "../../themes/themes";
import ThemeObject from "../../components/ThemeObject";
import { useSettings } from "../../providers/SettingsProvider";
import { useCustomTheme } from "../../themes";

const ThemeSetting = () => {
  const { theme } = useSettings();
  const { changeTheme } = useCustomTheme();

  return (
    <FlatList
      data={AVALIBLE_THEMES}
      renderItem={({ item }) => (
        <ThemeObject
          key={item.id}
          theme={item}
          selected={theme === item.id}
          onSelect={() => changeTheme(item.id)}
          style={styles.item}
        />
      )}
      contentContainerStyle={styles.screen}
    />
  );
};

export default ThemeSetting;

const styles = StyleSheet.create({
  screen: {
    padding: 16,
    paddingTop: 8,
  },
  item: {
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
});
