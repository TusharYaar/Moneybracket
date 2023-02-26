import { StyleSheet, ViewStyle, View } from "react-native";
import React from "react";

import { Button, Text, Surface } from "react-native-paper";
import { useCustomTheme } from "../themes";
import { FontObject } from "../types";
import { useTranslation } from "react-i18next";

type Props = {
  font: FontObject;
  selected: boolean;
  style?: ViewStyle;
  onPress: () => void;
  isUnlocked: boolean;
  showDownload: boolean;
  onPressDownload: () => void;
};

const FontView = ({ font, selected, onPress, style, isUnlocked, showDownload, onPressDownload }: Props) => {
  const { t } = useTranslation("", { keyPrefix: "components.fontView" });
  const { theme } = useCustomTheme();
  return (
    <Surface style={[style]}>
      <View style={{ flex: 1 }}>
        <Text variant="titleMedium">{font.name}</Text>
        {font.by && <Text variant="labelSmall">{font.by}</Text>}
      </View>
      {isUnlocked && !showDownload && (
        <Button
          mode={selected ? "contained" : "outlined"}
          disabled={selected}
          onPress={onPress}
          style={[styles.button, { borderColor: theme.colors.primary }]}
        >
          {t(selected ? "selected" : "select")}
        </Button>
      )}
      {!isUnlocked && (
        <Button onPress={() => {}} mode="contained" style={[styles.button, { borderColor: theme.colors.primary }]}>
          {t("unlock")}
        </Button>
      )}
      {showDownload && isUnlocked && (
        <Button
          mode="outlined"
          onPress={onPressDownload}
          style={[styles.button, { borderColor: theme.colors.primary }]}
        >
          {t("download")}
        </Button>
      )}
    </Surface>
  );
};

export default FontView;

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    borderWidth: 2,
  },
});
