import {StyleSheet, View} from "react-native";
import React, {useCallback} from "react";
import {Button, Modal, Portal} from "react-native-paper";
import {useCustomTheme} from "../themes";
import {useData} from "../providers/DataProvider";
import {
  endOfDay,
  endOfMonth,
  endOfToday,
  endOfYear,
  endOfYesterday,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
  startOfYesterday,
  sub,
  endOfWeek,
} from "date-fns/esm";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

const DateFilterModal = ({visible, onDismiss}: Props) => {
  const {theme} = useCustomTheme();
  const {updateDateFilter, dateFilter} = useData();

  const handleChangeFilter = useCallback(
    (type: string) => {
      let today = new Date();
      switch (type) {
        case "today":
          updateDateFilter("today", startOfToday(), endOfToday());
          break;
        case "yesterday":
          updateDateFilter("yesterday", startOfYesterday(), endOfYesterday());
          break;
        case "thisWeek":
          updateDateFilter("thisWeek", startOfWeek(today), endOfWeek(today));
          break;
        case "lastWeek":
          let week = startOfWeek(new Date());
          updateDateFilter(
            "lastWeek",
            sub(week, {days: 7}),
            endOfDay(sub(week, {days: 1})),
          );
          break;
        case "thisMonth":
          updateDateFilter("thisMonth", startOfMonth(today), endOfMonth(today));
          break;

        case "lastMonth":
          let lm = sub(startOfMonth(today), {days: 2});
          updateDateFilter("lastMonth", startOfMonth(lm), endOfMonth(lm));
          break;
        case "thisYear":
          updateDateFilter("thisYear", startOfYear(today), endOfYear(today));
          break;

        case "last3Months":
          updateDateFilter(
            "last3Months",
            sub(startOfMonth(today), {months: 2}),
            endOfMonth(today),
          );
          break;

        case "last6Months":
          updateDateFilter(
            "last6Months",
            sub(startOfMonth(today), {months: 5}),
            endOfMonth(today),
          );
          break;

        case "all":
        default:
          updateDateFilter("all", new Date(), new Date());
      }
      onDismiss();
    },
    [updateDateFilter],
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalContainerStyle,
          {backgroundColor: theme.colors.background},
        ]}
        style={styles.modal}
      >
        <View style={styles.btnContainer}>
          <Button
            mode={dateFilter.type === "today" ? "contained" : "outlined"}
            style={styles.btn}
            onPress={() => handleChangeFilter("today")}
          >
            Today
          </Button>
          <Button
            mode={dateFilter.type === "yesterday" ? "contained" : "outlined"}
            style={styles.btn}
            onPress={() => handleChangeFilter("yesterday")}
          >
            yesterday
          </Button>
          <Button
            mode={dateFilter.type === "thisWeek" ? "contained" : "outlined"}
            style={styles.btn}
            onPress={() => handleChangeFilter("thisWeek")}
          >
            This Week
          </Button>
          <Button
            mode={dateFilter.type === "lastWeek" ? "contained" : "outlined"}
            style={styles.btn}
            onPress={() => handleChangeFilter("lastWeek")}
          >
            Last Week
          </Button>
          <Button
            mode={dateFilter.type === "thisMonth" ? "contained" : "outlined"}
            style={styles.btn}
            onPress={() => handleChangeFilter("thisMonth")}
          >
            This Month
          </Button>
          <Button
            mode={dateFilter.type === "lastMonth" ? "contained" : "outlined"}
            style={styles.btn}
            onPress={() => handleChangeFilter("lastMonth")}
          >
            Last Month
          </Button>
          <Button
            mode={dateFilter.type === "thisYear" ? "contained" : "outlined"}
            style={styles.btn}
            onPress={() => handleChangeFilter("thisYear")}
          >
            This Year
          </Button>
          <Button
            mode={dateFilter.type === "last3Months" ? "contained" : "outlined"}
            style={styles.btn}
            onPress={() => handleChangeFilter("last3Months")}
          >
            Last 3 Months
          </Button>
          <Button
            mode={dateFilter.type === "last6Months" ? "contained" : "outlined"}
            style={styles.btn}
            onPress={() => handleChangeFilter("last6Months")}
          >
            Last 6 Months
          </Button>
          <Button
            mode={dateFilter.type === "all" ? "contained" : "outlined"}
            style={styles.btn}
            onPress={() => handleChangeFilter("all")}
          >
            All time
          </Button>
          <Button>Custom</Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default DateFilterModal;
const styles = StyleSheet.create({
  modal: {
    borderRadius: 7,
  },
  modalContainerStyle: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 7,
  },
  btnContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-between",
  },
  btn: {
    width: "50%",
  },
});
