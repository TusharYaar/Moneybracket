import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PurchasesPackage } from "react-native-purchases";
import { TouchableRipple } from "react-native-paper";

const Products = ({ product, onPress }: { product: PurchasesPackage; onPress: () => void }) => {
  return (
    <TouchableRipple onPress={onPress}>
      <View style={{ margin: 8 }}>
        <Text>{product.product.title.replaceAll(/\(.*\)/g, "")}</Text>
        <Text>{product.product.description}</Text>
        <Text>{product.product.priceString}</Text>
        <Text>{product.product.subscriptionPeriod}</Text>
      </View>
    </TouchableRipple>
  );
};

export default Products;

const styles = StyleSheet.create({});
