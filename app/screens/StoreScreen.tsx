import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Purchases, { PurchasesOfferings } from "react-native-purchases";
import { Text } from "react-native-paper";
const StoreScreen = () => {
  const [canMakePayments, setCanMakePayments] = useState(false);
  const [offerings, setOfferings] = useState<PurchasesOfferings>();

  useEffect(() => {
    async function f() {
      try {
        const can = await Purchases.canMakePayments();
        setCanMakePayments(can);
        if (can) {
          const offerings = await Purchases.getOfferings();
          setOfferings(offerings);
          console.log(JSON.stringify(offerings, null, 4));
          // console.log(products);
          console.log(offerings.current.monthly);
        }
        // Purchases.purchasePackage(offerings.current.monthly);
      } catch (e) {
        console.log(JSON.stringify(e, null, 4));
      }
    }
    f();
  }, []);
  return (
    <ScrollView>
      <Text>{JSON.stringify(offerings)}</Text>
    </ScrollView>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({});
