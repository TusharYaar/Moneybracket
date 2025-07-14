import { LayoutChangeEvent, Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useCallback, useMemo } from "react";

import { useSettings } from "providers/SettingsProvider";
import { useTheme } from "providers/ThemeProvider";

import Icon from "./Icon";
import {
  addMonths,
  endOfMonth,
  endOfYear,
  format,
  isEqual,
  isSameDay,
  isSameMonth,
  isSameYear,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
} from "date-fns";
import { determineDateShift, formatDateRange } from "@utils/date";

type Props = {
  totalAmount: {
    income?: number;
    expense?: number;
    transfer?: number | undefined;
  };
  date: {
    start: Date;
    end: Date;
  };
  updateDate: (start: Date, end: Date) => void;
  style?: ViewStyle | ViewStyle[];
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
};

const TransactionPageSummary = ({ totalAmount, date, style, updateDate, ...props }: Props) => {
  const { currency, dateFormat } = useSettings();
  const { colors, textStyle } = useTheme();

  const formattedDate = useMemo(() => formatDateRange(date.start, date.end, dateFormat), [date]);

  const handleDateShift = useCallback((shift: number) => {
    const [start, end] = determineDateShift(date.start, date.end, shift)
    updateDate(start,end)
  }, [date, updateDate]);

  return (
    <View style={[styles.summaryView, style]} {...props}>
      <View style={{ padding: 8, backgroundColor: colors.headerBackground, borderRadius: 8 }}>
        <Text
          style={[textStyle.caption, { color: colors.income, fontFamily: "monospace" }]}
        >{`${currency.symbol_native}${totalAmount.income}`}</Text>
        <Text
          style={[textStyle.caption, { color: colors.expense, fontFamily: "monospace" }]}
        >{`${currency.symbol_native}${totalAmount.expense}`}</Text>
        <View style={styles.dateSection}>
          <Pressable onPress={() => handleDateShift(-1)} style={{ padding: 4 }}>
            <Icon name={"arrowLeft"} size={20} color={colors.tabbarIcon} />
          </Pressable>
          <Text style={[textStyle.body, { color: colors.tabbarIcon }]}>{formattedDate}</Text>
          <Pressable onPress={() => handleDateShift(1)} style={{ padding: 4 }}>
            <Icon name={"arrowRight"} size={20} color={colors.tabbarIcon} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TransactionPageSummary;

const styles = StyleSheet.create({
  summaryView: {
    width: "100%",
    zIndex: 10,
    overflow: "hidden",
  },
  dateSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
