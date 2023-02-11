import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Purchases from "react-native-purchases";
const StoreScreen = () => {
  useEffect(() => {
    async function f() {
      try {
        console.log(await Purchases.canMakePayments());
      } catch (e) {
        console.log(e);
      }
    }
    f();
  }, []);
  return (
    <View>
      <Text>StoreScreen</Text>
    </View>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({});
