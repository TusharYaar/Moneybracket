import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { useTheme } from "providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { useHeader } from "providers/HeaderProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useData } from "providers/DataProvider";

// import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
// import GroupItem from "@components/GroupItem";
import CategoryItem from "@components/CategoryItem";
import TransactionPageSummary from "@components/TransactionPageSummary";
import { compareDesc, compareAsc, endOfMonth, startOfMonth, endOfDay, startOfDay } from "date-fns";
// import { Category } from "types";
const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }]
type Params = {

  type: "group" | "category";
}

const PADDING = 8;
const current_date = new Date();


const AboutScreen = () => {
  const { textStyle, colors } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "app.charts" });
  const rootNavigation = useNavigation("/");
  const { headerHeight } = useHeader();
  const { bottom } = useSafeAreaInsets();
  const params = useLocalSearchParams<Params>();
  const { type } = params;
  const { category, group, transaction } = useData();
  const sheetRef = useRef<BottomSheet>(null);
  const { width, height } = useWindowDimensions();
  const [summaryHeight, setSummaryHeight] = useState(110);
  const [selectedCategory, setSelectedCategory] = useState<{ [key: string]: boolean }>({});
  const [selectedGroup, setSelectedGroup] = useState<{ _id: string, title: string, color: string }[]>([]);
  const [dateFilter, setDateFilter] = useState({
    start: startOfMonth(current_date),
    end: endOfMonth(current_date),
  });


  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({
        title: t("title"), headerRightBtn: [
          { icon: "filter", onPress: () => sheetRef.current?.snapToIndex(0), action: "filter" }
        ]
      });
    }, [])
  );

  useEffect(() => {
    if (type === "category")
      setSelectedCategory(category.reduce((prev, val) => { prev[val._id] = true; return prev }, {}))
    // else
    // setSelectedGroup()
  }, [type]);

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />, []);

  const filteredTransaction = useMemo(() => transaction.filter(tr => compareAsc(tr.date, dateFilter.start) > -1 && compareDesc(tr.date, dateFilter.end) > -1), [transaction])

  const categoryData: Record<string, { title: string, color: string, type: string, amount: number }> = useMemo(() => {
    const map = category.reduce((prev, val) => {
      prev[val._id] = {
        title: val.title,
        color: val.color,
        type: val.type,
        amount: 0,
      }
      return prev;
    }, {})

    for (const trans of filteredTransaction) {
      map[trans.category].amount += (trans.amount * 1000)
    }

    return map;

  }, [category, filteredTransaction])


  const barData = useMemo(() => {
    return Object.entries(categoryData).filter(([k, v]) => selectedCategory[k]).map(([k, v]) => ({ value: v.amount, frontColor: v.color }))
  }, [categoryData, selectedCategory, selectedGroup])


  const expenseLineChartData = useMemo(() => {
    return Object.entries(categoryData).filter(([k, v]) => selectedCategory[k] && v.type === "expense").map(([k, v]) => ({ value: v.amount, frontColor: v.color, }))
  }, [categoryData, selectedCategory, selectedGroup])


  const updateDateFilter = useCallback((start: Date, end: Date) => {
    setDateFilter({
      start: startOfDay(start),
      end: endOfDay(end),
    });
  }, [setDateFilter]);

  const chartDimensions = useMemo(() => {

    // Potrait
    if (width < height) {
      return { width: width - PADDING * 2, height: height - summaryHeight - headerHeight - PADDING * 2 }
    } else {
      return { width, height }
    }

  }, [width, height, summaryHeight, headerHeight])
  console.log(chartDimensions)
  return (
    <>
      <TransactionPageSummary
        style={[styles.summaryView, { top: headerHeight }]}
        totalAmount={{
          income: 0,
          expense: 0,
        }}
        date={dateFilter}
        onLayout={(e) => setSummaryHeight(e.nativeEvent.layout.height + 16)}
        updateDate={updateDateFilter} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingBottom: bottom + 8,
          paddingTop: headerHeight + 8 + summaryHeight,
          backgroundColor: colors.screen,
        }}
      ><View style={{backgroundColor: "green" }}>
          {/* <BarChart data={barData} 
          height={chartDimensions.height}
          horizontal
            xAxisThickness={0}
            yAxisThickness={0} 
            /> */}
        </View>
        {/* <LineChart data={expenseLineChartData} width={chartDimensions.height} height={chartDimensions.width} /> */}
        {/* <PieChart data={barData} /> */}
      </ScrollView>
      <BottomSheet
        style={{ backgroundColor: colors.screen }}
        ref={sheetRef}
        snapPoints={["69%", "100%"]}
        enablePanDownToClose
        index={-1}
        backdropComponent={renderBackdrop}
        enableHandlePanningGesture={true}
        enableDynamicSizing={false}
      >
        {type === "category" &&
          <BottomSheetFlatList
            style={{ backgroundColor: colors.screen }}
            contentContainerStyle={{ paddingBottom: bottom + 8, paddingHorizontal: 16 }}
            data={category}
            renderItem={({ item }) =>
              <CategoryItem
                item={item}
                onPress={() => { }}
                style={{ marginVertical: 8 }}
              />
            }
          />
        }
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  summaryView: {
    padding: PADDING,
    position: "absolute",
  },

});


export default AboutScreen;
