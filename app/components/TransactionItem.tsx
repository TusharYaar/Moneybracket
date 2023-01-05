import {StyleSheet, View, ViewStyle} from "react-native";
import React, {useEffect} from "react";
import {Transaction} from "../realm/Transaction";
import {Text, TouchableRipple} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import {chooseBetterContrast} from "../utils/colors";

import Amount from "./Amount";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  data: Transaction;
  onPress: () => void;
  style?: ViewStyle;
};

const TransactionItem = ({data, onPress, style}: Props) => {
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
    <Animated.View style={[aStyle, style]}>
      <TouchableRipple onPress={onPress}>
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
              <Text variant="bodyLarge">{data.category.title}</Text>
              {data.note.length > 0 && (
                <Text variant="bodySmall">{data.note}</Text>
              )}
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
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingLeft: 8,
  },
});
