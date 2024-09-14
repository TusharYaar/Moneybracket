import { GestureResponderEvent, Pressable, StyleSheet, TextInput, useWindowDimensions } from "react-native";
import type {KeyboardTypeOptions  } from "react-native";
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  placeholder?: string;
  backgroundColor: string;
  initialValue?: string;
  onChangeText?: (text: string) => void;
  prefix?: string;
  type?: "amount" | "string";
  keyboardType?:KeyboardTypeOptions;
};

const MIN_CHAR = 4;

const PrimaryInput = forwardRef<TextInput, Props>(function AmountInput( { prefix="", initialValue="", backgroundColor,...props}, ref) {
  const { width } = useWindowDimensions();
  const [amount, setAmount] = useState<string>(prefix + initialValue);

  const animatedBGColor = useSharedValue(backgroundColor ? backgroundColor : "orange");

  useEffect(() => {
    animatedBGColor.value = withTiming(backgroundColor);
  }, [backgroundColor]);

  // TODO: Improve Logic for MaxFontHeight
  const maxFontHeight = useMemo(() => {
    const height = width / MIN_CHAR;
    return height > 300 ? 300 : height;
  }, []);

  const fontSize = useMemo(() => {
    if (amount.length < MIN_CHAR) return Math.floor(maxFontHeight);
    else return Math.floor((maxFontHeight * MIN_CHAR) / (amount.length + 1));
  }, [width, amount, maxFontHeight]);

  const handleChangeText = useCallback((_text: string) => {
    let text = _text;
    let prefixLength = prefix && props.type === "amount" ? prefix.length : 0;

    if (prefixLength > 0) {
      text = _text.substring(0,prefixLength) === prefix ? _text : prefix + text; 
    }

    if (props.onChangeText) props.onChangeText(text.substring(prefixLength));
    setAmount(text);
  }, [props.onChangeText, prefix, props.type]);

  return (
    <Animated.View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Pressable onPress={props.onPress} style={styles.pressable}>
        <TextInput
          autoFocus
          ref={ref}
          placeholder={props.placeholder}
          onChangeText={handleChangeText}
          value={amount}
          style={[styles.textbox, { fontSize, height: maxFontHeight }]}
          keyboardType={props.keyboardType}
        />
        {/* <View style={styles.actionBtnContainer}>
          {__DEV__ && (
            <Pressable onPress={() => console.log("e")} style={[styles.actionBtn]}>
              <Text>Action Button</Text>
            </Pressable>
          )}
        </View> */}
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
    width: "100%",
    textAlign: "center",
    textDecorationLine: "underline",
    marginVertical: 32,
  },
  actionBtnContainer: {
    padding: 4,
    margin: 16,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 4,
  },
  actionBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});
