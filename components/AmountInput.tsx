import { GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { KeyboardTypeOptions, ViewStyle } from "react-native";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "providers/ThemeProvider";

type Props = {
  placeholder?: string;
  backgroundColor: string;
  initialValue?: string;
  onChangeText?: (text: string) => void;
  prefix?: string;
  type?: "amount" | "string";
  keyboardType?: KeyboardTypeOptions;
  autofocus?: boolean;
  containerStyle?: ViewStyle;
  width: number;
  showActionButton?: boolean;
  onPressActionButton?: (event: GestureResponderEvent) => void;
  actionButtonText?: string;
  helperText?: string;
};

const MIN_CHAR = 4;
const PADDING = 16;
const LINE_HEIGHT = 1.8;
const PrimaryInput = forwardRef<TextInput, Props>(function AmountInput(
  { prefix = "", initialValue = "", backgroundColor, autofocus = true, width, showActionButton = false, ...props },
  ref
) {
  const { textStyle, colors } = useTheme();
  const [amount, setAmount] = useState<string>(initialValue);
  const animatedBGColor = useSharedValue(backgroundColor ? backgroundColor : "orange");

  const amtInputRef = useRef<TextInput>(null);
  useImperativeHandle(ref, () => amtInputRef.current!, [amtInputRef]);

  useEffect(() => {
    animatedBGColor.value = withTiming(backgroundColor);
  }, [backgroundColor]);

  // TODO: Improve Logic for MaxFontHeight
  const maxFontHeight = useMemo(() => {
    return (width - 2 * PADDING) / MIN_CHAR;
  }, [width]);

  const fontSize = useMemo(() => {
    if (amount.length + prefix.length >= MIN_CHAR) {
      const size = (width - 2 * PADDING) / amount.length;
      if (size < maxFontHeight) return size;
    }
    return maxFontHeight;
  }, [amount, maxFontHeight]);

  const handleChangeText = useCallback(
    (text: string) => {
      if (props.type === "amount") {
        const match = text.match(/^\d*(\.\d{0,2})?$/g);
        if (match === null) return;
      }
      if (props.onChangeText) props.onChangeText(text);
      setAmount(text);
    },
    [props.onChangeText]
  );

  return (
    <Animated.View style={[styles.container, props.containerStyle, { backgroundColor: animatedBGColor }]}>
      <Pressable onPress={() => amtInputRef.current?.focus()} style={[styles.pressable]}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
          {prefix && <Text style={[styles.textbox, textStyle.amount, { fontSize }]}>{prefix}</Text>}
          <TextInput
            autoFocus={autofocus}
            ref={amtInputRef}
            placeholder={props.placeholder}
            onChangeText={handleChangeText}
            value={amount}
            style={[styles.textbox, textStyle.amount, { fontSize, height: maxFontHeight * LINE_HEIGHT }]}
            keyboardType={props.keyboardType}
          />
        </View>
        {props.helperText && <Text style={textStyle.body}>{props.helperText}</Text>}

        {showActionButton && (
          <View style={[styles.actionBtnContainer, { backgroundColor: colors.sectionBackground }]}>
            <Pressable onPress={props.onPressActionButton} style={[styles.actionBtn]}>
              <Text style={textStyle.label}>{props.actionButtonText}</Text>
            </Pressable>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
});
export default PrimaryInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
  },
  pressable: {
    flexDirection: "column",
    alignItems: "center",
  },
  textbox: {
    textDecorationLine: "underline",
    // marginTop: 32,
    // backgroundColor: "blue",
  },
  actionBtnContainer: {
    padding: 4,
    margin: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  actionBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});
