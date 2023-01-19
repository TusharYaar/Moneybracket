import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import React, {ReactNode} from "react";
import {IconButton, Modal, Portal, Text} from "react-native-paper";
import {useCustomTheme} from "../themes";

type Props = {
  children: ReactNode;
  onDismiss: () => void;
  title: string;
  visible: boolean;
  showDelete?: boolean;
  onDelete?: () => void;
  barColor?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const ModalContainer = ({
  children,
  showDelete,
  title,
  visible,
  onDismiss,
  onDelete,
  barColor,
  contentContainerStyle,
}: Props) => {
  const {theme} = useCustomTheme();
  return (
    <Portal>
      <Modal
        onDismiss={onDismiss}
        visible={visible}
        style={{borderRadius: 0}}
        contentContainerStyle={[
          {
            margin: 16,
            backgroundColor: theme.colors.surface,
          },
          contentContainerStyle,
        ]}
      >
        <View style={[styles.actionBtnContainer, {backgroundColor: barColor}]}>
          <IconButton
            icon="close"
            onPress={onDismiss}
            style={[styles.closeBtn, {borderRadius: theme.roundness * 4}]}
          />
          <Text variant="titleMedium">{title}</Text>
          {showDelete && (
            <IconButton
              icon="trash"
              style={[styles.trashBtn, {borderRadius: theme.roundness * 4}]}
              onPress={onDelete}
            />
          )}
        </View>
        {children}
      </Modal>
    </Portal>
  );
};

export default ModalContainer;

const styles = StyleSheet.create({
  actionBtnContainer: {
    position: "relative",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtn: {
    position: "absolute",
    margin: 0,
    left: 0,
  },
  trashBtn: {
    right: 0,
    margin: 0,
    position: "absolute",
  },
});
