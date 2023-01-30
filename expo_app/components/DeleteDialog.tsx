import React from "react";
import { Dialog, Portal, Paragraph, Button } from "react-native-paper";

type Props = {
  visible: boolean;
  deleteAction: () => void;
  cnacelAction: () => void;
  okText?: string;
  cancelText?: string;
  body?: string;
  title?: string;
};

const DeleteDialog = ({ visible, cnacelAction, deleteAction, cancelText, okText, title, body }: Props) => {
  return (
    <Portal>
      <Dialog visible={visible} dismissable={false}>
        <Dialog.Title>{title ? title : "Alert"}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{body ? body : "Develpement build 'DELETE'"}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={cnacelAction}>{cancelText ? cancelText : "Cancel"}</Button>
          <Button onPress={deleteAction}>{okText ? okText : "Ok"}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteDialog;
