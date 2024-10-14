import { StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import { ALL_THEMES, DEFAULT_THEMES } from "../../data";
import ThemeObject from "../../components/ThemeObject";
import { FlashList } from "@shopify/flash-list";
import { SegmentedButtons, Text } from "react-native-paper";
import { useCustomTheme } from "../../providers/ThemeProvider";

const window = Dimensions.get("window");

const ThemeSetting = () => {
  const { changeTheme, theme, changeRoundness } = useCustomTheme();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 8 }}>
        <Text>Roundness</Text>
        <SegmentedButtons
          value={theme.roundness.toString()}
          onValueChange={(v: string) => changeRoundness(parseInt(v))}
          density="small"
          buttons={[
            {
              value: "0",
              disabled: theme.roundness === -1,
              label: "0",
            },
            {
              value: "2",
              label: "1",
              disabled: theme.roundness === -1,
            },

            {
              value: "4",
              label: "2",
              disabled: theme.roundness === -1,
            },
            {
              value: "6",
              label: "3",
              disabled: theme.roundness === -1,
            },
          ]}
        />
      </View>
      <FlashList
        horizontal={true}
        data={ALL_THEMES.filter((theme) => DEFAULT_THEMES.includes(theme.id))}
        renderItem={({ item }) => (
          <ThemeObject
            key={item.id}
            theme={item}
            selected={item.id === theme.id}
            onSelect={() => changeTheme(item.id)}
            // isUnlocked={unlockedThemes.includes(item.id)}
            isUnlocked={true}
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
