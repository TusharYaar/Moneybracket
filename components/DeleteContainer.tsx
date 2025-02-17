import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { useTheme } from "providers/ThemeProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string;
  text?: string;
  subtext?: string;
  onComfirm: () => void;
  onCancel?: () => void;
  color: string;
  cancel: string;
  confirm: string;
  style?: ViewStyle;
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
        <Text style={textStyle.title} testID="delete-container-title">
          {props.title}
        </Text>
        <Text style={textStyle.body} testID="delete-container-text">
          {props.text}
        </Text>
      </View>
      <View style={styles.deleteBtnContainer}>
        <View style={[styles.outlineButton, { flexGrow: 1, borderColor: props.color }]}>
          <Pressable
            style={{ padding: 16, justifyContent: "center", alignItems: "center" }}
            android_ripple={{ color: props.color || colors.rippleColor }}
            onPress={props.onCancel}
          >
            <Text style={textStyle.title} testID="delete-container-cancel-btn">
              {props.cancel}
            </Text>
          </Pressable>
        </View>
        <View style={[styles.outlineButton, { flexGrow: 1, backgroundColor: props.color }]}>
          <Pressable
            testID="delete-container-confirm-btn"
            style={styles.button}
            android_ripple={{ color: props.color || colors.rippleColor }}
            onPress={props.onComfirm}
          >
            <Text style={textStyle.title}>{props.confirm}</Text>
          </Pressable>
        </View>
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
  deleteBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 16,
  },
});
