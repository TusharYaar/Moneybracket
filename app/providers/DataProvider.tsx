import React, {useContext, createContext} from "react";
import {Category} from "../realm/Category";
import {Transaction} from "../realm/Transaction";

import {useQuery} from "../realm/index";
type Props = {
  category: Realm.Results<Category & Realm.Object<unknown>>;
  transaction: Realm.Results<Transaction>;
};

const DataContext = createContext<Props>({
  category: [] as unknown as Realm.Results<Category>,
  transaction: [] as unknown as Realm.Results<Transaction>,
});

export const useData = () => useContext(DataContext);

const DataProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const category = useQuery(Category);
  const transaction = useQuery(Transaction);

  return (
    <DataContext.Provider value={{category, transaction}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
