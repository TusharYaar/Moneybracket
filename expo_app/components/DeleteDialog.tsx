import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <Portal>
      <Dialog visible={visible} dismissable={false}>
        <Dialog.Title>{title ? title : t("delete")}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{body ? body : "Develpement build 'DELETE'"}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={cancelAction}>{cancelText ? cancelText : t("cancel")}</Button>
          <Button onPress={deleteAction}>{deleteText ? deleteText : t("delete")}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeleteDialog;
