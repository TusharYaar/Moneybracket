import React, { useContext, createContext, useMemo, useState, useCallback, useEffect } from "react";
import { Category } from "../realm/Category";
import { Transaction } from "../realm/Transaction";

import { useQuery, useRealm } from "@realm/react";
import AddCategory from "../components/Modals/AddCategory";
import AddTransaction from "../components/Modals/AddTransaction";
// import DateFilterModal from "../components/Modals/DateFilterModal";
import CategoryFilterModal from "../components/Modals/CategoryFilterModal";
import { BackupFile } from "../types";

type AddNewCategory_function =
  | Pick<Category, "title" | "type" | "color" | "icon" | "createdAt" | "isFavorite">
  | Required<Pick<Category, "title" | "type" | "color" | "icon">>;

type Props = {
  // dateFilter: {
  //   type: string;
  //   startDate: Date;
  //   endDate: Date;
  // };
  selectedCategory: string[];
  category: Realm.Results<Category>;
  // transaction: Realm.Results<Transaction>;
  showAddCategoryModal: (item?: Category) => void;
  showAddTransactionModal: (item?: Transaction) => void;
  // showDateFilterModal: () => void;
  showCategoryFilterModal: () => void;
  // updateDateFilter: (type: string, start: Date, end: Date) => void;
  deleteAllData: () => void;
};

const DataContext = createContext<Props>({
  // dateFilter: {
  //   type: "all",
  //   startDate: new Date(),
  //   endDate: new Date(),
  // },
  selectedCategory: [],
  category: []as unknown as Realm.Results<Category>,
  // transaction: [] as unknown as Realm.Results<Transaction>,
  showAddCategoryModal: () => {},
  showAddTransactionModal: () => {},
  // showDateFilterModal: () => {},
  showCategoryFilterModal: () => {},
  // updateDateFilter: () => {},
  deleteAllData: () => {},
});

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  // const [dateFilter, setDateFilter] = useState({
  //   type: "all",
  //   startDate: new Date(),
  //   endDate: new Date(),
  // });

  const [selectedCategory, setSelectedCategory] = useState([]);

  const realm = useRealm();

  const category = useQuery(Category);

  // const category = useQuery(Category, cat => cat.sorted("title"));
  // const category = useMemo(() => _category.sorted("title"), [_category]);

  // useEffect(() => {
  //   setSelectedCategory(category.map((cat) => cat._id.toHexString()));
  // }, [category]);

  // const transaction = useQuery(Transaction);
  // const transaction = useMemo(() => {
    // return _transaction.sorted("date", true);
  // }, [_transaction]);

  const [addCategory, setAddCategory] = useState<{
    visible: boolean;
    item: Category | undefined;
  }>({
    visible: false,
    item: undefined,
  });

  const [addTransaction, setAddTransaction] = useState<{
    visible: boolean;
    item: Transaction | undefined;
  }>({
    visible: false,
    item: undefined,
  });

  // const [dateModalVisible, setDateModalVisible] = useState(false);
  const [categoryFilterModalVisible, setCategoryFilterModalVisible] = useState(false);

  const showAddCategoryModal = useCallback((item?: Category) => {
    if (item) setAddCategory({ item, visible: true });
    else setAddCategory({ item: undefined, visible: true });
  }, []);

  const dismissAddCategoryModal = useCallback(() => {
    setAddCategory((prev) => ({ ...prev, visible: false }));
  }, []);

  const showAddTransactionModal = useCallback((item?: Transaction) => {
    if (item) setAddTransaction({ item, visible: true });
    else setAddTransaction({ item: undefined, visible: true });
  }, []);

  const dismissAddTransactionModal = useCallback(() => {
    setAddTransaction((prev) => ({ ...prev, visible: false }));
  }, []);

  // const showDateFilterModal = useCallback(() => {
  //   setDateModalVisible(true);
  // }, []);
  // const dismissDateFilterModal = useCallback(() => {
  //   setDateModalVisible(false);
  // }, []);

  const showCategoryFilterModal = useCallback(() => {
    setCategoryFilterModalVisible(true);
  }, []);
  const dismissCategoryFilterModal = useCallback(() => {
    setCategoryFilterModalVisible(false);
  }, []);

  const updateCategoryFilter = useCallback((items: string[]) => {
    dismissCategoryFilterModal();
    setSelectedCategory(items);
  }, []);

  // const updateDateFilter = useCallback((type: string, start: Date, end: Date) => {
  //   setDateFilter({
  //     type,
  //     startDate: start,
  //     endDate: end,
  //   });
  // }, []);

  const deleteAllData = useCallback(() => {
    realm.write(() => {
      realm.deleteAll();
    });
  }, []);

  return (
    <DataContext.Provider
      value={{
        // dateFilter,
        category,
        selectedCategory,
        // transaction,
        showAddCategoryModal,
        showAddTransactionModal,
        // showDateFilterModal,
        showCategoryFilterModal,
        // updateDateFilter,
        deleteAllData,
      }}
    >
      {/* <AddCategory item={addCategory.item} visible={addCategory.visible} onDismiss={dismissAddCategoryModal} />
      <AddTransaction
        category={category}
        item={addTransaction.item}
        visible={addTransaction.visible}
        onDismiss={dismissAddTransactionModal}
      />
      <DateFilterModal
        visible={dateModalVisible}
        onDismiss={dismissDateFilterModal}
        updateDateFilter={updateDateFilter}
        filter={dateFilter}
      />
      <CategoryFilterModal
        visible={categoryFilterModalVisible}
        onDismiss={dismissCategoryFilterModal}
        selectedCategory={selectedCategory}
        onSelectedCategoryUpdate={(items) => updateCategoryFilter(items)}
        category={category}
      /> */}
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
