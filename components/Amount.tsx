import { StyleSheet, Text, TextComponent } from "react-native";
import React from "react";
import { useSettings } from "../providers/SettingsProvider";
import { useTheme } from "../providers/ThemeProvider";

import { useTranslation } from "react-i18next";

interface Props extends TextComponent {
  amount: number;
  component?: "caption" | "title" | "paragraph";
  type?: string;
  sign?: boolean;
};

const Amount = ({ amount, type, sign,  }: Props) => {
  const { currency } = useSettings();
  const { t } = useTranslation();
  const {
     colors,
  } = useTheme();
  return (
    <Text style={type && { color: colors[type]}}  >
      {`${sign && amount !== 0 ? (amount > 0 ? "+ " : "- ") : ""}${currency.symbol_native}${t("amountValue", {
        amount,
      })}`}
    </Text>
  );
};

export default Amount;

const styles = StyleSheet.create({});
