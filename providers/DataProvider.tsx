import React, { useContext, createContext, useMemo, useState, useCallback } from "react";
import { Category, Transaction, TransactionWithCategory } from "../types";
import { randomUUID } from "expo-crypto";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { categoryTable, transactionTable } from "data/schema";
import migrations from "drizzle/migrations";
import { eq } from "drizzle-orm";

const expo = openDatabaseSync("MB.db");
const db = drizzle(expo);

const STORAGE_DATE_FORMAT = "dd-MMM-yyyy";

type Props = {
  category: Category[];
  transaction: TransactionWithCategory[];
  addTransaction: (value: Omit<Transaction, "_id"> | Omit<Transaction, "_id">[]) => void;
  updateTransaction: (_id: string, value: Omit<Transaction, "_id">) => void;
  deleteTransaction: (_id: string) => void;
  addCategory: (value: Omit<Category, "_id"> | Omit<Category, "_id">[]) => void;
  updateCategory: (_id: string, value: Omit<Category, "_id">) => void;
  deleteCategory: (_id: string) => void;
  fetchData: () => void;
  deleteAllData: () => void;
  migration_success: boolean;
  migration_error?: Error;
};

type TransactionDateString = Omit<Transaction, "date"> & { date: string };

const DataContext = createContext<Props>({
  transaction: [],
  addTransaction: (value: Omit<Transaction, "_id">) => {},
  updateTransaction: (_id: string, value: Omit<Transaction, "_id">) => {},
  deleteTransaction: (_id: string) => {},

  category: [],
  addCategory: (value: Omit<Category, "_id">) => {},
  updateCategory: (_id: string, value: Omit<Category, "_id">) => {},
  deleteCategory: (_id: string) => {},
  deleteAllData: () => {},
  migration_success: false,
  fetchData: () => {},
});

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { success: migration_success, error: migration_error } = useMigrations(db, migrations);
  const [category, setCategory] = useState<Category[]>([]);

  const [_transaction, setTransaction] = useState<Transaction[]>([]);

  const categoryObj: Record<string, Category> = useMemo(() => {
    if (category) return category.reduce((prev, curr) => ({ ...prev, [curr._id]: curr }), {});
    else return {};
  }, [category]);

  const transaction = useMemo(
    () =>
      _transaction.map((trans) => ({
        ...trans,
        category: categoryObj[trans.category],
      })),
    [_transaction, categoryObj]
  );

  const getAllCategory = useCallback(async () => {
    try {
      const data = await db.select().from(categoryTable);
      return data;
    } catch (e) {
      console.log(e);
      // TODO: ADD SENETRY LOGGING
      // error reading value
    }
  }, [db]);

  const getAllTransaction = useCallback(async () => {
    try {
      return await db.select().from(transactionTable);
    } catch (e) {
      console.log(e);
      // TODO: ADD SENETRY LOGGING
      // error reading value
    }
  }, [db]);

  const fetchData = useCallback(async () => {
    const data = await getAllCategory();
    setCategory(data);
    const transactions = await getAllTransaction();
    setTransaction(transactions);
  }, [getAllCategory, setCategory, getAllTransaction, setTransaction]);

  const addCategory = useCallback(
    async (value: Omit<Category, "_id"> | Omit<Category, "_id">[]) => {
      let values: Category[] = [];
      if (Array.isArray(value)) {
        values = value.map((val) => ({ ...val, _id: randomUUID() }));
      } else {
        const _id = randomUUID();
        values = [{ ...value, _id }];
      }
      try {
        await db.insert(categoryTable).values(values);
        setCategory(values);
      } catch (e) {
        // saving error
        // TODO: ADD SENETRY LOGGING
        console.log(e);
        const ids = values.map((v) => v._id);
        setCategory((prev) => prev.filter((cat) => !ids.includes(cat._id)));
      }
    },
    [setCategory, db]
  );

  const updateCategory = useCallback( async (_id: string, value: Omit<Category, "_id">) => {
    let oldValue: Category;
    setCategory((prev) =>
      prev.map((cat) => {
        if (cat._id === _id) {
          oldValue = cat;
          return { ...value, _id };
        } else return cat;
      })
    );
    try {
      await db.update(categoryTable).set(value).where(eq(categoryTable._id, _id));
    } catch (e) {
      // saving error
      // TODO: ADD SENETRY LOGGING
      setCategory((prev) => prev.filter((cat) => cat._id !== _id));
    }
  },[setCategory, db]);
  const addTransaction = useCallback(async (value: Omit<Transaction, "_id"> | Omit<Transaction, "_id">[]) => {
    let vals: Transaction[] = [];
    if (Array.isArray(value)) {
      vals = value.map((val) => ({ ...val, _id: randomUUID() }));
    } else {
      const _id = randomUUID();
      vals = [{ ...value, _id }];
    }
    try {
      await db.insert(transactionTable).values(vals);
      setTransaction((prev) => prev.concat(vals));
    } catch (e) {
      // saving error
      // TODO: ADD SENETRY LOGGING
      console.log(e);
      const ids = vals.map((v) => v._id);
      setTransaction((prev) => prev.filter((cat) => !ids.includes(cat._id)));
    }
  },  [setTransaction, db]);

  const deleteTransaction = useCallback(async (_id: string) => {
    let trans: Transaction;
    setTransaction((prev) =>
      prev.filter((t) => {
        if (t._id === _id) {
          trans = t;
          return false;
        }
        return true;
      })
    );
    try {
      await db.delete(transactionTable).where(eq(transactionTable._id, _id));
    } catch (e) {
      // TODO: ADD SENETRY LOGGING
      console.log(e);
      setTransaction((prev) => prev.concat(trans));
    }
  },  [setTransaction, db]);

  const updateTransaction = useCallback(async (_id: string, value: Omit<Transaction, "_id">) => {
    let oldValue: Transaction;
    setTransaction((prev) =>
      prev.map((cat) => {
        if (cat._id === _id) {
          oldValue = cat;
          return { ...value, _id };
        } else return cat;
      })
    );
    try {
      await db.update(transactionTable).set(value).where(eq(transactionTable._id, _id));
    } catch (e) {
      // TODO: ADD SENETRY LOGGING
      console.log(e);
      if (oldValue) setTransaction((prev) => prev.map((val) => (val._id === _id ? oldValue : val)));
    }
  }, [setTransaction, db]);

  const deleteCategory = useCallback(async (_id: string) => {
    let cat: Category;
    let transactions: Transaction[] = [];
    setTransaction((prev) =>
      prev.filter((t) => {
        if (t.category === _id) {
          transactions.push(t);
          return false;
        }
        return true;
      })
    );
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
      await db.delete(transactionTable).where(eq(transactionTable.category, _id));
      await db.delete(categoryTable).where(eq(categoryTable._id, _id));
    } catch (e) {
      // TODO: ADD SENETRY LOGGING
      setCategory((prev) => prev.concat(cat));
      setTransaction((prev) => prev.concat(transactions));
    }
  }, [setTransaction, setCategory, db]);

  const deleteAllData = useCallback(async () => {
    let cat: Category[];
    let trans: Transaction[] = [];
    setCategory((prev) => {
      cat = prev;
      return [];
    });
    setTransaction((prev) => {
      trans = prev;
      return [];
    });

    try {
      await db.delete(transactionTable);
      await db.delete(categoryTable);
    } catch (e) {
      // TODO: ADD SENETRY LOGGING
      setCategory((prev) => cat);
      setTransaction(trans);
    }
  }, [setTransaction, db, setCategory]);

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
        fetchData,
        migration_error,
        migration_success,
        deleteAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
