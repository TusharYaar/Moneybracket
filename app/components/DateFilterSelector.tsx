import {StyleSheet, View} from "react-native";
import React, {useMemo} from "react";
import {useCustomTheme} from "../themes";

import {TouchableRipple, Paragraph} from "react-native-paper";
import {useData} from "../providers/DataProvider";
import {format} from "date-fns";

type Props = {
  onPress: () => void;
};

const DateFilterSelector = ({onPress}: Props) => {
  const {
    theme: {colors, fonts},
  } = useCustomTheme();

  const {dateFilter} = useData();

  const text = useMemo(() => {
    switch (dateFilter.type) {
      case "today":
      case "yesterday":
        return format(dateFilter.startDate, "dd MMMM, yy");
      case "thisWeek":
      case "lastWeek":
      case "thisMonth":
      case "lastMonth":
      case "thisYear":
      case "last3Months":
      case "last6Months":
        return `${format(dateFilter.startDate, "dd MMM, yy")} - ${format(
          dateFilter.endDate,
          "dd MMM, yy",
        )}`;
      case "all":
      default:
        return "All Time";
    }
  }, [dateFilter]);

  return (
    <TouchableRipple
      style={{backgroundColor: colors.surface}}
      onPress={onPress}
    >
      <Paragraph style={[styles.align, fonts.medium]}>{text}</Paragraph>
    </TouchableRipple>
  );
};

export default DateFilterSelector;

const styles = StyleSheet.create({
  align: {
    textAlign: "center",
  },
});
