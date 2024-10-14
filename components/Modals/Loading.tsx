import { StyleSheet, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Modal, Portal, ProgressBar, Text } from "react-native-paper";
import { useCustomTheme } from "../../providers/ThemeProvider";
import { useTranslation } from "react-i18next";

type Props = {
  contentContainerStyle?: StyleProp<ViewStyle>;
  visible: boolean;
  text: string;
  progress?: number;
};

const Loading = ({ visible, text, contentContainerStyle, progress }: Props) => {
  const { theme } = useCustomTheme();
  const { t } = useTranslation();

  return (
    <Portal>
      <Modal
        visible={visible}
        style={{ borderRadius: theme.roundness * 4 }}
        contentContainerStyle={[
          {
            margin: 16,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.roundness * 4,
            padding: 8,
          },
          contentContainerStyle,
        ]}
      >
        <View>
          <Text variant="displayMedium">{t("loading")}</Text>
          <ProgressBar indeterminate={!Boolean(progress)} progress={progress} style={{ marginVertical: 8 }} />
          <Text>{text}</Text>
        </View>
      </Modal>
    </Portal>
  );
};

export default Loading;

const styles = StyleSheet.create({});
