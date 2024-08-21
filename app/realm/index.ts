import { createRealmContext } from "@realm/react";
import { Category } from "./Category";
import { Shortcut } from "./Shortcut";
import { Transaction } from "./Transaction";

const RealmProvider = createRealmContext({
  schema: [Category, Transaction, Shortcut],
  deleteRealmIfMigrationNeeded: true,
});

export default RealmProvider;