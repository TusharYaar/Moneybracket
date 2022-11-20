import {StyleSheet, Text, View} from "react-native";
import React, {useCallback} from "react";
import {Button, Modal, Portal} from "react-native-paper";
import {useCustomTheme} from "../themes";
import {useData} from "../providers/DataProvider";
import {
  endOfToday,
  endOfYesterday,
  startOfToday,
  startOfWeek,
  startOfYesterday,
} from "date-fns";
import {endOfWeek} from "date-fns/esm";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

const DateFilterModal = ({visible, onDismiss}: Props) => {
  const {theme} = useCustomTheme();
  const {updateDateFilter} = useData();

  const handleChangeFilter = useCallback(
    (type: string) => {
      switch (type) {
        case "today":
          updateDateFilter("today", startOfToday(), endOfToday());
          break;
        case "yesterday":
          updateDateFilter("yesterday", startOfYesterday(), endOfYesterday());
          break;
        case "thisWeek":
          updateDateFilter(
            "thisWeek",
            startOfWeek(new Date()),
            endOfWeek(new Date()),
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
            mode="contained"
            style={styles.btn}
            onPress={() => handleChangeFilter("today")}
          >
            Today
          </Button>
          <Button
            style={styles.btn}
            onPress={() => handleChangeFilter("yesterday")}
          >
            yesterday
          </Button>
          <Button
            style={styles.btn}
            onPress={() => handleChangeFilter("thisWeek")}
          >
            This Week
          </Button>
          <Button
            style={styles.btn}
            onPress={() => handleChangeFilter("lastWeek")}
          >
            Last Week
          </Button>
          <Button
            style={styles.btn}
            onPress={() => handleChangeFilter("thisMonth")}
          >
            This Month
          </Button>
          <Button
            style={styles.btn}
            onPress={() => handleChangeFilter("lastMonth")}
          >
            Last Month
          </Button>
          <Button
            style={styles.btn}
            onPress={() => handleChangeFilter("thisYear")}
          >
            This Year
          </Button>
          <Button
            style={styles.btn}
            onPress={() => handleChangeFilter("last3Months")}
          >
            Last 3 Months
          </Button>
          <Button
            style={styles.btn}
            onPress={() => handleChangeFilter("last6Months")}
          >
            Last 6 Months
          </Button>
          <Button style={styles.btn} onPress={() => handleChangeFilter("all")}>
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
