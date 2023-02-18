import React, { useCallback, useState } from "react";
import { Button, Text } from "react-native-paper";
import { CustomTheme } from "../types";
import { ViewStyle, View, Image, StyleSheet, ImageLoadEventData, NativeSyntheticEvent } from "react-native";
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
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback((event: NativeSyntheticEvent<ImageLoadEventData>) => {
    setLoaded(true);
  }, []);
  return (
    <View style={[style, { borderRadius: roundness * 4, position: "relative" }]}>
      <Image
        source={{
          uri: theme.image,
        }}
        style={[imageSize, { borderRadius: roundness * 4 }]}
        onLoad={handleLoad}
      />
      {!loaded && (
        <View style={styles.loading}>
          <Text>Loading....</Text>
        </View>
      )}
      <View
        style={[
          styles.details,
          {
            backgroundColor: colors.cardToneBackground,
            borderBottomLeftRadius: roundness * 4,
            borderBottomRightRadius: roundness * 4,
          },
        ]}
      >
        <Text variant="headlineMedium">{theme.name}</Text>
        <Button disabled={selected} onPress={onSelect} mode={selected ? "contained" : "outlined"}>
          {selected ? "Selected" : "Select"}
        </Button>
      </View>
    </View>
  );
};

export default ThemeObject;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    padding: 8,
    bottom: 0,
    left: 0,
    width: "100%",
    position: "absolute",
  },
});
