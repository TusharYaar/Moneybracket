import React from "react";
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
import {useData} from "../providers/DataProvider";
import {useCustomTheme} from "../themes";
import DateFilterSelector from "../components/DateFilterSelector";

export type TabParamList = {
  AllTransactionScreen: undefined;
  TrackerChartScreen: undefined;
  RatesScreen: undefined;
  ConversionScreen: undefined;
  AllCategoryScreen: undefined;
  CategoryChartScreen: undefined;
  AllAccountScreen: undefined;
  AccountChartScreen: undefined;
};
const Tab = createMaterialTopTabNavigator<TabParamList>();
export const TrackerTabNavigator = () => {
  const {showAddTransactionModal, showDateFilterModal} = useData();
  const {theme} = useCustomTheme();
  return (
    <>
      <DateFilterSelector onPress={showDateFilterModal} />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: theme.fonts.regular,
        }}
      >
        <Tab.Screen
          name="AllTransactionScreen"
          options={{title: "transactions"}}
        >
          {props => (
            <>
              <AllTransaction {...props} />
              <FAB
                style={styles.fab}
                icon="add"
                onPress={() => showAddTransactionModal()}
              />
            </>
          )}
        </Tab.Screen>
        <Tab.Screen
          options={{title: "charts"}}
          name="TrackerChartScreen"
          component={TrackerCharts}
        />
      </Tab.Navigator>
    </>
  );
};

export const ExchangeTabNavigator = () => {
  const {theme} = useCustomTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: theme.fonts.regular,
      }}
    >
      <Tab.Screen name="RatesScreen" component={Rates} />
      <Tab.Screen name="ConversionScreen" component={Conversion} />
    </Tab.Navigator>
  );
};

type CategoryTabProps = NativeStackScreenProps<StackParamList, "CategoryTab">;
export const CategoryTabNavigator = ({}: CategoryTabProps) => {
  const {showAddCategoryModal} = useData();
  const {theme} = useCustomTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: theme.fonts.regular,
      }}
    >
      <Tab.Screen name="AllCategoryScreen">
        {props => (
          <>
            <AllCategory {...props} />
            <FAB
              style={styles.fab}
              icon="add"
              onPress={() => showAddCategoryModal()}
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
