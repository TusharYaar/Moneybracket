import {StyleSheet} from "react-native";
import React, {useMemo} from "react";

import {TouchableRipple, Text} from "react-native-paper";
import {useData} from "../providers/DataProvider";
import {format} from "date-fns";
import {useSettings} from "../providers/SettingsProvider";

type Props = {
  onPress: () => void;
};

const DateFilterSelector = ({onPress}: Props) => {
  const {dateFormat} = useSettings();

  const {dateFilter} = useData();

  const text = useMemo(() => {
    switch (dateFilter.type) {
      case "today":
      case "yesterday":
        return format(dateFilter.startDate, dateFormat);
      case "thisWeek":
      case "lastWeek":
      case "thisMonth":
      case "lastMonth":
      case "thisYear":
      case "last3Months":
      case "last6Months":
      case "custom":
        return `${format(dateFilter.startDate, dateFormat)} - ${format(
          dateFilter.endDate,
          dateFormat,
        )}`;
      case "all":
      default:
        return "All Time";
    }
  }, [dateFilter]);

  return (
    <TouchableRipple onPress={onPress}>
      <Text style={[styles.align]} variant="labelSmall">
        {text}
      </Text>
    </TouchableRipple>
  );
};

export default DateFilterSelector;

const styles = StyleSheet.create({
  align: {
    margin: 4,
    textAlign: "center",
  },
});
