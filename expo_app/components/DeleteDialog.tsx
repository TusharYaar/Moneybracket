import React from "react";
import { Dialog, Portal, Paragraph, Button } from "react-native-paper";

type Props = {
  visible: boolean;
  deleteAction: () => void;
  cancelAction: () => void;
  deleteText?: string;
  cancelText?: string;
  body?: string;
  title?: string;
};

const DeleteDialog = ({ visible, cancelAction, deleteAction, cancelText, deleteText, title, body }: Props) => {
  return (
    <Portal>
      <Dialog visible={visible} dismissable={false}>
        <Dialog.Title>{title ? title : "Delete ?"}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{body ? body : "Develpement build 'DELETE'"}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={cancelAction}>{cancelText ? cancelText : "Cancel"}</Button>
          <Button onPress={deleteAction}>{deleteText ? deleteText : "Delete"}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteDialog;
