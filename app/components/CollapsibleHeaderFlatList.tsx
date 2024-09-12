import { StyleSheet, FlatListProps } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

// import { FlashList } from "@shopify/flash-list";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Header from "./Header";

interface Props<T> extends FlatListProps<T> {
  showHeader?: boolean;
  title?: string;

  //   If Pading top is required with Header
  paddingTop?: number;
  handleClickBack?: () => {};

  headerBtns?: {
    onPress: () => void;
    icon: string;
    label: string;

  }[];
}
const APPBAR_HEIGHT = 64;

function CollapsibleHeaderFlatList<T>({
  onScroll = undefined,
  showHeader = true,
  title = "",
  handleClickBack = null,
  contentContainerStyle = {},
  paddingTop = 0,
  headerBtns = [],
  ...props

}: Props<T>) {
  const router = useRouter();

  const lastContentOffset = useSharedValue(0);
  const height = useSharedValue(APPBAR_HEIGHT);

  const handleOnScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      const diff = lastContentOffset.value - contentOffset.y;
      // scrolling up diff -ve
      // scrolling down diff +ve
      if (contentOffset.y === 0) height.value = withTiming(APPBAR_HEIGHT);
      else if (diff < 0) height.value = height.value + diff > 60 ? height.value + diff : withTiming(0);
      else height.value = height.value + diff <= APPBAR_HEIGHT ? height.value + diff : withTiming(APPBAR_HEIGHT);
      lastContentOffset.value = contentOffset.y;
    },
  });

  const aStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(height.value, [0, APPBAR_HEIGHT], [-APPBAR_HEIGHT, 0]),
        },
      ],
      //   opacity: interpolate(
      //     animatedValue !== undefined ? animatedValue?.value : maxAnimationValue,
      //     [0, maxAnimationValue],
      //     [0, 1],
      //     {
      //       extrapolateLeft: Extrapolate.CLAMP,
      //       extrapolateRight: Extrapolate.CLAMP,
      //     }
      //   ),
    };
  });

  return (
    <>
      <Animated.View style={[styles.headerContainer, aStyle]} onLayout={(event) => console.log(event.nativeEvent.layout)}>
        <Header title={title} showBackButton={false} headerBtns={headerBtns} />
      </Animated.View>
      <Animated.FlatList
        {...props}
        onScroll={handleOnScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[contentContainerStyle, title ? { paddingTop: paddingTop + APPBAR_HEIGHT } : null]}
      />
    </>
  );
}

export default CollapsibleHeaderFlatList;

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    zIndex: 10,
    width: "100%",
    // height: APPBAR_HEIGHT,
    // backgroundColor: "#010a19",
    // flexDirection: "row",
    // alignItems: "center"
  },
});
