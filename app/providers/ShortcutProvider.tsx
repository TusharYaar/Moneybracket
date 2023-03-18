import React, { useContext, createContext, useMemo, useState, useCallback, useEffect } from "react";
import { Transaction } from "../realm/Transaction";
import QuickActions from "react-native-quick-actions";

import { useQuery, useRealm } from "../realm/index";

import { Shortcut } from "../realm/Shortcut";
import AddShortcut from "../components/AddShortcut";
import { useData } from "./DataProvider";
import { DeviceEventEmitter } from "react-native";
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
          title: `${action.currency}${action.amount} for ${action.category.title}`,
          icon: `${index + 1}.png`, // Icons instructions below
          userInfo: {
            url: JSON.stringify(action._id),
          },
        }))
      );
    }
  }, [_shortcut]);

  const addNewTransaction = useCallback(
    async ({ amount, date, note, category }) => {
      const img = "";
      realm.write(() => {
        if (category) {
          realm.create("Transaction", Transaction.generate(parseFloat(amount), "INR", date, note, category, false, ""));
        }
      });
    },
    [realm]
  );

  const handleQuickAction = useCallback((data: QuickActions.ShortcutItem) => {
    if (data) {
      console.log(data);
      if (data.type === "transaction") {
        const { amount, note, category } = shortcut.find((ac) => ac._id.equals(JSON.parse(data.userInfo.url)));
        if (amount) addNewTransaction({ amount, note, category, date: new Date() });
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
