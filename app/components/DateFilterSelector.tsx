import {StyleSheet} from "react-native";
import React, {useMemo} from "react";
import {useCustomTheme} from "../themes";

import {TouchableRipple, Paragraph} from "react-native-paper";
import {useData} from "../providers/DataProvider";
import {format} from "date-fns";
import {useSettings} from "../providers/SettingsProvider";

type Props = {
  onPress: () => void;
};

const DateFilterSelector = ({onPress}: Props) => {
  const {
    theme: {colors, fonts},
  } = useCustomTheme();

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
