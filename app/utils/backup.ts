import { Category } from "../realm/Category";
import { Transaction } from "../realm/Transaction";

import { Platform } from "react-native";
import { BackupFile } from "../types";

export const generateBackupFile = (
  category: Realm.Results<Category>,
  transaction: Realm.Results<Transaction>,
  settings: any
) => {
  const bcategory = category.map((cat) => ({
    title: cat.title,
    type: cat.type,
    color: cat.color,
    icon: cat.icon,
  })) as BackupFile["category"];
  //   TODO: ADD SUPPORT FOR IMAGE
  const btrans = transaction.map((tran) => ({
    amount: tran.amount,
    currency: tran.currency,
    date: tran.date.toUTCString(),
    createdAt: tran.createdAt.toString(),
    note: tran.note,
    category: tran.category.title,
    isFavorite: tran.isFavorite,
    image: "",
  }));

  let backup: BackupFile = {
    createdOn: new Date(),
    app: "com.tusharyaar.moneybracket",
    platform: Platform.OS,
    version: Platform.Version,
    includeImages: false,
    settings: settings,
    category: bcategory,
    transaction: btrans,
  };
  return backup;
};

export const readBackupFile = async (file: string) => {
  const data = JSON.parse(file) as BackupFile;
  if (data && data?.app === "com.tusharyaar.moneybracket") {
    const categories = data.category;
    const transactions = data.transaction;

    if (Array.isArray(categories) && Array.isArray(transactions)) {
      let validCategories: BackupFile["category"] = [];
      let invalidCategories = [];

      let validTransactions: BackupFile["transaction"] = [];
      let invalidTransactions = [];

      categories.forEach((category) => {
        const isValid = validateCategory(category);
        if (isValid) {
          const _category = category as BackupFile["category"][0];
          validCategories.push(_category);
        } else invalidCategories.push(category);
      });

      const titles = validCategories.map((cat) => cat.title);

      transactions.forEach((trans) => {
        const isValid = validateTransactions(trans, titles);

        if (isValid) {
          const _trans = trans as BackupFile["transaction"][0];
          validTransactions.push(_trans);
        } else invalidTransactions.push(trans);
      });

      return {
        validCategories,
        invalidCategories: invalidCategories.length,
        validTransactions,
        invalidTransactions: invalidTransactions.length,
      };
    }
  }
  throw new Error("Wrong Backup File");
};

const validateCategory = (category: any) => {
  const requiredProperties: (keyof BackupFile["category"][0])[] = [
    "title",
    "color",
    "icon",
    "type",
    "isFavorite",
    "createdAt",
  ];

  requiredProperties.forEach((property) => {
    if (category[property] === undefined || category[property] === null) return false;
  });
  return true;
};

const validateTransactions = (transaction: any, categoryTitles: string[]) => {
  const requiredProperties: (keyof BackupFile["transaction"][0])[] = [
    "category",
    "amount",
    "currency",
    "date",
    "note",
    "isFavorite",
    "createdAt",
    "image",
  ];
  requiredProperties.forEach((property) => {
    if (transaction[property] === undefined || transaction[property] === null) return false;
  });
  if (categoryTitles.includes(transaction?.category)) return true;
};
