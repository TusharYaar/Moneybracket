import { Category } from "../realm/Category";
import { Transaction } from "../realm/Transaction";

import { Platform } from "react-native";
import { BackupFile } from "../types";

export const generateBackupFile = (
  category: Realm.Results<Category>,
  transaction: Realm.Results<Transaction>,
  settings: any
) => {
  const bcategory = category.map((cat) => cat.toJSON()) as BackupFile["category"];
  //   TODO: ADD SUPPORT FOR IMAGE
  const btrans = transaction.map((tran) => ({
    ...tran.toJSON(),
    category: JSON.stringify(tran.category._id) as string,
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
    const categories = data.category.map((cat) => ({ ...cat, _id: new Realm.BSON.ObjectId(cat._id) }));
    const transactions = data.transaction.map((tran) => {
      return { ...tran, _id: new Realm.BSON.ObjectId(tran._id) };
    });
    return {
      categories,
      transactions,
    };
  } else throw new Error("Wrong Backup File");
};
