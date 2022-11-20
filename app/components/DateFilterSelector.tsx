import {StyleSheet, View} from "react-native";
import React from "react";
import {useCustomTheme} from "../themes";

import {TouchableRipple, Paragraph} from "react-native-paper";
import {useData} from "../providers/DataProvider";
import {format} from "date-fns";

type Props = {
  onPress: () => void;
};

const DateFilterSelector = ({onPress}: Props) => {
  const {
    theme: {colors},
  } = useCustomTheme();

  const {dateFilter} = useData();

  return (
    <TouchableRipple
      style={{backgroundColor: colors.surface}}
      onPress={onPress}
    >
      <View>
        <Paragraph>{dateFilter.type}</Paragraph>
        <Paragraph>
          {format(dateFilter.startDate, "dd MMM yyyy: H:m:s")}
        </Paragraph>
        <Paragraph>{format(dateFilter.endDate, "dd MMM yyyy H:m:s")}</Paragraph>
      </View>
    </TouchableRipple>
  );
};

export default DateFilterSelector;

const styles = StyleSheet.create({});
