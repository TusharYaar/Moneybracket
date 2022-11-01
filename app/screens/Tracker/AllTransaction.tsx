import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { TabParamList } from "../../navigators/TabNavigators";
import { useData } from "../../providers/DataProvider";
import { Paragraph } from "react-native-paper";
type Props = MaterialTopTabScreenProps<TabParamList, "AllTransactionScreen">;

const AllTransaction = ({ }: Props) => {
  const { transaction } = useData();

  console.log(transaction);

  if (transaction.length === 0) {
    return (
      <View style={styles.screen}>
        <Paragraph>No Transaction added</Paragraph>
      </View>
    );
  }

  return (
    <View>
      <Text>AllTransaction</Text>
    </View>
  );
};

export default AllTransaction;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
});
