import React from "react";
import { Button, Headline } from "react-native-paper";
import { CustomTheme } from "../types";
import { ViewStyle, View, ImageBackground, StyleSheet } from "react-native";
import { useCustomTheme } from "../themes";

type Props = {
  theme: CustomTheme;
  selected: boolean;
  onSelect: () => void;
  imageSize: {
    height: number;
    width: number;
  };
  style?: ViewStyle;
};

const ThemeObject = ({ theme, selected, onSelect, style, imageSize }: Props) => {
  const {
    theme: { colors, roundness },
  } = useCustomTheme();
  return (
    <View style={[style, { borderRadius: roundness * 4 }]}>
      <ImageBackground
        source={{
          uri: theme.image,
        }}
        imageStyle={{
          borderRadius: roundness * 4,
        }}
        style={[imageSize, { flexDirection: "column-reverse", borderRadius: roundness * 4 }]}
      >
        <View
          style={{
            backgroundColor: colors.cardToneBackground,
            padding: 8,
            borderBottomLeftRadius: roundness * 4,
            borderBottomRightRadius: roundness * 4,
          }}
        >
          <Headline>{theme.name}</Headline>
          <Button disabled={selected} onPress={onSelect} mode={selected ? "contained" : "outlined"}>
            {selected ? "Selected" : "Select"}
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ThemeObject;

const styles = StyleSheet.create({});
