import { ScrollView, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { useData } from "../../providers/DataProvider";

import CategoryChartsItem from "../../components/CategoryChartsItem";
import Pie from "../../components/Charts/Pie";
import { useCustomTheme } from "../../providers/ThemeProvider";
import { transactionWithinDates } from "../../utils/transaction";
import { useTranslation } from "react-i18next";
import NoChartSVG from "../../components/SVGs/NoChartSVG";

const Charts = () => {
  const { transaction, category, dateFilter, selectedCategory } = useData();
  const {
    theme: { roundness },
  } = useCustomTheme();
  const { t } = useTranslation("", {
    keyPrefix: "screens.tracker.charts",
  });

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
    if (transaction.length === 0 || category.length === 0 || selectedCategory.length === 0) return [];

    return category
      .filter((cat) => selectedCategory.includes(cat._id.toHexString()))
      .map((cat) => ({
        _id: cat._id.toHexString(),
        title: cat.title,
        icon: cat.icon,
        type: cat.type as "income" | "expense" | "transfer",
        color: cat.color,
        amount: aggregatedValues[cat._id.toHexString()],
      }));
  }, [transaction, category, selectedCategory, aggregatedValues]);
  return (
    <ScrollView contentContainerStyle={styles.scrollview}>
      {(selectedCategory.length === 0 || category.length === 0 || transaction.length === 0) && (
        <NoChartSVG message={t("noCharts")} />
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
