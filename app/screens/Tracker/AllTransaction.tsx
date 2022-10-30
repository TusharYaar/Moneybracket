import {Text, View} from "react-native";
import React from "react";
import {useQuery} from "../../realm";
import {Category} from "../../realm/Category";
const AllTransaction = () => {
  const collection = useQuery(Category);
  console.log(collection);

  return (
    <View>
      <Text>AllTransaction</Text>
    </View>
  );
};

export default AllTransaction;
