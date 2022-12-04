import {StyleSheet, Text, View} from "react-native";
import React from "react";

import {Caption} from "react-native-paper";
import {useCustomTheme} from "../themes";

type Props = {
  amount: number;
  title: string;
  color: string;
};

const LegendItem = ({amount, title, color}: Props) => {
  const {
    theme: {fonts},
  } = useCustomTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.legend, {backgroundColor: color}]} />
      <Caption
        style={[fonts.medium]}
      >{`${title} ${amount.toFixed()}%`}</Caption>
    </View>
  );
};

export default LegendItem;

const styles = StyleSheet.create({
  legend: {
    width: 20,
    height: 20,
    borderRadius: 7,
    marginHorizontal: 5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
