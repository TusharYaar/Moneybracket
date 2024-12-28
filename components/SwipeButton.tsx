import { StyleSheet, Text, View, ViewStyle, useWindowDimensions } from "react-native";
import React, { useMemo } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "providers/ThemeProvider";

type Props = {
  onSwipeComplete: () => void;
  bgColor?: string;
  style?: ViewStyle;
  text?: string;
  disable?: boolean;
};

const screenPadding = 16;
const pillSize = 64;
const trackPadding = 8;

const SwipeButton = ({ onSwipeComplete, bgColor = "blue", style, text = "", disable=false}: Props) => {
  const { width } = useWindowDimensions();
  const gestureEndPoint = useMemo(() => width - screenPadding * 2 - pillSize - trackPadding, [width]);
  const { textStyle } = useTheme();

  const onLeft = useSharedValue(trackPadding);
  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationX < 0) onLeft.value = trackPadding;
      else if (e.translationX > gestureEndPoint) onLeft.value = gestureEndPoint;
      else onLeft.value = e.translationX;
    })
    .onFinalize((e) => {
      if (e.translationX + 32 >= gestureEndPoint && !disable) {
        onLeft.value = withTiming(gestureEndPoint);
        runOnJS(onSwipeComplete)();
      } else onLeft.value = withTiming(trackPadding);
    });

  return (
    <View
      style={[
        {
          height: pillSize + trackPadding * 2,
          backgroundColor: bgColor,
          borderRadius: 8,
          justifyContent: "center",
        },
        style,
      ]}
    >
      <Text style={[{ alignSelf: "center" }, textStyle.title]} accessible={false}>
        {text}
      </Text>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={{
            backgroundColor: disable ? "#7f7f7f" : "#e63946",
            height: pillSize,
            width: pillSize,
            borderRadius: 8,
            position: "absolute",
            left: onLeft,
          }}
        ></Animated.View>
      </GestureDetector>
    </View>
  );
};

export default SwipeButton;

const styles = StyleSheet.create({});
