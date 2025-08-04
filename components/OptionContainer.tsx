import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { useTheme } from "providers/ThemeProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ButtonProps = {
  onPress?: () => void;
  text: string;
  style?: ViewStyle;
  variant?: "outlined" | "primary";
};

type Props = {
  title: string;
  text?: string;
  style?: ViewStyle;
  buttons: ButtonProps[];
  color: string;
};

const DeleteContainer = (props: Props) => {
  const { textStyle, colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          backgroundColor: colors.screen,
          height: 225,
          padding: 8,
          justifyContent: "space-between",
          paddingBottom: 8 + bottom,
        },
        props.style,
      ]}
    >
      <View>
        <Text style={textStyle.title} testID="option-container-title">
          {props.title}
        </Text>
        <Text style={textStyle.body} testID="option-container-text">
          {props.text}
        </Text>
      </View>
      <View style={styles.btnContainer}>
        {props.buttons.map((btn,index) => (
          <View
          key={index}
            style={[
              styles.outlineButton,
              {
                flexGrow: 1,
                borderColor: btn.variant === "outlined" ? props.color : "black",
                backgroundColor: btn.variant === "primary" ? props.color : undefined,
              },
            ]}
          >
            <Pressable
              style={{ padding: 16, justifyContent: "center", alignItems: "center" }}
              android_ripple={{ color: props.color || colors.rippleColor }}
              onPress={btn.onPress}
            >
              <Text style={textStyle.title}>{btn.text}</Text>
            </Pressable>
          </View>
        ))}

        {/* <View style={[styles.outlineButton, { flexGrow: 1, backgroundColor: props.color }]}>
          <Pressable
            testID="delete-container-confirm-btn"
            style={styles.button}
            android_ripple={{ color: props.color || colors.rippleColor }}
            onPress={props.onComfirm}
          >
            <Text style={textStyle.title}>{props.confirm}</Text>
          </Pressable>
        </View> */}
      </View>
    </View>
  );
};

export default DeleteContainer;

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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 16,
  },
});
