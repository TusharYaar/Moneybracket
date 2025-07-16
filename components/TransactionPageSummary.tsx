import { LayoutChangeEvent, Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useCallback, useMemo, useState } from "react";

import { useSettings } from "providers/SettingsProvider";
import { useTheme } from "providers/ThemeProvider";

import Icon from "./Icon";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
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


const current_date = new Date();

const filters = [{
  title: "today",
  startDate: startOfDay(current_date),
  endDate: endOfDay(current_date),
}, {
  title: "thisWeek",
  startDate: startOfWeek(current_date),
  endDate: endOfWeek(current_date),
}, {
  title: "thisMonth",
  startDate: startOfMonth(current_date),
  endDate: endOfMonth(current_date),
}, {
  title: "lastThree",
  startDate: subMonths(startOfMonth(current_date), 2),
  endDate: endOfDay(current_date),
}, {
  title: "lastSix",
  startDate: subMonths(startOfMonth(current_date), 5),
  endDate: endOfMonth(current_date),
},
{
  title: "thisYear",
  startDate: startOfYear(current_date),
  endDate: endOfYear(current_date),
},
]

const TransactionPageSummary = ({ totalAmount, date, style, updateDate, onLayout, ...props }: Props) => {
  const { currency, dateFormat } = useSettings();
  const { colors, textStyle } = useTheme();

  const formattedDate = useMemo(() => formatDateRange(date.start, date.end, dateFormat), [date]);

  const handleDateShift = useCallback((shift: number) => {
    const [start, end] = determineDateShift(date.start, date.end, shift)
    updateDate(start, end)
  }, [date, updateDate]);
  const [expandFilter, setExpandFilter] = useState(false);

  return (
    <View style={[styles.summaryView, style]} {...props}>
      <View style={{
        padding: 8, backgroundColor: colors.headerBackground, borderRadius: 8,
        borderBottomLeftRadius: expandFilter ? 0 : 8, borderBottomRightRadius: expandFilter ? 0 : 8
      }} onLayout={onLayout}>
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
          <Pressable onPress={() => setExpandFilter(p => !p)} style={{ flex: 1 }}>
            <Text style={[textStyle.body, { color: colors.tabbarIcon, textAlign: "center" }]}>
              {formattedDate}
            </Text>
          </Pressable>
          <Pressable onPress={() => handleDateShift(1)} style={{ padding: 4 }}>
            <Icon name={"arrowRight"} size={20} color={colors.tabbarIcon} />
          </Pressable>
        </View>
      </View>
      <View style={{
        height: expandFilter ? "auto" : 0, backgroundColor: colors.headerBackground,
        columnGap: 8, rowGap: 8, width: "100%", display: "flex", justifyContent: "center", alignItems: "flex-start",
        flexDirection: "row", flexWrap: "wrap", padding: expandFilter ? 8 : 0, overflow: "hidden"
      }}>
        {filters.map(item => (
          <Pressable onPress={() => updateDate(item.startDate, item.endDate)} key={item.title} style={{
            flexGrow: 1,
            padding: 8, borderRadius: 4, borderWidth: 2, borderColor: colors.tabbarIcon, minWidth: "40%"
          }}>
            <Text style={[textStyle.body, { color: colors.tabbarIcon, textAlign: "center" }]}>
              {item.title}
            </Text>
          </Pressable>
        ))
        }
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
    columnGap: 4
  },
});
