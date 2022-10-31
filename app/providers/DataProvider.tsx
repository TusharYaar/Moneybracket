import React, {useContext, createContext, useState, useCallback} from "react";
import {Category} from "../realm/Category";
import {Transaction} from "../realm/Transaction";

import {useQuery} from "../realm/index";
import AddCategory from "../components/AddCategory";
type Props = {
  category: Realm.Results<Category & Realm.Object<unknown>>;
  transaction: Realm.Results<Transaction>;
  showAddCategoryModal: (item?: Category) => void;
};

const DataContext = createContext<Props>({
  category: [] as unknown as Realm.Results<Category>,
  transaction: [] as unknown as Realm.Results<Transaction>,
  showAddCategoryModal: () => {},
});

export const useData = () => useContext(DataContext);

const DataProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const category = useQuery(Category);
  const transaction = useQuery(Transaction);

  const [addCategory, setAddCategory] = useState<{
    visible: boolean;
    item: Category | undefined;
  }>({
    visible: false,
    item: undefined,
  });

  const showAddCategoryModal = useCallback((item?: Category) => {
    if (item) setAddCategory({item, visible: true});
    else setAddCategory({item: undefined, visible: true});
  }, []);

  const dismissAddCategoryModal = useCallback(() => {
    setAddCategory(prev => ({...prev, visible: false}));
  }, []);

  return (
    <DataContext.Provider value={{category, transaction, showAddCategoryModal}}>
      <AddCategory
        item={addCategory.item}
        visible={addCategory.visible}
        onDismiss={dismissAddCategoryModal}
      />
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
