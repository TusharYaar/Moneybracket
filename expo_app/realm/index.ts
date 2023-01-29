import {createRealmContext} from "@realm/react";
import {Category} from "./Category";
import {Transaction} from "./Transaction";

const {RealmProvider, useObject, useQuery, useRealm} = createRealmContext({
  schema: [Category, Transaction],
  deleteRealmIfMigrationNeeded: true,
});

export default RealmProvider;
export {useObject, useRealm, useQuery};