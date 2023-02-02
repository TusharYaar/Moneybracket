import { StyleSheet, View } from "react-native";
import React from "react";
import { TouchableRipple, Text } from "react-native-paper";
import { format } from "date-fns";

const DateFormatItem = ({ date, onPress }: { date: string; onPress: () => void }) => {
  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.item}>
        <Text variant="labelLarge">{date}</Text>
        <Text variant="labelSmall">Eg. {format(new Date(), date)}</Text>
      </View>
    </TouchableRipple>
  );
};

export default DateFormatItem;

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
