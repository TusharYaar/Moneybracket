import { Platform } from "react-native";
import { BackupFile, Category, Group, Transaction } from "../types";
import { nativeBuildVersion, nativeApplicationVersion } from "expo-application";
import { parseISO } from "date-fns";

export const generateBackupFile = (category: Category[], transaction: Transaction[], group: Group[], settings: any) => {
  const bcategory = category.map((cat) => ({
    title: cat.title,
    type: cat.type,
    color: cat.color,
    icon: cat.icon,
    description: cat.description ? cat.description : "",
    isFavorite: cat.isFavorite,
    _id: cat._id,
  }));

  const bgroup = group.map((grp) => ({
    title: grp.title,
    color: grp.color,
    icon: grp.icon,
    description: grp.description ? grp.description : "",
    isFavorite: grp.isFavorite,
    _id: grp._id,
  }));

  //   TODO: ADD SUPPORT FOR IMAGE
  const btrans = transaction.map((tran) => ({
    amount: tran.amount,
    currency: tran.currency,
    category: tran.category,
    group: tran.group ? tran.group : null,
    isFavorite: false,
    // image: "",
    _id: tran._id,
    note: tran.note ? tran.note : "",
    date: tran.date.toISOString(),
    // isFavorite: boolean;
  }));

  let backup: BackupFile = {
    createdOn: new Date(),
    app: "com.tusharyaar.moneybracket",
    platform: Platform.OS,
    version: Platform.Version,
    appVersion: nativeApplicationVersion,
    appBuildVersion: nativeBuildVersion,
    includeImages: false,
    settings: settings,
    category: bcategory,
    group: bgroup,
    transaction: btrans,
  };
  return backup;
};

export const readBackupFile = (file: string) => {
  const data = JSON.parse(file) as BackupFile;
  if (!data || data?.app !== "com.tusharyaar.moneybracket") throw new Error("wrong_backup_file");
  if (nativeBuildVersion && data.appBuildVersion && parseInt(nativeBuildVersion) < parseInt(data.appBuildVersion))
    throw new Error("new_backup_file_old_app");
  if (!Array.isArray(data.category) || !Array.isArray(data.group) || !Array.isArray(data.transaction))
    throw new Error("corrupt_data");
  if (Platform.OS !== data.platform) throw new Error("not_compatible_across_platforms");


  const category: Omit<Category, "createdAt" | "updatedAt">[] = [];
  const group: Omit<Group, "createdAt" | "updatedAt">[] = [];
  const transaction: Omit<Transaction, "createdAt" | "updatedAt">[]  = [];

  const categoryMap:Record<string,boolean> = {};
  const groupMap:Record<string,boolean> = {};

  data.category.forEach((cat) => {
    const isValid = isValidCategory(cat);
    if (isValid) {
      category.push(cat);
      categoryMap[cat._id] = true;
    }
  });

  data.group.forEach((grp) => {
    const isValid = isValidGroup(grp);
    if (isValid) {
      group.push(grp);
      groupMap[grp._id] = true;
    }
  });
  
  data.transaction.forEach((trans) => {
    const isValid = isValidTransaction(trans,categoryMap, groupMap);
    if (isValid) {
      const _trans = trans as BackupFile["transaction"][0];
      transaction.push({..._trans, date: parseISO(_trans.date)});
    }
  });

  return {
    category,
    group,
    transaction
  };
};

const isValidCategory = (category: any) => {
  const requiredProperties: (keyof BackupFile["category"][0])[] = [
    "title",
    "_id",
    "color",
    "icon",
    "description",
    "type",
    "isFavorite",
  ];

  requiredProperties.forEach((property) => {
    if (category[property] === undefined || category[property] === null) return false;
  });
  return true;
};
const isValidGroup = (category: any) => {
  const requiredProperties: (keyof BackupFile["group"][0])[] = [
    "title",
    "_id",
    "color",
    "icon",
    "description",
    "isFavorite",
  ];

  requiredProperties.forEach((property) => {
    if (category[property] === undefined || category[property] === null) return false;
  });
  return true;
};

const isValidTransaction = (transaction: any, categoryMap: Record<string,boolean>, groupMap: Record<string, boolean>) => {
  const requiredProperties: (keyof BackupFile["transaction"][0])[] = ["category", "amount", "currency", "date", "note"];
  requiredProperties.forEach((property) => {
    if (transaction[property] === undefined || transaction[property] === null) return false;
  });
  if (!categoryMap[transaction["category"]]) return false;

  if (transaction["group"]?.length > 0 && !groupMap[transaction["group"]]) return false;
  return true;

};
