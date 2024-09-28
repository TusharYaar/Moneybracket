import { ScrollViewProps, NativeSyntheticEvent, NativeScrollEvent, ScrollView } from "react-native";
import React from "react";

import { useSharedValue } from "react-native-reanimated";

import { useHeader } from "providers/HeaderProvider";

interface Props<T> extends ScrollViewProps {
  headerVisible?: boolean;
  title?: string;
  hideBackButton?: boolean;
  //   If Pading top is required with Header
  paddingTop?: number;
  handleClickBack?: () => {};

  headerBtns?: {
    onPress: () => void;
    icon: string;
    label: string;
    disabled?: boolean;
  }[];
}
const APPBAR_HEIGHT = 64;

function CollapsibleHeaderScrollView<T>({
  onScroll = undefined,
  headerVisible = true,
  title = "",
  hideBackButton = false,
  handleClickBack = null,
  contentContainerStyle = {},
  paddingTop = 0,
  headerBtns = [],
  ...props
}: Props<T>) {
  const lastContentOffset = useSharedValue(0);
  const { showHeader, hideHeader, hideTabbar, showTabbar } = useHeader();


  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const diff = lastContentOffset.value - event.nativeEvent.contentOffset.y;
    lastContentOffset.value = event.nativeEvent.contentOffset.y;
    if (event.nativeEvent.contentOffset.y < 64)
      {
        showTabbar();
        showHeader();
      } 
    else if (diff < 0)  {
      hideHeader();
      hideTabbar();
    }
    else {
      showTabbar();
      showHeader();
    } 
  };

  // const aStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateY: interpolate(height.value, [0, APPBAR_HEIGHT], [-APPBAR_HEIGHT, 0]),
  //       },
  //     ],
  //     //   opacity: interpolate(
  //     //     animatedValue !== undefined ? animatedValue?.value : maxAnimationValue,
  //     //     [0, maxAnimationValue],
  //     //     [0, 1],
  //     //     {
  //     //       extrapolateLeft: Extrapolate.CLAMP,
  //     //       extrapolateRight: Extrapolate.CLAMP,
  //     //     }
  //     //   ),
  //   };
  // });

  return (
    <ScrollView
      {...props}
      onScroll={handleOnScroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[contentContainerStyle, title ? { paddingTop: paddingTop + APPBAR_HEIGHT } : null]}
    />
  );
}

export default CollapsibleHeaderScrollView;
