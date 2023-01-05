import {StyleSheet, TextStyle} from "react-native";
import React, {useMemo} from "react";
import {Text, TextProps} from "react-native-paper";
import {useSettings} from "../providers/SettingsProvider";
import {useTranslation} from "react-i18next";
import {useCustomTheme} from "../themes";

type Props = {
  amount: number;
  variant?: TextProps["variant"];
  component?: "caption" | "title" | "paragraph";
  type?: "income" | "expense" | "transfer";
  sign?: boolean;
};

const Amount = ({variant = "titleSmall", amount, type, sign}: Props) => {
  const {t} = useTranslation();
  const {currency} = useSettings();
  const {
    theme: {colors},
  } = useCustomTheme();

  return (
    <Text variant={variant} style={type && {color: colors[type]}}>{`${
      sign && amount !== 0 ? (amount > 0 ? "+" : "-") : ""
    } ${currency.symbol_native} ${t("amountValue", {
      amount: Math.abs(amount),
    })}`}</Text>
  );
};

export default Amount;

const styles = StyleSheet.create({});
