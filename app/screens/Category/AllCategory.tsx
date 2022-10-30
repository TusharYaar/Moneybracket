import {Text} from "react-native";
import React from "react";

import {MaterialTopTabScreenProps} from "@react-navigation/material-top-tabs";
import {TabParamList} from "../../navigators/TabNavigators";
import {useData} from "../../providers/DataProvider";
import {FlashList} from "@shopify/flash-list";

type Props = MaterialTopTabScreenProps<TabParamList, "AllCategoryScreen">;

const AllCategory = ({}: Props) => {
  const {category} = useData();
  return (
    <FlashList
      data={category}
      renderItem={({item}) => <Text>{item.title}</Text>}
      estimatedItemSize={19}
    />
  );
};

export default AllCategory;
