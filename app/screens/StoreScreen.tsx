import { ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Purchases, { PurchasesPackage } from "react-native-purchases";
import { Button, Text } from "react-native-paper";
import Products from "../components/Products";
import { useFont } from "../providers/FontProvider";
const StoreScreen = () => {
  const { checkFontSubscription } = useFont();

  const [canMakePayments, setCanMakePayments] = useState(false);
  const [offerings, setOfferings] = useState<PurchasesPackage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function f() {
      try {
        const can = await Purchases.canMakePayments();
        setCanMakePayments(can);
        if (can) {
          const offerings = await Purchases.getOfferings();
          setOfferings(offerings.current.availablePackages);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    f();
  }, []);

  const handlePurchase = async (product: PurchasesPackage) => {
    try {
      await Purchases.purchasePackage(product);
      checkFontSubscription();
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleRestorePurchases = useCallback(async () => {
    try {
      setLoading(true);
      const info = await Purchases.restorePurchases();
      console.log(info);
      checkFontSubscription();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ScrollView>
      {offerings.map((product) => (
        <Products product={product} key={product.identifier} onPress={() => handlePurchase(product)} />
      ))}
      <Button onPress={handleRestorePurchases} disabled={loading}>
        Restore Purchases
      </Button>
    </ScrollView>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({});
