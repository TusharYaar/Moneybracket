import React, { useContext, createContext, useMemo, useState, useCallback, useEffect } from "react";
import { BackupFile, Category, Transaction, TransactionWithCategory } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";
import { format, parse } from "date-fns";
const ASYNC_STORAGE = {
  CATEGORY_KEY: "CATEGORY",
  DATES: "DATES",
};

const STORAGE_DATE_FORMAT = "dd-MMM-yyyy";

type Props = {
  category: Category[];
  transaction: TransactionWithCategory[];
  addTransaction: (value: Omit<Transaction, "_id">) => void;
  updateTransaction: (_id: string, value: Omit<Transaction, "_id">) => void;
  deleteTransaction: (_id: string) => void;
  addCategory: (value: Omit<Category, "_id">) => void;
  updateCategory: (_id: string, value: Omit<Category, "_id">) => void;
  deleteCategory: (_id: string) => void;
};

type TransactionDateString = Omit<Transaction, "date"> & { date: string };

const DataContext = createContext<Props>({
  // dateFilter: {
  //   type: "all",
  //   startDate: new Date(),
  //   endDate: new Date(),
  // },
  transaction: [],
  addTransaction: (value: Omit<Transaction, "_id">) => {},
  updateTransaction: (_id: string, value: Omit<Transaction, "_id">) => {},
  deleteTransaction: (_id: string) => {},

  // selectedCategory: [],
  category: [],
  addCategory: (value: Omit<Category, "_id">) => {},
  updateCategory: (_id: string, value: Omit<Category, "_id">) => {},
  deleteCategory: (_id: string) => {},
  // transaction: [] as unknown as Realm.Results<Transaction>,
  // deleteAllData: () => {},
});

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [category, setCategory] = useState<Category[]>([]);

  const [allTransactionDates, setAllTransactionDates] = useState<Set<string>>(new Set());
  const [_transaction, setTransaction] = useState<TransactionDateString[]>([]);

  const categoryObj: Record<string, Category> = useMemo(
    () => category.reduce((prev, curr) => ({ ...prev, [curr._id]: curr }), {}),
    [category]
  );

  const transaction = useMemo(
    () =>
      _transaction.map((trans) => ({
        ...trans,
        category: categoryObj[trans.category],
        date: parse(trans.date, STORAGE_DATE_FORMAT, new Date()),
      })),
    [_transaction, categoryObj]
  );

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

  const getAllTransactionForDate = useCallback(async (date: string) => {
    try {
      const value = await AsyncStorage.getItem(date);
      if (value !== null) {
        return JSON.parse(value) as TransactionDateString[];
      } else return [];
    } catch (e) {
      console.log(e);
      // TODO: ADD SENETRY LOGGING
      // error reading value
    }
  }, []);

  useEffect(() => {
    const fetchAllCategory = async () => {
      const data = await getAllCategory();
      setCategory(data);
    };
    const fetchAllTransactionDates = async () => {
      const data = await AsyncStorage.getAllKeys();
      const values = Object.values(ASYNC_STORAGE);
      const dates = data.filter((date) => !values.includes(date));
      setAllTransactionDates(new Set(dates));

      const transactions: TransactionDateString[] = [];

      for (let i = 0; i < dates.length && i < 10; i++) {
        const result = await getAllTransactionForDate(dates[i]);
        transactions.push(...result);
      }
      setTransaction(transactions);
    };
    fetchAllCategory();
    fetchAllTransactionDates();
  }, [getAllCategory, setCategory, getAllTransactionForDate]);

  const addCategory = useCallback(async (value: Omit<Category, "_id">) => {
    const _id = randomUUID();
    setCategory((prev) => prev.concat({ ...value, _id }));
    try {
      const categories = await getAllCategory();
      categories.push({ ...value, _id });

      await AsyncStorage.setItem(ASYNC_STORAGE.CATEGORY_KEY, JSON.stringify(categories));
    } catch (e) {
      // saving error
      // TODO: ADD SENETRY LOGGING
      setCategory((prev) => prev.filter((cat) => cat._id !== _id));
    }
  }, []);

  const updateCategory = async (_id: string, value: Omit<Category, "_id">) => {
    setCategory((prev) => prev.map((cat) => (cat._id === _id ? { ...value, _id } : cat)));
    try {
      const categories = await getAllCategory();
      const updatedCategories = categories.map((cat) => (cat._id === _id ? { ...value, _id } : cat));

      await AsyncStorage.setItem(ASYNC_STORAGE.CATEGORY_KEY, JSON.stringify(updatedCategories));
    } catch (e) {
      // saving error
      // TODO: ADD SENETRY LOGGING
      setCategory((prev) => prev.filter((cat) => cat._id !== _id));
    }
  };
  const addTransaction = useCallback(
    async (value: Omit<Transaction, "_id">) => {
      const _id = randomUUID();
      console.log(value);
      const date = format(value.date, STORAGE_DATE_FORMAT);
      setTransaction((prev) => prev.concat({ ...value, _id, category: categoryObj[value.category]._id, date }));
      setAllTransactionDates((prev) => prev.add(date));
      try {
        const transactions = await getAllTransactionForDate(date);
        await AsyncStorage.setItem(date, JSON.stringify(transactions.concat({ ...value, date, _id })));
      } catch (e) {
        // TODO: ADD SENETRY LOGGING
        console.log(e);
        setTransaction((prev) => prev.filter((trans) => trans._id !== _id));
      }
    },
    [getAllTransactionForDate, categoryObj]
  );

  const deleteTransaction = useCallback(
    async (_id: string) => {
      let date = "";
      setTransaction((prev) =>
        prev.filter((t) => {
          if (t._id === _id) {
            date = t.date;
            return false;
          }
          return true;
        })
      );
      try {
        console.log(date);
        const transactions = await getAllTransactionForDate(date);
        await AsyncStorage.setItem(date, JSON.stringify(transactions.filter((t) => t._id !== _id)));
      } catch (e) {
        // TODO: ADD SENETRY LOGGING
        console.log(e);
        // setTransaction((prev) => prev.filter((trans) => trans._id !== _id));
      }
    },
    [getAllTransactionForDate, categoryObj]
  );

  const updateTransaction = useCallback(
    async (_id: string, value: Omit<Transaction, "_id">) => {
      const date = format(value.date, STORAGE_DATE_FORMAT);
      let prevDate = "";
      setTransaction((prev) =>
        prev.map((t) => {
          if (t._id === _id) {
            prevDate = t.date;
            return { ...value, _id, category: categoryObj[value.category]._id, date };
          } else return t;
        })
      );
      setAllTransactionDates((prev) => prev.add(date));
      try {
        if (prevDate === date) {
          const transactions = await getAllTransactionForDate(date);
          await AsyncStorage.setItem(
            date,
            JSON.stringify(transactions.map((t) => (t._id === _id ? { ...value, date, _id } : t)))
          );
        } else {
          let transactions = await getAllTransactionForDate(prevDate);
          await AsyncStorage.setItem(date, JSON.stringify(transactions.filter((t) => t._id !== _id)));
          transactions = await getAllTransactionForDate(date);
          await AsyncStorage.setItem(date, JSON.stringify(transactions.concat({ ...value, date, _id })));
        }
      } catch (e) {
        // TODO: ADD SENETRY LOGGING
        console.log(e);
        setTransaction((prev) => prev.filter((trans) => trans._id !== _id));
      }
    },
    [getAllTransactionForDate, categoryObj]
  );

  const deleteCategory = useCallback(async (_id: string) => {
    let cat: Category;

    setCategory((prev) =>
      prev.filter((c) => {
        if (c._id === _id) {
          cat = c;
          return false;
        }
        return true;
      })
    );
    try {
      const categories = await getAllCategory();
      await AsyncStorage.setItem(ASYNC_STORAGE.CATEGORY_KEY, JSON.stringify(categories.filter((t) => t._id !== _id)));
    } catch (e) {
      // TODO: ADD SENETRY LOGGING
      setCategory((prev) => prev.concat(cat));
      console.log(e);
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        transaction,
        addTransaction,
        updateTransaction,
        category,
        addCategory,
        updateCategory,
        deleteTransaction,
        deleteCategory,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
