import { StyleSheet, Dimensions, ViewStyle, View } from "react-native";
import React, { useMemo } from "react";
import { PieChart } from "react-native-chart-kit";
import { Text, Surface } from "react-native-paper";
import LegendItem from "../LegendItem";
import { useCustomTheme } from "../../providers/ThemeProvider";

type Props = {
  data: any[];
  style?: ViewStyle;
  title?: string;
};

const Pie = ({ data, style, title }: Props) => {
  const {
    theme: { roundness },
  } = useCustomTheme();
  if (data.length < 1) return null;
  const total = useMemo(() => data.reduce((prev, cat) => prev + cat.amount, 0), [data]);
  return (
    <Surface style={[styles.surface, { borderRadius: roundness * 4 }, style]}>
      <PieChart
        hasLegend={false}
        data={data}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        width={Dimensions.get("window").width - 20}
        height={Dimensions.get("window").width - 20}
        paddingLeft={`${(Dimensions.get("window").width - 20) / 4}`}
        accessor="amount"
        backgroundColor="transparent"
      />
      <View style={styles.legend}>
        {title && <Text style={styles.title}>{title}</Text>}
        {data.map((cat) => (
          <LegendItem
            key={cat.title}
            title={cat.title}
            amount={total > 0 ? (cat.amount * 100) / total : 0}
            color={cat.color}
          />
        ))}
      </View>
    </Surface>
  );
};

export default Pie;

const styles = StyleSheet.create({
  surface: {
    elevation: 3,
    marginVertical: 4,
  },
  legend: {
    marginHorizontal: 4,
    marginBottom: 8,
  },
  title: {
    textAlign: "center",
    marginTop: -30,
  },
});
