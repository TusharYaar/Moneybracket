import { StyleSheet, View } from "react-native";
import React from "react";
import ModalContainer from "./ModalContainer";
import { DATE } from "../data";
import DateFormatItem from "./Charts/DateFormatItem";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onItemSelect: (code: string) => void;
};

const DateFormatModal = ({ visible, onDismiss, onItemSelect }: Props) => {
  const { t } = useTranslation("", { keyPrefix: "components.dateFormatModal" });

  return (
    <ModalContainer visible={visible} onDismiss={onDismiss} title={t("title")}>
      <View style={styles.container}>
        {DATE.map((item) => (
          <DateFormatItem date={item} key={item} onPress={() => onItemSelect(item)} />
        ))}
      </View>
    </ModalContainer>
  );
};

export default DateFormatModal;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
