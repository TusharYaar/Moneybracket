import React from "react";

import { useSharedValue } from "react-native-reanimated";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useHeader } from "providers/HeaderProvider";

interface Props<T> extends FlashListProps<T> {
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

function CollapsibleHeaderFlatList<T>({
  onScroll = undefined,
  headerVisible = true,
  title = "",
  hideBackButton,
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
  return (
    <FlashList
      {...props}
      onScroll={handleOnScroll}
      estimatedItemSize={78}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ ...contentContainerStyle, paddingTop: title ? paddingTop + APPBAR_HEIGHT : 0 }}
    />
  );
}

export default CollapsibleHeaderFlatList;
