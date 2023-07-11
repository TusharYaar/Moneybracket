import React from "react";
import { createMaterialTopTabNavigator, MaterialTopTabBar } from "@react-navigation/material-top-tabs";
import AllTransaction from "../screens/Tracker/AllTransaction";
import TrackerCharts from "../screens/Tracker/Charts";
import CategoryCharts from "../screens/Category/Charts";
import AllCategory from "../screens/Category/AllCategory";
import { FAB, IconButton } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { StackParamList } from "./StackNavigators";
import { StyleSheet, View } from "react-native";
import { useData } from "../providers/DataProvider";
import { useCustomTheme } from "../providers/ThemeProvider";

import DateFilterSelector from "../components/DateFilterSelector";
import { useTranslation } from "react-i18next";

export type TabParamList = {
  AllTransactionScreen: undefined;
  TrackerChartScreen: undefined;
  AllCategoryScreen: undefined;
  CategoryChartScreen: undefined;
  AllAccountScreen: undefined;
  AccountChartScreen: undefined;
  FilterBtn: undefined;
};
const Tab = createMaterialTopTabNavigator<TabParamList>();

type TrackerTabProps = NativeStackScreenProps<StackParamList, "TrackerTab">;

export const TrackerTabNavigator = ({ navigation }: TrackerTabProps) => {
  const { showAddTransactionModal, showDateFilterModal, showCategoryFilterModal, selectedCategory, category } =
    useData();
  const { theme } = useCustomTheme();
  const { t } = useTranslation("", { keyPrefix: "navigator.tab" });
  return (
    <>
      <DateFilterSelector onPress={showDateFilterModal} />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: theme.fonts.titleSmall,
        }}
        tabBar={(props) => (
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "90%" }}>
              <MaterialTopTabBar {...props} />
            </View>
            <IconButton
              icon={category.length === selectedCategory.length ? "funnel-outline" : "funnel"}
              onPress={showCategoryFilterModal}
              style={{ borderRadius: theme.roundness * 4 }}
            />
          </View>
        )}
      >
        <Tab.Screen name="AllTransactionScreen" options={{ title: t("allTransaction") }}>
          {(props) => (
            <>
              <AllTransaction {...props} stackNavigation={navigation} />
              <FAB style={styles.fab} icon="add" onPress={() => showAddTransactionModal()} />
            </>
          )}
        </Tab.Screen>
        <Tab.Screen options={{ title: t("charts") }} name="TrackerChartScreen" component={TrackerCharts} />
      </Tab.Navigator>
    </>
  );
};

type CategoryTabProps = NativeStackScreenProps<StackParamList, "CategoryTab">;
export const CategoryTabNavigator = ({}: CategoryTabProps) => {
  const { showAddCategoryModal } = useData();
  const { theme } = useCustomTheme();
  const { t } = useTranslation("", { keyPrefix: "navigator.tab" });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: theme.fonts.titleSmall,
      }}
    >
      <Tab.Screen name="AllCategoryScreen" options={{ title: t("category") }}>
        {(props) => (
          <>
            <AllCategory {...props} />
            <FAB style={styles.fab} icon="add" onPress={() => showAddCategoryModal()} />
          </>
        )}
      </Tab.Screen>
      <Tab.Screen name="CategoryChartScreen" component={CategoryCharts} options={{ title: t("charts") }} />
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
