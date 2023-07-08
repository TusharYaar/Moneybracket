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
  const { transaction, category, dateFilter } = useData();
  const [selected, setSelected] = useState([]);
  const {
    theme: { roundness, colors },
  } = useCustomTheme();
  const { t } = useTranslation();

  useEffect(() => {
    setSelected(category.map((cat) => cat._id.toHexString()));
  }, [category]);

  const updateSelectedCategory = useCallback((cat: Category) => {
    let id = cat._id.toHexString();
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((_cat) => _cat !== id);
      else return [...prev, id];
    });
  }, []);

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
    if (transaction.length === 0 || category.length === 0 || selected.length === 0) return [];

    return category
      .filter((cat) => selected.includes(cat._id.toHexString()))
      .map((cat) => ({
        _id: cat._id.toHexString(),
        name: cat.title,
        title: cat.title,
        icon: cat.icon,
        type: cat.type as "income" | "expense" | "transfer",
        color: cat.color,
        amount: aggregatedValues[cat._id.toHexString()],
      }));
  }, [transaction, category, selected, aggregatedValues]);
  return (
    <>
      <List.Section style={{ padding: 0, margin: 0 }}>
        <List.Accordion
          title={t("screens.tracker.charts.categorySelected", { count: selected.length })}
          style={{ padding: 0, margin: 0 }}
          right={({ isExpanded }) => (
            <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color={colors.text} />
          )}
        >
          <View style={styles.chipContainer}>
            {category.map((cat) => (
              <CategoryChip
                category={cat}
                key={cat._id.toHexString()}
                onPress={updateSelectedCategory}
                selected={selected.includes(cat._id.toHexString())}
                style={styles.chip}
              />
            ))}
          </View>
        </List.Accordion>
      </List.Section>
      <ScrollView contentContainerStyle={styles.scrollview}>
        {(selected.length === 0 || category.length === 0 || transaction.length === 0) && (
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
    </>
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
