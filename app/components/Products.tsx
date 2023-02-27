import { StyleSheet, View } from "react-native";
import React from "react";
import { PurchasesPackage } from "react-native-purchases";
import { TouchableRipple, Text } from "react-native-paper";

const Products = ({ product, onPress }: { product: PurchasesPackage; onPress: () => void }) => {
  return (
    <TouchableRipple onPress={onPress}>
      <View style={{ margin: 8 }}>
        <Text variant="bodyLarge">{product.product.title.replaceAll(/\(.*\)/g, "")}</Text>
        <Text variant="bodyMedium">{product.product.description}</Text>
        <Text variant="bodyMedium">{product.product.priceString}</Text>
      </View>
    </TouchableRipple>
  );
};

export default Products;

const styles = StyleSheet.create({});
