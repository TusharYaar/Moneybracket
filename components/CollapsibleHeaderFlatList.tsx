import React from "react";

import { useSharedValue } from "react-native-reanimated";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useHeader } from "providers/HeaderProvider";

interface Props<T> extends FlashListProps<T> {
  hideBackButton?: boolean;
  //   If Pading top is required with Header
  paddingVertical?: number;
  paddingTop?: number;
  paddingBottom?: number;
  // onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => {}
  // handleClickBack?: () => {};
}

function CollapsibleHeaderFlatList<T>({ onScroll, contentContainerStyle, paddingVertical = 0,paddingTop = 0, paddingBottom = 0 ,...props}: Props<T>) {
  const lastContentOffset = useSharedValue(0);
  const { header, tabbar, headerHeight, tabbarHeight } = useHeader();

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const diff = lastContentOffset.value - event.nativeEvent.contentOffset.y;
    lastContentOffset.value = event.nativeEvent.contentOffset.y;
    if (event.nativeEvent.contentOffset.y < 64) {
      tabbar.show();
      header.show();
    } else if (diff < 0) {
      tabbar.hide();
      header.hide();
    } else {
      tabbar.show();
      header.show();
    }
    if (onScroll) onScroll(event);

  };
  return (
    <FlashList
      {...props}
      onScroll={handleOnScroll}
      estimatedItemSize={78}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        ...contentContainerStyle,
        paddingTop: headerHeight + (paddingTop ? paddingTop : paddingVertical) ,
        paddingBottom: tabbarHeight + (paddingBottom ? paddingBottom : paddingVertical),
      }}
    />
  );
}

export default CollapsibleHeaderFlatList;
