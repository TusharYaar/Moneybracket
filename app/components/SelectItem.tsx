import {StyleSheet, View} from "react-native";
import React from "react";
import {Paragraph, TouchableRipple} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  icon: string;
  text: string;
  selected: boolean;
  onPress: () => void;
  onLongPress?: () => void;
};

const SelectItem = ({text, selected, onPress, icon}: Props) => {
  return (
    <TouchableRipple
      onPress={onPress}
      style={[styles.outer, selected && styles.highlight]}>
      <View style={styles.inner}>
        <Icon name={selected ? "check" : icon} size={16} />
        <Paragraph>{text}</Paragraph>
      </View>
    </TouchableRipple>
  );
};

export default SelectItem;

const styles = StyleSheet.create({
  outer: {
    borderRadius: 7,
    marginHorizontal: 5,
    borderColor: "orange",
    borderWidth: 2,
    paddingHorizontal: 5,
  },
  highlight: {
    backgroundColor: "orange",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
