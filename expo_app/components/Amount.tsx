import { StyleSheet } from "react-native";
import React from "react";
import { Text, TextProps } from "react-native-paper";
import { useSettings } from "../providers/SettingsProvider";
import { useCustomTheme } from "../themes";
import { useTranslation } from "react-i18next";

type Props = {
  amount: number;
  variant?: TextProps["variant"];
  component?: "caption" | "title" | "paragraph";
  type?: "income" | "expense" | "transfer";
  sign?: boolean;
};

const Amount = ({ variant = "titleSmall", amount, type, sign }: Props) => {
  const { currency } = useSettings();
  const { t } = useTranslation();
  const {
    theme: { colors },
  } = useCustomTheme();
  return (
    <Text variant={variant} style={type && { color: colors[type] }}>
      {`${sign && amount !== 0 ? (amount > 0 ? "+ " : "- ") : ""}${currency.symbol_native}${t("amountValue", {
        amount,
      })}`}
    </Text>
  );
};

export default Amount;

const styles = StyleSheet.create({});
