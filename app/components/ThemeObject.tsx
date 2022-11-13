import React from "react";
import {Button, Headline, Surface, Theme} from "react-native-paper";
import {CustomTheme} from "../types";
import {ViewStyle, View} from "react-native";
import ColorChoice from "./ColorChoice";

type Props = {
  theme: CustomTheme;
  selected: boolean;
  onSelect: () => void;
  style?: ViewStyle;
};

const COLORS_VALS = ["primary", "accent", "text"];

const ThemeObject = ({theme, selected, onSelect, style}: Props) => {
  return (
    <Surface style={style}>
      <Headline>{theme.name}</Headline>
      <View>
        {COLORS_VALS.map(color => (
          <ColorChoice
            color={theme.colors[color as keyof CustomTheme["colors"]]}
            selected={false}
            onPress={() => {}}
          />
        ))}
      </View>
      <Button disabled={selected} onPress={onSelect}>
        Select
      </Button>
    </Surface>
  );
};

export default ThemeObject;
