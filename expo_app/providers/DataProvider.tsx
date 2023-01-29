import React, {
  useContext,
  createContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import {Category} from "../realm/Category";
import {Transaction} from "../realm/Transaction";

import {useQuery} from "../realm/index";
import AddCategory from "../components/AddCategory";
import AddTransaction from "../components/AddTransaction";
import DateFilterModal from "../components/DateFilterModal";
type Props = {
  dateFilter: {
    type: string;
    startDate: Date;
    endDate: Date;
  };
  category: Realm.Results<Category & Realm.Object<unknown>>;
  transaction: Realm.Results<Transaction>;
  showAddCategoryModal: (item?: Category) => void;
  showAddTransactionModal: (item?: Transaction) => void;
  showDateFilterModal: () => void;
  updateDateFilter: (type: string, start: Date, end: Date) => void;
};

const DataContext = createContext<Props>({
  dateFilter: {
    type: "all",
    startDate: new Date(),
    endDate: new Date(),
  },
  category: [] as unknown as Realm.Results<Category>,
  transaction: [] as unknown as Realm.Results<Transaction>,
  showAddCategoryModal: () => {},
  showAddTransactionModal: () => {},
  showDateFilterModal: () => {},
  updateDateFilter: () => {},
});

export const useData = () => useContext(DataContext);

const DataProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const [dateFilter, setDateFilter] = useState({
    type: "all",
    startDate: new Date(),
    endDate: new Date(),
  });

  const _category = useQuery(Category);
  const category = useMemo(() => _category.sorted("title"), [_category]);

  const _transaction = useQuery(Transaction);
  const transaction = useMemo(() => {
    return _transaction.sorted("date", true);
  }, [_transaction]);

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

  const [dateModalVisible, setDateModalVisible] = useState(false);

  const showAddCategoryModal = useCallback((item?: Category) => {
    if (item) setAddCategory({item, visible: true});
    else setAddCategory({item: undefined, visible: true});
  }, []);

  const dismissAddCategoryModal = useCallback(() => {
    setAddCategory(prev => ({...prev, visible: false}));
  }, []);

  const showAddTransactionModal = useCallback((item?: Transaction) => {
    if (item) setAddTransaction({item, visible: true});
    else setAddTransaction({item: undefined, visible: true});
  }, []);

  const dismissAddTransactionModal = useCallback(() => {
    setAddTransaction(prev => ({...prev, visible: false}));
  }, []);

  const showDateFilterModal = useCallback(() => {
    setDateModalVisible(true);
  }, []);
  const dismissDateFilterModal = useCallback(() => {
    setDateModalVisible(false);
  }, []);

  const updateDateFilter = useCallback(
    (type: string, start: Date, end: Date) => {
      setDateFilter({
        type,
        startDate: start,
        endDate: end,
      });
    },
    [],
  );

  return (
    <DataContext.Provider
      value={{
        dateFilter,
        category,
        transaction,
        showAddCategoryModal,
        showAddTransactionModal,
        showDateFilterModal,
        updateDateFilter,
      }}
    >
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
      <DateFilterModal
        visible={dateModalVisible}
        onDismiss={dismissDateFilterModal}
      />
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;