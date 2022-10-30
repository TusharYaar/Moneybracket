import React, {useCallback, useState} from "react";

import {MaterialTopTabScreenProps} from "@react-navigation/material-top-tabs";
import {TabParamList} from "../../navigators/TabNavigators";
import {useData} from "../../providers/DataProvider";
import CategoryItem from "../../components/CategoryItem";

import DeleteDialog from "../../components/DeleteDialog";
import {Category} from "../../realm/Category";
import {useRealm} from "../../realm";
import {FlatList} from "react-native";

type Props = MaterialTopTabScreenProps<TabParamList, "AllCategoryScreen">;

type DialogStateType = {
  item: null | Category;
  visible: boolean;
};

const AllCategory = ({}: Props) => {
  const realm = useRealm();
  const [dialog, setDialog] = useState<DialogStateType>({
    item: null,
    visible: false,
  });
  const handleLongPress = useCallback((item: Category) => {
    setDialog({item: item, visible: true});
  }, []);

  const handleDelete = () => {
    realm.write(() => {
      realm.delete(dialog.item);
      setDialog({item: null, visible: false});
    });
  };

  const handleDismiss = () => {
    setDialog({item: null, visible: false});
  };

  const {category} = useData();
  return (
    <>
      <FlatList
        data={category}
        renderItem={({item}) => (
          <CategoryItem
            item={item}
            onPress={handleLongPress}
            onLongPress={handleLongPress}
          />
        )}
        // estimatedItemSize={19}
      />
      <DeleteDialog
        visible={dialog.visible}
        onClickOk={handleDelete}
        onClickCancel={handleDismiss}
      />
    </>
  );
};

export default AllCategory;
