import React, { useContext, createContext, useMemo, useState, useCallback, useEffect } from "react";
import AddCategory from "../components/Modals/AddCategory";
import AddTransaction from "../components/Modals/AddTransaction";
// import DateFilterModal from "../components/Modals/DateFilterModal";
import CategoryFilterModal from "../components/Modals/CategoryFilterModal";
import { BackupFile, Category } from "../types";

// type AddNewCategory_function =
//   | Pick<Category, "title" | "type" | "color" | "icon" | "createdAt" | "isFavorite">
//   | Required<Pick<Category, "title" | "type" | "color" | "icon">>;

type Props = {
  selectedCategory: string[];
  category: Category[];
  // transaction: Realm.Results<Transaction>;
  // deleteAllData: () => void;
};

const DataContext = createContext<Props>({
  // dateFilter: {
  //   type: "all",
  //   startDate: new Date(),
  //   endDate: new Date(),
  // },
  selectedCategory: [],
  category: [] as Category[],
  // transaction: [] as unknown as Realm.Results<Transaction>,
  // deleteAllData: () => {},
});

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  // const [dateFilter, setDateFilter] = useState({
  //   type: "all",
  //   startDate: new Date(),
  //   endDate: new Date(),
  // });

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [category, setCategory] = useState<Category[]>([]);

  // const category = useQuery(Category, cat => cat.sorted("title"));
  // const category = useMemo(() => _category.sorted("title"), [_category]);

  // useEffect(() => {
  //   setSelectedCategory(category.map((cat) => cat._id.toHexString()));
  // }, [category]);

  // const transaction = useQuery(Transaction);
  // const transaction = useMemo(() => {
  // return _transaction.sorted("date", true);
  // }, [_transaction]);

  // const [addTransaction, setAddTransaction] = useState<{
  //   visible: boolean;
  //   item: Transaction | undefined;
  // }>({
  //   visible: false,
  //   item: undefined,
  // });

  // const [dateModalVisible, setDateModalVisible] = useState(false);

  // const showDateFilterModal = useCallback(() => {
  //   setDateModalVisible(true);
  // }, []);
  // const dismissDateFilterModal = useCallback(() => {
  //   setDateModalVisible(false);
  // }, []);

  // const updateDateFilter = useCallback((type: string, start: Date, end: Date) => {
  //   setDateFilter({
  //     type,
  //     startDate: start,
  //     endDate: end,
  //   });
  // }, []);

  return (
    <DataContext.Provider
      value={{
        category,
        selectedCategory,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
