import { View } from "react-native";
import React from "react";
import ModalContainer from "./ModalContainer";

import { resources as LANGUAGES } from "../../localization";
import { useTranslation } from "react-i18next";
import LanguageItem from "../LanguageItem";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onItemSelect: (code: string) => void;
  current: string;
};

const LanguageModal = ({ visible, onDismiss, onItemSelect, current }: Props) => {
  const { t } = useTranslation("", { keyPrefix: "components.languageModal" });
  const { t: lt } = useTranslation("", { keyPrefix: "languages" });
  return (
    <ModalContainer visible={visible} onDismiss={onDismiss} title={t("title")}>
      <View style={{ padding: 8 }}>
        {Object.keys(LANGUAGES).map((item) => (
          <LanguageItem key={item} language={lt(item)} onPress={() => onItemSelect(item)} focused={current === item} />
        ))}
      </View>
    </ModalContainer>
  );
};

export default LanguageModal;
