import {StyleSheet, View, ViewStyle} from "react-native";
import React, {useEffect} from "react";
import {Transaction} from "../realm/Transaction";
import {Caption, Subheading, TouchableRipple} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import {chooseBetterContrast} from "../utils/colors";
import {useCustomTheme} from "../themes";

import Amount from "./Amount";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {useSettings} from "../providers/SettingsProvider";

type Props = {
  data: Transaction;
  onPress: () => void;
  style?: ViewStyle;
};

const TransactionItem = ({data, onPress, style}: Props) => {
  const {currency} = useSettings();

  const {theme} = useCustomTheme();

  const scale = useSharedValue(0.6);
  const aStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  useEffect(() => {
    scale.value = withTiming(1);
  }, []);

  return (
    <Animated.View style={[styles.overflowContainer, aStyle, style]}>
      <TouchableRipple onPress={onPress} style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Icon
            name={data.category.icon}
            size={36}
            style={{
              color: chooseBetterContrast(data.category.color),
              backgroundColor: data.category.color,
              padding: 8,
              borderRadius: 8,
            }}
          />
          <View style={styles.text}>
            <View>
              <Subheading>{data.category.title}</Subheading>
              {data.note.length > 0 && <Caption>{data.note}</Caption>}
            </View>
            <Amount
              amount={
                data.category.type === "income" ? data.amount : data.amount * -1
              }
              sign={true}
            />
          </View>
        </View>
      </TouchableRipple>
    </Animated.View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  overflowContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  outerContainer: {
    borderRadius: 8,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  text: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingLeft: 8,
  },
});
