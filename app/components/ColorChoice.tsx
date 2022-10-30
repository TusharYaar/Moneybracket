import {StyleSheet, View} from "react-native";
import React from "react";
import {TouchableRipple} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
      onPress={onPress}>
      <View style={styles.view}>
        {selected && <Icon name="check" size={20} />}
      </View>
    </TouchableRipple>
  );
};

export default ColorChoice;

const styles = StyleSheet.create({
  item: {width: 20, height: 20},
  view: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
