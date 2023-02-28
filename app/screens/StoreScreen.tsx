import { ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Purchases, { PurchasesPackage } from "react-native-purchases";
import { Button, Text } from "react-native-paper";
import Products from "../components/Products";
// import { useFont } from "../providers/FontProvider";
import { useCustomTheme } from "../themes";
import { useSettings } from "../providers/SettingsProvider";
const StoreScreen = () => {
  // const { checkFontSubscription } = useFont();
  // const { checkThemeSubscription } = useCustomTheme();

  const [offerings, setOfferings] = useState<PurchasesPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const { refreshUnlockedItems } = useSettings();

  useEffect(() => {
    async function f() {
      try {
        const offerings = await Purchases.getOfferings();
        setOfferings(offerings.current.availablePackages);
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
    } catch (e) {
      console.log("error", e);
    } finally {
      refreshUnlockedItems();
    }
  };

  const handleRestorePurchases = useCallback(async () => {
    try {
      setLoading(true);
      const info = await Purchases.restorePurchases();
      console.log(info);
    } catch (e) {
      console.log(e);
    } finally {
      refreshUnlockedItems();
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
