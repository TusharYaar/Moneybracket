import React, { useContext, createContext, useMemo, useState, useCallback, useEffect } from "react";
import { Transaction } from "../realm/Transaction";
import QuickActions from "react-native-quick-actions";

import { useQuery, useRealm } from "../realm/index";

import { Shortcut } from "../realm/Shortcut";
import AddShortcut from "../components/Modals/AddShortcut";
import { useData } from "./DataProvider";
import { DeviceEventEmitter } from "react-native";
import { Category } from "../realm/Category";
type Props = {
  shortcut: Realm.Results<Shortcut>;
  showAddShortcutModal: (item?: Shortcut) => void;
};

const SchortcutContext = createContext<Props>({
  shortcut: [] as unknown as Realm.Results<Shortcut>,
  showAddShortcutModal: () => {},
});

export const useSchortcut = () => useContext(SchortcutContext);

const SchortcutProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { category } = useData();
  const realm = useRealm();
  const _shortcut = useQuery(Shortcut);
  const shortcut = useMemo(() => _shortcut.sorted("amount"), [_shortcut]);

  const [addShortcut, setAddShortcut] = useState<{
    visible: boolean;
    item: Shortcut | undefined;
  }>({
    visible: false,
    item: undefined,
  });

  const showAddShortcutModal = useCallback((item?: Shortcut) => {
    if (item) setAddShortcut({ item, visible: true });
    else setAddShortcut({ item: undefined, visible: true });
  }, []);

  const dismissAddShortcutModal = useCallback(() => {
    setAddShortcut((prev) => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => {
    QuickActions.clearShortcutItems();
    if (_shortcut.length > 0) {
      QuickActions.setShortcutItems(
        _shortcut.map((action, index) => ({
          type: "transaction",
          title: action.title ? action.title : "Shortcut",
          icon: action.icon, // Icons instructions below
          userInfo: {
            url: action._id.toHexString(),
          },
        }))
      );
    }
  }, [_shortcut]);

  const addNewTransaction = useCallback(
    async (amount: number, currency: string, date: Date, note: string, category: Category) => {
      const img = "";
      realm.write(() => {
        if (category) {
          realm.create("Transaction", Transaction.generate(amount, currency, date, note, category, false, img));
        }
      });
    },
    [realm]
  );

  const handleQuickAction = useCallback((data: QuickActions.ShortcutItem) => {
    if (data) {
      console.log(data);
      if (data.type === "transaction") {
        const action = shortcut.find((sc) => sc._id.toHexString() === data.userInfo.url);
        if (action) addNewTransaction(action.amount, action.currency, new Date(), action.note, action.category);
      }
    }
  }, []);

  useEffect(() => {
    DeviceEventEmitter.addListener("quickActionShortcut", handleQuickAction);
    return DeviceEventEmitter.removeAllListeners;
  }, []);

  return (
    <SchortcutContext.Provider
      value={{
        shortcut,
        showAddShortcutModal,
      }}
    >
      <AddShortcut
        category={category}
        item={addShortcut.item}
        visible={addShortcut.visible}
        onDismiss={dismissAddShortcutModal}
      />
      {children}
    </SchortcutContext.Provider>
  );
};

export default SchortcutProvider;
