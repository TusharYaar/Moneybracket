import React from "react";
import {Dialog, Portal, Paragraph, Button} from "react-native-paper";

type Props = {
  visible: boolean;
  onClickOk: () => void;
  onClickCancel: () => void;
  okText?: string;
  cancelText?: string;
  body?: string;
  title?: string;
};

const DeleteDialog = ({
  visible,
  onClickCancel,
  onClickOk,
  cancelText,
  okText,
  title,
  body,
}: Props) => {
  return (
    <Portal>
      <Dialog visible={visible} dismissable={false}>
        <Dialog.Title>{title ? title : "Alert"}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{body ? body : "Develpement build 'DELETE'"}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClickCancel}>
            {cancelText ? cancelText : "Cancel"}
          </Button>
          <Button onPress={onClickOk}>{okText ? okText : "Ok"}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteDialog;
