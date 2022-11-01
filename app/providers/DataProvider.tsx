import React, { useContext, createContext, useState, useCallback } from "react";
import { Category } from "../realm/Category";
import { Transaction } from "../realm/Transaction";

import { useQuery } from "../realm/index";
import AddCategory from "../components/AddCategory";
import AddTransaction from "../components/AddTransaction";
type Props = {
  category: Realm.Results<Category & Realm.Object<unknown>>;
  transaction: Realm.Results<Transaction>;
  showAddCategoryModal: (item?: Category) => void;
  showAddTransactionModal: (item?: Transaction) => void;

};

const DataContext = createContext<Props>({
  category: [] as unknown as Realm.Results<Category>,
  transaction: [] as unknown as Realm.Results<Transaction>,
  showAddCategoryModal: () => { },
  showAddTransactionModal: () => { },

});

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const category = useQuery(Category);
  const transaction = useQuery(Transaction);

  const [addCategory, setAddCategory] = useState<{
    visible: boolean;
    item: Category | undefined;
  }>({
    visible: false,
    item: undefined,
  });

  const [addTransaction, setAddTransaction] = useState<{
    visible: boolean; item: Transaction | undefined
  }>({
    visible: false, item: undefined
  })


  const showAddCategoryModal = useCallback((item?: Category) => {
    if (item) setAddCategory({ item, visible: true });
    else setAddCategory({ item: undefined, visible: true });
  }, []);

  const dismissAddCategoryModal = useCallback(() => {
    setAddCategory(prev => ({ ...prev, visible: false }));
  }, []);


  const showAddTransactionModal = useCallback((item?: Transaction) => {
    if (item) setAddTransaction({ item, visible: true });
    else setAddTransaction({ item: undefined, visible: true });
  }, []);


  const dismissAddTransactionModal = useCallback(() => {
    setAddTransaction(prev => ({ ...prev, visible: false }));
  }, []);



  return (
    <DataContext.Provider value={{ category, transaction, showAddCategoryModal, showAddTransactionModal }}>
      <AddCategory
        item={addCategory.item}
        visible={addCategory.visible}
        onDismiss={dismissAddCategoryModal}
      />
      <AddTransaction
        item={addTransaction.item}
        visible={addTransaction.visible}
        onDismiss={dismissAddTransactionModal}
      />
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
