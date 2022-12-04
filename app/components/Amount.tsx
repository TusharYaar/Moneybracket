import {StyleSheet, TextStyle} from "react-native";
import React, {useMemo} from "react";
import {Caption, Paragraph, Title} from "react-native-paper";
import {useSettings} from "../providers/SettingsProvider";
import {useTranslation} from "react-i18next";
import {useCustomTheme} from "../themes";

type Props = {
  amount: number;
  component?: "caption" | "title" | "paragraph";
  type?: "income" | "expense" | "transfer";
  sign?: boolean;
  weight?: "regular" | "medium" | "light" | "thin";
};

const Amount = ({component, amount, type, weight, sign}: Props) => {
  const {t} = useTranslation();
  const {currency} = useSettings();
  const {
    theme: {colors, fonts},
  } = useCustomTheme();
  let Component = Title;
  switch (component) {
    case "caption":
      Component = Caption;
      break;

    case "paragraph":
      Component = Paragraph;
      break;
  }

  const tStyle = useMemo(() => {
    let obj: TextStyle = {
      color: colors.text,
      ...fonts["medium"],
    };
    if (type) obj.color = colors[type];

    if (weight) obj = {...obj, ...fonts[weight]};

    return obj;
  }, [type, weight]);

  return (
    <Component style={[tStyle]}>{`${
      sign && amount !== 0 ? (amount > 0 ? "+" : "-") : ""
    } ${currency.symbol_native} ${t("amountValue", {
      amount: Math.abs(amount),
    })}`}</Component>
  );
};

export default Amount;

const styles = StyleSheet.create({});
