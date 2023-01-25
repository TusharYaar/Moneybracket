import {StyleSheet, View, ViewStyle} from "react-native";
import React from "react";

import {Surface, Text} from "react-native-paper";
import {useCustomTheme} from "../themes";

import Icon from "react-native-vector-icons/Ionicons";
import {useSettings} from "../providers/SettingsProvider";
import Amount from "./Amount";

type Props = {
  title: string;
  icon: string;
  amount: number;
  type: "income" | "expense" | "transfer";
  color: string;
  style?: ViewStyle;
};

const CategoryChartsItem = ({
  title,
  icon,
  amount,
  type,
  style,
  color,
}: Props) => {
  const {
    theme: {colors},
  } = useCustomTheme();
  return (
    <Surface style={[styles.surface, style]}>
      <View style={styles.container}>
        <Icon name={icon} color={color} size={30} />
        <View style={styles.textContainer}>
          <Text variant="labelLarge" ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={{color: colors[type]}} variant="labelMedium">
            {type}
          </Text>
        </View>
      </View>
      <View style={styles.amountContainer}>
        <Amount amount={amount} />
      </View>
    </Surface>
  );
};

export default CategoryChartsItem;

const styles = StyleSheet.create({
  surface: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: 4,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "60%",
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginHorizontal: 4,
  },
  amountContainer: {
    maxWidth: "40%",
  },
});
