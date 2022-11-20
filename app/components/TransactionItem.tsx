import {StyleSheet, View} from "react-native";
import React, {useEffect} from "react";
import {Transaction} from "../realm/Transaction";
import {Caption, Subheading, Title, TouchableRipple} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import {chooseBetterContrast} from "../utils/colors";
import {useCustomTheme} from "../themes";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  data: Transaction;
  onPress: () => void;
};

const TransactionItem = ({data, onPress}: Props) => {
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
    <Animated.View style={[styles.overflowContainer, aStyle]}>
      <TouchableRipple
        onPress={onPress}
        style={[styles.outerContainer, {backgroundColor: data.category.color}]}
      >
        <View style={styles.innerContainer}>
          <Icon
            name={data.category.icon}
            size={36}
            style={{color: chooseBetterContrast(data.category.color)}}
          />
          <View style={styles.text}>
            <View>
              <Subheading
                style={{
                  color: chooseBetterContrast(data.category.color),
                  ...theme.fonts.regular,
                }}
              >
                {data.category?.title}
              </Subheading>
              <Caption
                style={{
                  color: chooseBetterContrast(data.category?.color),
                  ...theme.fonts.regular,
                }}
              >
                {data.category?.type}
              </Caption>
            </View>
            <Title
              style={{
                color: chooseBetterContrast(data.category?.color),
                ...theme.fonts.regular,
              }}
            >{`${data.amount}`}</Title>
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
    backgroundColor: "red",
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
  },
});
