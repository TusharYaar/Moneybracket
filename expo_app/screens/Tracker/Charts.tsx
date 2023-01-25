import { ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { useData } from "../../providers/DataProvider";
import { ContributionGraph } from "react-native-chart-kit";

import { Dimensions } from "react-native";
import { List } from "react-native-paper";

import Icon from "react-native-vector-icons/Ionicons";

import CategoryChip from "../../components/CategoryChip";
import { Category } from "../../realm/Category";
// import {useTranslation} from "react-i18next";
import CategoryChartsItem from "../../components/CategoryChartsItem";
import { groupTransactionByDate } from "../../utils/transaction";
import { endOfMonth, startOfMonth } from "date-fns";
import {} from "date-fns/esm";
import Pie from "../../components/Chats/Pie";

const Charts = () => {
  const { transaction, category } = useData();
  const [selected, setSelected] = useState(category.map((cat) => cat._id.toHexString()));

  // const {t} = useTranslation();

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
      obj[trans.category._id.toHexString()] += trans.amount;
    });
    return obj;
  }, [transaction, category]);

  const pieData = useMemo(() => {
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

  const contributionData = useMemo(() => {
    const date = new Date();
    const grouped = groupTransactionByDate(transaction, startOfMonth(date), endOfMonth(date), "yyyy-MM-dd");

    return grouped.map((cat) => ({
      date: cat.date,
      count: cat.transactions.length,
    }));
  }, []);

  return (
    <>
      <List.Section style={{ padding: 0, margin: 0 }}>
        <List.Accordion
          title={"screens.tracker.charts.categorySelected"}
          style={{ padding: 0, margin: 0 }}
          right={({ isExpanded }) => <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={20} />}
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
        <Pie
          data={pieData.filter((cat) => cat.type === "expense").sort((a, b) => (a.amount > b.amount ? -1 : 1))}
          title="Expenses Pie Chart"
        />
        <Pie
          data={pieData.filter((cat) => cat.type === "income").sort((a, b) => (a.amount > b.amount ? -1 : 1))}
          title="Income Pie Chart"
        />
        <Pie
          data={pieData.filter((cat) => cat.type === "transfer").sort((a, b) => (a.amount > b.amount ? -1 : 1))}
          title="Transfer Pie Chart"
        />

        {pieData.map((cat) => (
          <CategoryChartsItem key={cat._id} {...cat} style={styles.category} />
        ))}
        {/* <ContributionGraph
          values={contributionData}
          endDate={endOfMonth(new Date())}
          numDays={30}
          horizontal={false}
          showMonthLabels={false}
          width={Dimensions.get("window").width - 20}
          style={{padding: 0, margin: 0}}
          squareSize={(Dimensions.get("window").width - 120) / 7}
          height={250}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          tooltipDataAttrs={value => null as any}
        /> */}
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
    margin: 3,
  },
  scrollview: {
    padding: 10,
  },
  category: {
    marginVertical: 5,
    paddingHorizontal: 5,
  },
});
