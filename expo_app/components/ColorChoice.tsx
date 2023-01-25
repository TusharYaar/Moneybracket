import {StyleSheet, View} from "react-native";
import React from "react";
import {TouchableRipple} from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";
import {useCustomTheme} from "../themes";

const ColorChoice = ({
  color,
  onPress,
  selected,
}: {
  color: string;
  onPress: () => void;
  selected: boolean;
}) => {
  const {
    theme: {roundness},
  } = useCustomTheme();
  return (
    <TouchableRipple
      style={[
        styles.item,
        {backgroundColor: color, borderRadius: roundness * 4},
      ]}
      onPress={onPress}
    >
      <View style={styles.view}>
        {selected && <Icon name="checkmark" size={28} />}
      </View>
    </TouchableRipple>
  );
};

export default ColorChoice;

const styles = StyleSheet.create({
  item: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  view: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
