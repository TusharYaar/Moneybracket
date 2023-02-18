import { StyleSheet } from "react-native";
import React from "react";
import ModalContainer from "./ModalContainer";
import { FlashList } from "@shopify/flash-list";

import { resources as LANGUAGES } from "../localization";
import { useTranslation } from "react-i18next";
import LanguageItem from "./LanguageItem";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onItemSelect: (code: string) => void;
};

const LanguageModal = ({ visible, onDismiss, onItemSelect }: Props) => {
  const { t } = useTranslation("", { keyPrefix: "components.languageModal" });
  const { t: lt } = useTranslation("", { keyPrefix: "languages" });
  return (
    <ModalContainer visible={visible} onDismiss={onDismiss} title={t("title")} contentContainerStyle={styles.modal}>
      <FlashList
        data={Object.keys(LANGUAGES)}
        renderItem={({ item }) => <LanguageItem language={lt(item)} onPress={() => onItemSelect(item)} />}
        estimatedItemSize={46}
      />
    </ModalContainer>
  );
};

export default LanguageModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    maxHeight: 300,
  },
});
