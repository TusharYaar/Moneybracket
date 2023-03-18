import { View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { useData } from "../../providers/DataProvider";
import NoChartSVG from "../../components/NoChartSVG";

const Charts = () => {
  const { category } = useData();

  if (category.length === 0) return <NoChartSVG message="No data to display" />;
  return (
    <View>
      <Text>Coming Soon</Text>
    </View>
  );
};

export default Charts;
