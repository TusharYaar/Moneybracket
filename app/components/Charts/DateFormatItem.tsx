import { StyleSheet, View } from "react-native";
import React from "react";
import { TouchableRipple, Text } from "react-native-paper";
import { format } from "date-fns";
import { useCustomTheme } from "../../providers/ThemeProvider";

const DateFormatItem = ({ date, onPress, focused }: { date: string; onPress: () => void; focused: boolean }) => {
  const { theme } = useCustomTheme();
  return (
    <TouchableRipple
      onPress={onPress}
      style={{ marginVertical: 4, backgroundColor: focused ? theme.colors.primaryContainer : null }}
    >
      <View style={styles.item}>
        <Text variant="titleMedium">{date}</Text>
        <Text variant="bodyMedium">Eg. {format(new Date(), date)}</Text>
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
