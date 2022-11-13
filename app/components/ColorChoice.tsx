import {StyleSheet, View} from "react-native";
import React from "react";
import {TouchableRipple} from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";

const ColorChoice = ({
  color,
  onPress,
  selected,
}: {
  color: string;
  onPress: () => void;
  selected: boolean;
}) => {
  return (
    <TouchableRipple
      style={[styles.item, {backgroundColor: color}]}
      onPress={onPress}
    >
      <View style={styles.view}>
        {selected && <Icon name="checkmark" size={20} />}
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
    borderRadius: 8,
  },
  view: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
