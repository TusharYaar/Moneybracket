import React from "react";
// import {Calendar} from "react-native-calendars";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Conversion from "../screens/Exchange/Conversion";
import Rates from "../screens/Exchange/Rates";
import AllTransaction from "../screens/Tracker/AllTransaction";
import TrackerCharts from "../screens/Tracker/Charts";
import CategoryCharts from "../screens/Category/Charts";
import AllCategory from "../screens/Category/AllCategory";
import {FAB} from "react-native-paper";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

import {StackParamList} from "./StackNavigators";
import {StyleSheet} from "react-native";

export type TabParamList = {
  AllTransactionScreen: undefined;
  TrackerChartScreen: undefined;
  RatesScreen: undefined;
  ConversionScreen: undefined;
  AllCategoryScreen: undefined;
  CategoryChartScreen: undefined;
};
const Tab = createMaterialTopTabNavigator<TabParamList>();

export const TrackerTabNavigator = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="AllTransactionScreen" component={AllTransaction} />
        <Tab.Screen name="TrackerChartScreen" component={TrackerCharts} />
      </Tab.Navigator>
    </>
  );
};

export const ExchangeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RatesScreen" component={Rates} />
      <Tab.Screen name="ConversionScreen" component={Conversion} />
    </Tab.Navigator>
  );
};

type CategoryTabProps = NativeStackScreenProps<StackParamList, "CategoryTab">;
export const CategoryTabNavigator = ({navigation}: CategoryTabProps) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AllCategoryScreen">
        {props => (
          <>
            <AllCategory {...props} />
            <FAB
              style={styles.fab}
              icon="plus"
              onPress={() => navigation.navigate("AddCategoryScreen")}
            />
          </>
        )}
      </Tab.Screen>
      <Tab.Screen name="CategoryChartScreen" component={CategoryCharts} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
