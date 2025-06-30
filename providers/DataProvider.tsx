import React, { useContext, createContext, useState, useCallback } from "react";
import { Category, Group, Transaction } from "../types";
import { randomUUID } from "expo-crypto";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { categoryTable, groupTable, transactionTable } from "data/schema";
import migrations from "drizzle/migrations";
import { eq } from "drizzle-orm";

const expo = openDatabaseSync("MB.db");
const db = drizzle(expo);

const STORAGE_DATE_FORMAT = "dd-MMM-yyyy";

type Props = {
  category: Category[];
  transaction: Transaction[];
  group: Group[];
  addTransaction: (value: Omit<Transaction, "_id"> | Omit<Transaction, "_id">[]) => Promise<void>;
  updateTransaction: (_id: string, value: Omit<Transaction, "_id">) => void;
  deleteTransaction: (_id: string) => void;
  addCategory: (value: Omit<Category, "_id"> | Omit<Category, "_id">[]) => Promise<Category[]|undefined>;
  updateCategory: (_id: string, value: Omit<Category, "_id">) => void;
  deleteCategory: (_id: string) => void;
  fetchData: () => void;
  deleteAllData: () => Promise<void>;
  migration_success: boolean;
  migration_error?: Error;
  addGroup: (value: Omit<Group, "_id"> | Omit<Group, "_id">[]) => Promise<void>;
  updateGroup: (_id: string, value: Omit<Group, "_id">) => void;
  deleteGroup: (_id: string) => void;
};

const DataContext = createContext<Props>({
  transaction: [],
  addTransaction: (value) => Promise.resolve(),
  updateTransaction: (_id: string, value: Omit<Transaction, "_id">) => {},
  deleteTransaction: (_id: string) => {},

  category: [],
  addCategory: (value) => Promise.resolve([]),
  updateCategory: (_id: string, value: Omit<Category, "_id">) => {},
  deleteCategory: (_id: string) => {},

  deleteAllData: () => Promise.resolve(),
  migration_success: false,
  fetchData: () => {},

  group: [],
  addGroup: (value) => Promise.resolve(),
  updateGroup: (_id: string, value: Omit<Group, "_id">) => {},
  deleteGroup: (_id: string) => {},
});

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { success: migration_success, error: migration_error } = useMigrations(db, migrations);
  const [category, setCategory] = useState<Category[]>([]);
  const [group, setGroup] = useState<Group[]>([]);

  const [transaction, setTransaction] = useState<Transaction[]>([]);

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

  const getAllGroup = useCallback(async () => {
    try {
      return await db.select().from(groupTable);
    } catch (e) {
      console.log(e);
      // TODO: ADD SENETRY LOGGING
      // error reading value
    }
  }, [db]);

  const fetchData = useCallback(async () => {
    const data: Category[] = (await getAllCategory()) as Category[];
    setCategory(data);
    const transactions = (await getAllTransaction()) as Transaction[];
    setTransaction(transactions);
    const group = (await getAllGroup()) as Group[];
    setGroup(group);
  }, [getAllCategory, setCategory, getAllTransaction, setTransaction, setGroup, getAllGroup]);

  const addCategory = useCallback(
    async (value: Omit<Category, "_id"> | Omit<Category, "_id">[] | Category[]) => {
      let values: Category[] = [];
      if (Array.isArray(value)) {

        values = value.map((val) => ({ ...val, _id: val?._id ? val._id : randomUUID() }));
      } else {
        const _id = randomUUID();
        values = [{ ...value, _id }];
      }
      try {
        const da = await db.insert(categoryTable).values(values);
        setCategory((prev) => prev.concat(values));
        return values;
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

  const updateCategory = useCallback(
    async (_id: string, value: Omit<Category, "_id">) => {
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
        setCategory((prev) => prev.map((cat) => (cat._id === _id ? oldValue : cat)));
      }
    },
    [setCategory, db]
  );
  const addTransaction = useCallback(
    async (value: Omit<Transaction, "_id"> | Omit<Transaction, "_id">[] | Transaction[]) => {
      let vals: Transaction[] = [];
      if (Array.isArray(value)) {
        vals = value.map((val) => ({ ...val, _id: val?._id ? val._id : randomUUID() }));
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
    },
    [setTransaction, db]
  );

  const deleteTransaction = useCallback(
    async (_id: string) => {
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
    },
    [setTransaction, db]
  );

  const updateTransaction = useCallback(
    async (_id: string, value: Omit<Transaction, "_id">) => {
      let oldValue: Transaction | null = null;
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
        if (oldValue !== null)
          setTransaction((prev) => prev.map((val) => (val._id === _id ? (oldValue as Transaction) : val)));
      }
    },
    [setTransaction, db]
  );

  const deleteCategory = useCallback(
    async (_id: string) => {
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
    },
    [setTransaction, setCategory, db]
  );

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
      await db.delete(groupTable);
    } catch (e) {
      // TODO: ADD SENETRY LOGGING
      setCategory((prev) => cat);
      setTransaction(trans);
    }
  }, [setTransaction, db, setCategory]);

  const addGroup = useCallback(
    async (value: Omit<Group, "_id"> | Omit<Group, "_id">[] | Group[]) => {
      let values: Group[] = [];
      if (Array.isArray(value)) {
        values = value.map((val) => ({ ...val, _id: val?._id ? val._id : randomUUID() }));
      } else {
        const _id = randomUUID();
        values = [{ ...value, _id }];
      }
      try {
        await db.insert(groupTable).values(values);
        setGroup((prev) => prev.concat(values));
      } catch (e) {
        // saving error
        // TODO: ADD SENETRY LOGGING
        console.log(e);
        const ids = values.map((v) => v._id);
        setGroup((prev) => prev.filter((cat) => !ids.includes(cat._id)));
      }
    },
    [setGroup, db]
  );

  const deleteGroup = useCallback(
    async (_id: string) => {
      let cat: Group;
      setTransaction((prev) => prev.map((t) => (t.group === _id ? { ...t, group: null } : t)));
      setGroup((prev) =>
        prev.filter((c) => {
          if (c._id === _id) {
            cat = c;
            return false;
          }
          return true;
        })
      );
      try {
        // db.update(groupTable).set(value).where(eq(groupTable._id, _id));
        await db.update(transactionTable).set({ group: null }).where(eq(transactionTable.group, _id));
        await db.delete(groupTable).where(eq(groupTable._id, _id));
      } catch (e) {
        // TODO: ADD SENETRY LOGGING
        setGroup((prev) => prev.concat(cat));
        // setTransaction((prev) => prev.concat(transactions));
      }
    },
    [setTransaction, setCategory, db]
  );

  const updateGroup = useCallback(
    async (_id: string, value: Omit<Group, "_id">) => {
      let oldValue: Group;
      setGroup((prev) =>
        prev.map((grp) => {
          if (grp._id === _id) {
            oldValue = grp;
            return { ...value, _id };
          } else return grp;
        })
      );
      try {
        await db.update(groupTable).set(value).where(eq(groupTable._id, _id));
      } catch (e) {
        // saving error
        // TODO: ADD SENETRY LOGGING
        setGroup((prev) => prev.map((grp) => (grp._id === _id ? oldValue : grp)));
      }
    },
    [setGroup, db]
  );

  return (
    <DataContext.Provider
      value={{
        group,
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
        addGroup,
        updateGroup,
        deleteGroup,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
