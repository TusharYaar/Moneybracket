import { ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useData } from "../../providers/DataProvider";
import { List } from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";

import CategoryChip from "../../components/CategoryChip";
import { Category } from "../../realm/Category";
import CategoryChartsItem from "../../components/CategoryChartsItem";
import Pie from "../../components/Charts/Pie";
import { useCustomTheme } from "../../providers/ThemeProvider";
import { transactionWithinDates } from "../../utils/transaction";
import { useTranslation } from "react-i18next";
import NoChartSVG from "../../components/SVGs/NoChartSVG";

const Charts = () => {
  const { transaction, category, dateFilter, selectedCategories } = useData();
  const {
    theme: { roundness, colors },
  } = useCustomTheme();
  const { t } = useTranslation();

  const aggregatedValues = useMemo(() => {
    let obj: {
      [key: string]: number;
    } = {};

    category.forEach((cat) => {
      obj[cat._id.toHexString()] = 0;
    });

    transaction.forEach((trans) => {
      if (dateFilter.type === "all" || transactionWithinDates(trans.date, dateFilter.startDate, dateFilter.endDate))
        obj[trans.category._id.toHexString()] += trans.amount;
    });
    return obj;
  }, [transaction, category, dateFilter]);

  const pieData = useMemo(() => {
    if (transaction.length === 0 || category.length === 0 || selectedCategories.length === 0) return [];

    return category
      .filter((cat) => selectedCategories.includes(cat._id.toHexString()))
      .map((cat) => ({
        _id: cat._id.toHexString(),
        name: cat.title,
        title: cat.title,
        icon: cat.icon,
        type: cat.type as "income" | "expense" | "transfer",
        color: cat.color,
        amount: aggregatedValues[cat._id.toHexString()],
      }));
  }, [transaction, category, selectedCategories, aggregatedValues]);
  return (
    <ScrollView contentContainerStyle={styles.scrollview}>
      {(selectedCategories.length === 0 || category.length === 0 || transaction.length === 0) && (
        <NoChartSVG message="No data to display" />
      )}
      {
        <Pie
          data={pieData.filter((cat) => cat.type === "expense").sort((a, b) => (a.amount > b.amount ? -1 : 1))}
          title={t("screens.tracker.charts.expensePieChart")}
        />
      }
      <Pie
        data={pieData.filter((cat) => cat.type === "income").sort((a, b) => (a.amount > b.amount ? -1 : 1))}
        title={t("screens.tracker.charts.incomePieChart")}
      />
      <Pie
        data={pieData.filter((cat) => cat.type === "transfer").sort((a, b) => (a.amount > b.amount ? -1 : 1))}
        title={t("screens.tracker.charts.transferPieChart")}
      />

      {pieData.map((cat) => (
        <CategoryChartsItem key={cat._id} {...cat} style={[styles.category, { borderRadius: roundness * 4 }]} />
      ))}
    </ScrollView>
  );
};

export default Charts;

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    margin: 4,
  },
  scrollview: {
    padding: 8,
  },
  category: {
    marginVertical: 4,
  },
});
