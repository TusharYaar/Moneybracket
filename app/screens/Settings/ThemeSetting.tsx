import { StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import { ALL_THEMES } from "../../data";
import ThemeObject from "../../components/ThemeObject";
import { useSettings } from "../../providers/SettingsProvider";
import { FlashList } from "@shopify/flash-list";
import { SegmentedButtons, Text } from "react-native-paper";

const window = Dimensions.get("window");

const ThemeSetting = () => {
  const { theme, updateTheme, unlockedThemes, roundness, updateRoundness } = useSettings();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 8 }}>
        <Text>Roundness</Text>
        <SegmentedButtons
          value={roundness.toString()}
          onValueChange={(v: string) => updateRoundness(parseInt(v))}
          density="small"
          buttons={[
            {
              value: "0",
              disabled: roundness === -1,
              label: "0",
            },
            {
              value: "2",
              label: "1",
              disabled: roundness === -1,
            },

            {
              value: "4",
              label: "2",
              disabled: roundness === -1,
            },
            {
              value: "6",
              label: "3",
              disabled: roundness === -1,
            },
          ]}
        />
      </View>
      <FlashList
        horizontal={true}
        data={ALL_THEMES}
        renderItem={({ item }) => (
          <ThemeObject
            key={item.id}
            theme={item}
            selected={theme === item.id}
            onSelect={() => updateTheme(item.id)}
            isUnlocked={unlockedThemes.includes(item.id)}
            imageSize={{
              height: window.height - 190,
              width: window.width - window.width / 8 - 16,
            }}
            style={{ ...styles.item, height: window.height - 150, width: window.width - window.width / 8 }}
          />
        )}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={window.width - window.width / 8}
        extraData={theme}
      />
    </View>
  );
};

export default ThemeSetting;

const styles = StyleSheet.create({
  item: {
    margin: 8,
  },
});
