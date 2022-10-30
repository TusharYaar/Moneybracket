import React from "react";
// import {Calendar} from "react-native-calendars";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Conversion from "../screens/Exchange/Conversion";
import Rates from "../screens/Exchange/Rates";
import AllTransaction from "../screens/Tracker/AllTransaction";
import Charts from "../screens/Tracker/Charts";

const Tab = createMaterialTopTabNavigator();

export const TrackerTabNavigator = () => {
  return (
    <>
      {/* <Calendar /> */}
      <Tab.Navigator>
        <Tab.Screen name="AllTransactionScreen" component={AllTransaction} />
        <Tab.Screen name="TrackerChartScreen" component={Charts} />
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

export const CategoryTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AllCategoryScreen" component={Rates} />
      <Tab.Screen name="CategoryChartScreen" component={Conversion} />
    </Tab.Navigator>
  );
};
