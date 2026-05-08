import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { LineChart, BarChart, PieChart } from "./index";
import type { LineChartDataPoint, BarChartDataPoint, PieChartDataPoint } from "./index";

/**
 * Example component showcasing all chart types with different configurations
 * This file demonstrates various use cases and customization options
 */
const ChartExamples: React.FC = () => {
  // Sample data for LineChart
  const lineData: LineChartDataPoint[] = [
    { x: 1, y: 100 },
    { x: 2, y: 150 },
    { x: 3, y: 120 },
    { x: 4, y: 180 },
    { x: 5, y: 200 },
    { x: 6, y: 170 },
    { x: 7, y: 220 },
  ];

  // Sample data for BarChart (Vertical)
  const barDataVertical: BarChartDataPoint[] = [
    { label: "Jan", value: 100 },
    { label: "Feb", value: 150 },
    { label: "Mar", value: 120 },
    { label: "Apr", value: 180 },
    { label: "May", value: 200 },
  ];

  // Sample data for BarChart (Horizontal with colors)
  const barDataHorizontal: BarChartDataPoint[] = [
    { label: "Food", value: 300, color: "#3b82f6" },
    { label: "Transport", value: 150, color: "#10b981" },
    { label: "Shopping", value: 200, color: "#f59e0b" },
    { label: "Bills", value: 250, color: "#ef4444" },
    { label: "Entertainment", value: 180, color: "#8b5cf6" },
  ];

  // Sample data for PieChart
  const pieData: PieChartDataPoint[] = [
    { label: "Food", value: 300, color: "#3b82f6" },
    { label: "Transport", value: 150, color: "#10b981" },
    { label: "Shopping", value: 200, color: "#f59e0b" },
    { label: "Bills", value: 250, color: "#ef4444" },
    { label: "Entertainment", value: 180, color: "#8b5cf6" },
  ];

  // Sample data for Donut Chart
  const donutData: PieChartDataPoint[] = [
    { label: "Savings", value: 5000 },
    { label: "Expenses", value: 3500 },
    { label: "Investments", value: 1500 },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Line Chart - Curved with Gradient */}
      <View style={styles.chartSection}>
        <Text style={styles.title}>Line Chart - Curved with Gradient</Text>
        <LineChart
          data={lineData}
          width={350}
          height={250}
          strokeColor="#3b82f6"
          strokeWidth={3}
          fillColor="#3b82f6"
          showGradient={true}
          showPoints={true}
          pointRadius={5}
          pointColor="#3b82f6"
          curved={true}
          showGrid={true}
          showLabels={true}
        />
      </View>

      {/* Line Chart - Straight Lines */}
      <View style={styles.chartSection}>
        <Text style={styles.title}>Line Chart - Straight Lines</Text>
        <LineChart
          data={lineData}
          width={350}
          height={250}
          strokeColor="#10b981"
          strokeWidth={2}
          fillColor="#10b981"
          showGradient={true}
          showPoints={false}
          curved={false}
          showGrid={true}
          showLabels={true}
        />
      </View>

      {/* Bar Chart - Vertical */}
      <View style={styles.chartSection}>
        <Text style={styles.title}>Bar Chart - Vertical</Text>
        <BarChart
          data={barDataVertical}
          width={350}
          height={250}
          barColor="#3b82f6"
          showGradient={true}
          showValues={true}
          horizontal={false}
          barRadius={8}
          showGrid={true}
          showLabels={true}
        />
      </View>

      {/* Bar Chart - Horizontal with Individual Colors */}
      <View style={styles.chartSection}>
        <Text style={styles.title}>Bar Chart - Horizontal (Colored)</Text>
        <BarChart
          data={barDataHorizontal}
          width={350}
          height={300}
          showGradient={true}
          showValues={true}
          horizontal={true}
          barRadius={6}
          showGrid={true}
          showLabels={true}
          paddingLeft={80}
        />
      </View>

      {/* Pie Chart */}
      <View style={styles.chartSection}>
        <Text style={styles.title}>Pie Chart with Legend</Text>
        <PieChart
          data={pieData}
          width={600}
          height={600}
          innerRadius={0}
          showGradient={true}
          showLegend={true}
          showPercentage={true}
          legendPosition="right"
          showValues={true}
        />
      </View>

      {/* Donut Chart */}
      <View style={styles.chartSection}>
        <Text style={styles.title}>Donut Chart</Text>
        <PieChart
          data={donutData}
          width={600}
          height={600}
          innerRadius={100}
          showGradient={true}
          showLegend={true}
          showPercentage={true}
          legendPosition="bottom"
          showValues={true}
        />
      </View>

      {/* Minimal Line Chart */}
      <View style={styles.chartSection}>
        <Text style={styles.title}>Minimal Line Chart</Text>
        <LineChart
          data={lineData}
          width={350}
          height={200}
          strokeColor="#8b5cf6"
          strokeWidth={2}
          showGradient={false}
          showPoints={false}
          curved={true}
          showGrid={false}
          showLabels={false}
          backgroundColor="#f9fafb"
        />
      </View>

      {/* Minimal Bar Chart */}
      <View style={styles.chartSection}>
        <Text style={styles.title}>Minimal Bar Chart</Text>
        <BarChart
          data={barDataVertical}
          width={350}
          height={200}
          barColor="#ec4899"
          showGradient={false}
          showValues={false}
          horizontal={false}
          barRadius={4}
          showGrid={false}
          showLabels={false}
          backgroundColor="#f9fafb"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    padding: 16,
    alignItems: "center",
  },
  chartSection: {
    marginBottom: 40,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1f2937",
  },
});

export default ChartExamples;
