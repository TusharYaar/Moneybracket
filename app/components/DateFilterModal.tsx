import {StyleSheet, View} from "react-native";
import React, {useCallback, useState} from "react";
import {
  Button,
  Caption,
  Divider,
  IconButton,
  Modal,
  Portal,
} from "react-native-paper";
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
  format,
  startOfDay,
  compareAsc,
} from "date-fns/esm";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {useSettings} from "../providers/SettingsProvider";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

const DateFilterModal = ({visible, onDismiss}: Props) => {
  const {theme} = useCustomTheme();
  const {updateDateFilter, dateFilter} = useData();
  const [modalTypeVisible, setModalTypeVisible] = useState("options");

  const {dateFormat} = useSettings();

  const [customPeriod, setCustomPeriod] = useState({
    start: new Date(),
    end: new Date(),
    changed: false,
  });

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

  const handleCustomFilter = useCallback((start: Date, end: Date) => {
    if (compareAsc(start, end) === 1) {
      updateDateFilter("custom", startOfDay(end), endOfDay(start));
    } else updateDateFilter("custom", start, end);
    onDismiss();
  }, []);

  const updateDate = useCallback((date: DateTimePickerEvent, type: string) => {
    if (date.nativeEvent.timestamp) {
      if (type === "endDate") {
        setCustomPeriod(prev => ({
          ...prev,
          changed: true,
          end: endOfDay(new Date(date.nativeEvent.timestamp as number)),
        }));
      } else
        setCustomPeriod(prev => ({
          ...prev,
          changed: true,
          start: startOfDay(new Date(date.nativeEvent.timestamp as number)),
        }));
      setModalTypeVisible("options");
    }
  }, []);

  const swapCustomPeriodDates = useCallback(() => {
    setCustomPeriod(prev => ({...prev, start: prev.end, end: prev.start}));
  }, []);

  if (modalTypeVisible !== "options") {
    return (
      <DateTimePicker
        mode="date"
        value={
          modalTypeVisible === "endDate" ? customPeriod.end : customPeriod.start
        }
        testID="dateTimePicker"
        onChange={date => updateDate(date, modalTypeVisible)}
      />
    );
  } else
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
              mode={dateFilter.type === "today" ? "contained" : "text"}
              style={styles.btn}
              onPress={() => handleChangeFilter("today")}
            >
              Today
            </Button>
            <Button
              mode={dateFilter.type === "yesterday" ? "contained" : "text"}
              style={styles.btn}
              onPress={() => handleChangeFilter("yesterday")}
            >
              yesterday
            </Button>
            <Button
              mode={dateFilter.type === "thisWeek" ? "contained" : "text"}
              style={styles.btn}
              onPress={() => handleChangeFilter("thisWeek")}
            >
              This Week
            </Button>
            <Button
              mode={dateFilter.type === "lastWeek" ? "contained" : "text"}
              style={styles.btn}
              onPress={() => handleChangeFilter("lastWeek")}
            >
              Last Week
            </Button>
            <Button
              mode={dateFilter.type === "thisMonth" ? "contained" : "text"}
              style={styles.btn}
              onPress={() => handleChangeFilter("thisMonth")}
            >
              This Month
            </Button>
            <Button
              mode={dateFilter.type === "lastMonth" ? "contained" : "text"}
              style={styles.btn}
              onPress={() => handleChangeFilter("lastMonth")}
            >
              Last Month
            </Button>
            <Button
              mode={dateFilter.type === "thisYear" ? "contained" : "text"}
              style={styles.btn}
              onPress={() => handleChangeFilter("thisYear")}
            >
              This Year
            </Button>
            <Button
              mode={dateFilter.type === "last3Months" ? "contained" : "text"}
              style={styles.btn}
              onPress={() => handleChangeFilter("last3Months")}
            >
              Last 3 Months
            </Button>
            <Button
              mode={dateFilter.type === "last6Months" ? "contained" : "text"}
              style={styles.btn}
              onPress={() => handleChangeFilter("last6Months")}
            >
              Last 6 Months
            </Button>
            <Button
              mode={dateFilter.type === "all" ? "contained" : "text"}
              style={styles.btn}
              onPress={() => handleChangeFilter("all")}
            >
              All time
            </Button>
            <View>
              <Caption>Custom</Caption>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={styles.customPeriodBtnContainer}>
                  <Button onPress={() => setModalTypeVisible("startDate")}>
                    {customPeriod.changed
                      ? format(customPeriod.start, dateFormat)
                      : "Start Date"}
                  </Button>
                  <IconButton
                    icon="swap-horizontal"
                    onPress={swapCustomPeriodDates}
                    size={16}
                    color={theme.colors.primary}
                  />
                  <Button onPress={() => setModalTypeVisible("endDate")}>
                    {customPeriod.changed
                      ? format(customPeriod.end, dateFormat)
                      : "End Date"}
                  </Button>
                  {customPeriod.changed && (
                    <IconButton
                      onPress={() =>
                        handleCustomFilter(customPeriod.start, customPeriod.end)
                      }
                      size={16}
                      color={theme.colors.primary}
                      icon="checkmark"
                    />
                  )}
                </View>
              </View>
            </View>
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
  customPeriodBtnContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
});
