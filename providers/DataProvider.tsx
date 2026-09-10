import React, { useContext, createContext, useState, useCallback, useEffect, useRef } from "react";
import { AppState } from "react-native";
import { Category, Group, NewSubscription, Subscription, Transaction } from "../types";
import { randomUUID } from "expo-crypto";

import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { categoryTable, groupTable, subscriptionTable, transactionTable } from "data/schema";
import migrations from "drizzle/migrations";
import { and, eq, isNotNull, lte } from "drizzle-orm";
import { captureException } from "@sentry/react-native";
import { planDueOccurrences } from "@utils/subscriptions";

const expo = openDatabaseSync("MB.db");
const db = drizzle(expo);

const TRANSACTION_INSERT_BATCH_SIZE = 50;

type Props = {
  category: Category[];
  transaction: Transaction[];
  group: Group[];
  subscription: Subscription[];
  addTransaction: (value: Omit<Transaction, "_id"> | Omit<Transaction, "_id">[]) => Promise<void>;
  updateTransaction: (_id: string, value: Omit<Transaction, "_id">) => void;
  deleteTransaction: (_id: string) => void;
  addCategory: (value: Omit<Category, "_id"> | Omit<Category, "_id">[]) => Promise<Category[] | undefined>;
  updateCategory: (_id: string, value: Omit<Category, "_id">) => void;
  deleteCategory: (_id: string) => void;
  fetchData: () => Promise<void>;
  deleteAllData: () => Promise<void>;
  migration_success: boolean;
  migration_error?: Error;
  addGroup: (value: Omit<Group, "_id"> | Omit<Group, "_id">[]) => Promise<void>;
  updateGroup: (_id: string, value: Omit<Group, "_id">) => void;
  deleteGroup: (_id: string) => void;
  addSubscription: (value: NewSubscription | Subscription | (NewSubscription | Subscription)[]) => Promise<void>;
  updateSubscription: (_id: string, value: Partial<Omit<Subscription, "_id" | "createdAt">>) => Promise<void>;
  deleteSubscription: (_id: string) => Promise<void>;
  materializeDueSubscriptions: (now?: Date) => Promise<number>;
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
  fetchData: () => Promise.resolve(),

  group: [],
  addGroup: (value) => Promise.resolve(),
  updateGroup: (_id: string, value: Omit<Group, "_id">) => {},
  deleteGroup: (_id: string) => {},

  subscription: [],
  addSubscription: () => Promise.resolve(),
  updateSubscription: () => Promise.resolve(),
  deleteSubscription: () => Promise.resolve(),
  materializeDueSubscriptions: () => Promise.resolve(0),
});

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { success: migration_success, error: migration_error } = useMigrations(db, migrations);
  const [category, setCategory] = useState<Category[]>([]);
  const [group, setGroup] = useState<Group[]>([]);

  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [subscription, setSubscription] = useState<Subscription[]>([]);
  const isMaterializing = useRef(false);

  const getAllCategory = useCallback(async () => {
    try {
      const data = await db.select().from(categoryTable);
      return data;
    } catch (e) {
      captureException(e, {
        level: "error",
        tags: {
          location: "getAllCategory",
          file: "providers/DataProvider.tsx",
          action: "db-select-category",
          timestamp: Date.now(),
        },
      });
      return [];
    }
  }, [db]);

  const getAllTransaction = useCallback(async () => {
    try {
      return await db.select().from(transactionTable);
    } catch (e) {
      captureException(e, {
        level: "error",
        tags: {
          location: "getAllTransaction",
          file: "providers/DataProvider.tsx",
          action: "db-select-transaction",
          timestamp: Date.now(),
        },
      });
      return [];
    }
  }, [db]);

  const getAllGroup = useCallback(async () => {
    try {
      return await db.select().from(groupTable);
    } catch (e) {
      captureException(e, {
        level: "error",
        tags: {
          location: "getAllGroup",
          file: "providers/DataProvider.tsx",
          action: "db-select-group",
          timestamp: Date.now(),
        },
      });
      return [];
    }
  }, [db]);

  const getAllSubscription = useCallback(async () => {
    try {
      return await db.select().from(subscriptionTable);
    } catch (e) {
      captureException(e, {
        level: "error",
        tags: {
          location: "getAllSubscription",
          file: "providers/DataProvider.tsx",
          action: "db-select-subscription",
          timestamp: Date.now(),
        },
      });
      return [];
    }
  }, [db]);

  const materializeDueSubscriptions = useCallback(
    async (now = new Date(), refreshState = true) => {
      if (isMaterializing.current) return 0;
      isMaterializing.current = true;
      let generatedCount = 0;

      try {
        await db.transaction(async (tx) => {
          const dueSubscriptions = (await tx
            .select()
            .from(subscriptionTable)
            .where(
              and(
                eq(subscriptionTable.isActive, true),
                isNotNull(subscriptionTable.nextRunAt),
                lte(subscriptionTable.nextRunAt, now)
              )
            )) as unknown as Subscription[];

          for (const recurring of dueSubscriptions) {
            const plan = planDueOccurrences(recurring, now);
            if (plan.occurrences.length > 0) {
              const createdAt = new Date();
              const generatedTransactions = plan.occurrences.map((scheduledFor) => ({
                _id: randomUUID(),
                note: recurring.note || recurring.title,
                date: scheduledFor,
                amount: recurring.amount,
                currency: recurring.currency,
                category: recurring.category,
                conversionRate: recurring.conversionRate,
                conversionCurrency: recurring.conversionCurrency,
                group: recurring.group,
                subscriptionId: recurring._id,
                scheduledFor,
                createdAt,
                updatedAt: createdAt,
              }));

              for (let offset = 0; offset < generatedTransactions.length; offset += TRANSACTION_INSERT_BATCH_SIZE) {
                await tx
                  .insert(transactionTable)
                  .values(generatedTransactions.slice(offset, offset + TRANSACTION_INSERT_BATCH_SIZE))
                  .onConflictDoNothing();
              }
              generatedCount += plan.occurrences.length;
            }

            await tx
              .update(subscriptionTable)
              .set({
                occurrenceIndex: plan.nextOccurrenceIndex,
                nextRunAt: plan.nextRunAt,
                isActive: plan.isComplete ? false : recurring.isActive,
                updatedAt: new Date(),
              })
              .where(eq(subscriptionTable._id, recurring._id));
          }
        });

        if (refreshState) {
          const [transactions, subscriptions] = await Promise.all([getAllTransaction(), getAllSubscription()]);
          setTransaction(transactions as Transaction[]);
          setSubscription(subscriptions as unknown as Subscription[]);
        }
      } catch (e) {
        captureException(e, {
          level: "error",
          tags: {
            location: "materializeDueSubscriptions",
            file: "providers/DataProvider.tsx",
            action: "db-materialize-subscriptions",
            timestamp: Date.now(),
          },
        });
        generatedCount = 0;
      } finally {
        isMaterializing.current = false;
      }

      return generatedCount;
    },
    [getAllSubscription, getAllTransaction]
  );

  const fetchData = useCallback(async () => {
    await materializeDueSubscriptions(new Date(), false);
    const [categories, transactions, groups, subscriptions] = await Promise.all([
      getAllCategory(),
      getAllTransaction(),
      getAllGroup(),
      getAllSubscription(),
    ]);
    setCategory(categories as Category[]);
    setTransaction(transactions as Transaction[]);
    setGroup(groups as Group[]);
    setSubscription(subscriptions as unknown as Subscription[]);
  }, [getAllCategory, getAllTransaction, getAllGroup, getAllSubscription, materializeDueSubscriptions]);

  useEffect(() => {
    if (!migration_success) return;
    const listener = AppState.addEventListener("change", (state) => {
      if (state === "active") void materializeDueSubscriptions();
    });
    return () => listener.remove();
  }, [migration_success, materializeDueSubscriptions]);

  const addSubscription = useCallback(
    async (value: NewSubscription | Subscription | (NewSubscription | Subscription)[]) => {
      const now = new Date();
      const input = Array.isArray(value) ? value : [value];
      const recurring: Subscription[] = input.map((item) =>
        "_id" in item
          ? item
          : {
              ...item,
              _id: randomUUID(),
              occurrenceIndex: 0,
              nextRunAt: item.startDate,
              createdAt: now,
              updatedAt: now,
            }
      );

      try {
        await db.insert(subscriptionTable).values(recurring);
        setSubscription((prev) => prev.concat(recurring));
        await materializeDueSubscriptions();
      } catch (e) {
        captureException(e, {
          level: "error",
          tags: {
            location: "addSubscription",
            file: "providers/DataProvider.tsx",
            action: "db-insert-subscription",
            timestamp: Date.now(),
          },
        });
        throw e;
      }
    },
    [materializeDueSubscriptions]
  );

  const updateSubscription = useCallback(
    async (_id: string, value: Partial<Omit<Subscription, "_id" | "createdAt">>) => {
      const updatedAt = new Date();
      await db.update(subscriptionTable).set({ ...value, updatedAt }).where(eq(subscriptionTable._id, _id));
      setSubscription((prev) => prev.map((item) => (item._id === _id ? { ...item, ...value, updatedAt } : item)));
      if (value.isActive) await materializeDueSubscriptions();
    },
    [materializeDueSubscriptions]
  );

  const deleteSubscription = useCallback(async (_id: string) => {
    await db.delete(subscriptionTable).where(eq(subscriptionTable._id, _id));
    setSubscription((prev) => prev.filter((item) => item._id !== _id));
  }, []);

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
        captureException(e, {
          level: "error",
          tags: {
            location: "addCategory",
            file: "providers/DataProvider.tsx",
            action: "db-insert-category",
            timestamp: Date.now(),
          },
        });
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
        captureException(e, {
          level: "error",
          tags: {
            location: "updateCategory",
            file: "providers/DataProvider.tsx",
            action: "db-update-category",
            timestamp: Date.now(),
          },
        });
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
          captureException(e, {
            level: "error",
            tags: {
              location: "addTransaction",
              file: "providers/DataProvider.tsx",
              action: "db-insert-transaction",
              timestamp: Date.now(),
            },
          });
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
          captureException(e, {
            level: "error",
            tags: {
              location: "deleteTransaction",
              file: "providers/DataProvider.tsx",
              action: "db-delete-transaction",
              timestamp: Date.now(),
            },
          });
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
        captureException(e, {
          level: "error",
          tags: {
            location: "updateTransaction",
            file: "providers/DataProvider.tsx",
            action: "db-update-transaction",
            timestamp: Date.now(),
          },
        });
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
      let recurring: Subscription[] = [];
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
      setSubscription((prev) =>
        prev.filter((item) => {
          if (item.category === _id) {
            recurring.push(item);
            return false;
          }
          return true;
        })
      );
      try {
        await db.delete(transactionTable).where(eq(transactionTable.category, _id));
        await db.delete(subscriptionTable).where(eq(subscriptionTable.category, _id));
        await db.delete(categoryTable).where(eq(categoryTable._id, _id));
      } catch (e) {
        captureException(e, {
          level: "error",
          tags: {
            location: "deleteCategory",
            file: "providers/DataProvider.tsx",
            action: "db-delete-category",
            timestamp: Date.now(),
          },
        });
        setCategory((prev) => prev.concat(cat));
        setTransaction((prev) => prev.concat(transactions));
        setSubscription((prev) => prev.concat(recurring));
      }
    },
    [setTransaction, setCategory, db]
  );

  const deleteAllData = useCallback(async () => {
    let cat: Category[];
    let trans: Transaction[] = [];
    let recurring: Subscription[] = [];
    setCategory((prev) => {
      cat = prev;
      return [];
    });
    setTransaction((prev) => {
      trans = prev;
      return [];
    });
    setSubscription((prev) => {
      recurring = prev;
      return [];
    });

    try {
      await db.delete(transactionTable);
      await db.delete(subscriptionTable);
      await db.delete(categoryTable);
      await db.delete(groupTable);
    } catch (e) {
      captureException(e, {
        level: "error",
        tags: {
          location: "deleteAllData",
          file: "providers/DataProvider.tsx",
          action: "db-delete-all-data",
          timestamp: Date.now(),
        },
      });
      setCategory((prev) => cat);
      setTransaction(trans);
      setSubscription(recurring);
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
        captureException(e, {
          level: "error",
          tags: {
            location: "addGroup",
            file: "providers/DataProvider.tsx",
            action: "db-insert-group",
            timestamp: Date.now(),
          },
        });
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
      setSubscription((prev) => prev.map((item) => (item.group === _id ? { ...item, group: null } : item)));
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
        await db.update(subscriptionTable).set({ group: null }).where(eq(subscriptionTable.group, _id));
        await db.delete(groupTable).where(eq(groupTable._id, _id));
      } catch (e) {
        captureException(e, {
          level: "error",
          tags: {
            location: "deleteGroup",
            file: "providers/DataProvider.tsx",
            action: "db-delete-group",
            timestamp: Date.now(),
          },
        });
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
        captureException(e, {
          level: "error",
          tags: {
            location: "updateGroup",
            file: "providers/DataProvider.tsx",
            action: "db-update-group",
            timestamp: Date.now(),
          },
        });
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
        subscription,
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
        addSubscription,
        updateSubscription,
        deleteSubscription,
        materializeDueSubscriptions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
