import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { useTheme } from "providers/ThemeProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string;
  text?: string;
  subtext?: string;
  onComfirm: () => void;
  color: string;
  confirm: string;
  style?: ViewStyle;
};

const SuccessContainer = (props: Props) => {
  const { textStyle, colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          backgroundColor: colors.screen,
          height: 150,
          padding: 8,
          justifyContent: "space-between",
          paddingBottom: 8 + bottom,
        },
        props.style,
      ]}
    >
      <View>
        <Text style={textStyle.title} testID="success-container-title">
          {props.title}
        </Text>
        <Text style={textStyle.body} testID="success-container-text">
          {props.text}
        </Text>
      </View>
        <View style={[styles.outlineButton, { flexGrow: 1, backgroundColor: props.color }]}>
          <Pressable
            testID="success-container-confirm-btn"
            style={styles.button}
            android_ripple={{ color: props.color || colors.rippleColor }}
            onPress={props.onComfirm}
          >
            <Text style={textStyle.title}>{props.confirm}</Text>
          </Pressable>
      </View>
    </View>
  );
};

export default SuccessContainer;

const styles = StyleSheet.create({
  outlineButton: {
    borderRadius: 8,
    borderWidth: 2,
  },

  button: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
