import { ScrollViewProps, NativeSyntheticEvent, NativeScrollEvent, ScrollView } from "react-native";
import React from "react";

import { useSharedValue } from "react-native-reanimated";

import { useHeader } from "providers/HeaderProvider";

interface Props<T> extends ScrollViewProps {
  tabbarVisible?: boolean;
  //   If Pading top is required with Header
  paddingVertical?: number;
}

function CollapsibleHeaderScrollView<T>({
  tabbarVisible = true,
  contentContainerStyle,
  paddingVertical = 0,
  ...props
}: Props<T>) {
  const lastContentOffset = useSharedValue(0);
  const { header, tabbar, headerHeight, tabbarHeight } = useHeader();

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const diff = lastContentOffset.value - event.nativeEvent.contentOffset.y;
    lastContentOffset.value = event.nativeEvent.contentOffset.y;
    if (event.nativeEvent.contentOffset.y < 64) {
      if (tabbarVisible) tabbar.show();
      header.show();
    } else if (diff < 0) {
      tabbar.hide();
      header.hide();
    } else {
      if (tabbarVisible) tabbar.show();
      header.show();
    }
  };

  return (
    <ScrollView
      {...props}
      onScroll={handleOnScroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        contentContainerStyle,
        {
          paddingTop: headerHeight + paddingVertical,
          paddingBottom: tabbarHeight + paddingVertical,
        }
      ]}
    />
  );
}

export default CollapsibleHeaderScrollView;
