import React, { useContext, createContext, useMemo, useState, useCallback, useEffect } from "react";
import AddCategory from "../components/Modals/AddCategory";
import AddTransaction from "../components/Modals/AddTransaction";
// import DateFilterModal from "../components/Modals/DateFilterModal";
import { BackupFile, Category } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";
const ASYNC_STORAGE = {
  CATEGORY_KEY: "CATEGORY",
};
// type AddNewCategory_function =
//   | Pick<Category, "title" | "type" | "color" | "icon" | "createdAt" | "isFavorite">
//   | Required<Pick<Category, "title" | "type" | "color" | "icon">>;

type Props = {
  selectedCategory: string[];
  category: Category[];
  addCategory: (value: Omit<Category, "_id">) => void;
  updateCategory: (_id: string, value: Omit<Category, "_id">) => void;

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
  addCategory: (value: Omit<Category, "_id">) => {},
  updateCategory: (_id: string, value: Omit<Category, "_id">) => {}
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

  const getAllCategory = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(ASYNC_STORAGE.CATEGORY_KEY);
      if (value !== null) {
        return JSON.parse(value) as Category[];
      } else return [];
    } catch (e) {
      console.log(e);
      // TODO: ADD SENETRY LOGGING
      // error reading value
    }
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getAllCategory();
      setCategory(data);
    };

    fetchCategory();
  }, [getAllCategory, setCategory]);

  const addCategory = useCallback(async (value: Omit<Category, "_id">) => {
    const _id = randomUUID();
    setCategory((prev) => prev.concat({ ...value, _id }));
    try {
      const categories = await getAllCategory();
      categories.push({ ...value, _id });

      await AsyncStorage.setItem(ASYNC_STORAGE.CATEGORY_KEY, JSON.stringify(categories));
    } catch (e) {
      // saving error
      setCategory((prev) => prev.filter((cat) => cat._id !== _id));
    }
  }, []);

  const updateCategory = useCallback(async (_id: string, value: Omit<Category, "_id">) => {
    setCategory((prev) => prev.map( cat => cat._id === _id ?  { ...value, _id }: cat));
    try {
      const categories = await getAllCategory();
      const updatedCategories = categories.map( cat => cat._id === _id ?  { ...value, _id }: cat);

      await AsyncStorage.setItem(ASYNC_STORAGE.CATEGORY_KEY, JSON.stringify(updatedCategories));
    } catch (e) {
      // saving error
      setCategory((prev) => prev.filter((cat) => cat._id !== _id));
    }
  }, []);

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
        addCategory,
        updateCategory,
        selectedCategory,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
