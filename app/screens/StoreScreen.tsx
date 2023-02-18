import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Purchases, { PurchasesOfferings } from "react-native-purchases";
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
        }
        // const products = Purchases.length;
        // console.log(offerings.current.monthly);
        // Purchases.purchasePackage(offerings.current.monthly);
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    }
    f();
  }, []);
  return (
    <View>
      <Text>StoreScreen</Text>
      <Text>Can Make Payments: {canMakePayments ? "Yes" : "No"}</Text>
      <Text>{JSON.stringify(offerings)}</Text>
    </View>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({});
