import { StyleSheet } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import type { VariantProp } from "react-native-paper/lib/typescript/src/components/Typography/types";
import { useSettings } from "../providers/SettingsProvider";
import { useCustomTheme } from "../providers/ThemeProvider";

import { useTranslation } from "react-i18next";

type Props = {
  amount: number;
  variant?: VariantProp<Text>;
  component?: "caption" | "title" | "paragraph";
  type?: string;
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
