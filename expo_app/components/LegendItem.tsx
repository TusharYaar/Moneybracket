import {StyleSheet, View} from "react-native";
import React from "react";

import {Text} from "react-native-paper";
import {useCustomTheme} from "../themes";

type Props = {
  amount: number;
  title: string;
  color: string;
};

const LegendItem = ({amount, title, color}: Props) => {
  const {
    theme: {roundness},
  } = useCustomTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.legend,
          {backgroundColor: color, borderRadius: roundness},
        ]}
      />
      <Text>{`${title} ${amount.toFixed()}%`}</Text>
    </View>
  );
};

export default LegendItem;

const styles = StyleSheet.create({
  legend: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
});
