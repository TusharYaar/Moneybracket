import {StyleSheet, ViewStyle} from "react-native";
import React from "react";

import {Button, Text, Surface} from "react-native-paper";
import {useCustomTheme} from "../themes";
import {FontObject} from "../types";
import {useTranslation} from "react-i18next";

type Props = {
  font: FontObject;
  selected: boolean;
  style?: ViewStyle;
  onPress: () => void;
};

const FontView = ({font, selected, onPress, style}: Props) => {
  const {t} = useTranslation();
  const {theme} = useCustomTheme();
  return (
    <Surface style={[style]}>
      <Text style={font.font.titleLarge}>{font.name}</Text>
      <Text numberOfLines={1} style={font.font.labelLarge}>
        {t("dummyText")}
      </Text>
      <Text numberOfLines={1} style={font.font.bodyMedium}>
        {t("dummyText")}
      </Text>
      <Button
        mode={selected ? "contained" : "outlined"}
        disabled={selected}
        onPress={onPress}
        labelStyle={font.font.labelMedium}
        style={[styles.button, {borderColor: theme.colors.primary}]}
      >
        {selected ? t("selected") : t("select")}
      </Button>
    </Surface>
  );
};

export default FontView;

const styles = StyleSheet.create({
  button: {
    width: "50%",
    marginTop: 8,
    borderWidth: 2,
  },
});
