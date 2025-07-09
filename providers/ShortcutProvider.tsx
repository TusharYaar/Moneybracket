import React, { useContext, createContext, useMemo, useState, useCallback, useEffect } from "react";
import { Category, Shortcut, Transaction } from "types";
// import * as QuickActions from "expo-quick-actions";

// import { useQuery} from "@realm/react";

// import { Shortcut } from "../realm/Shortcut";
// import AddShortcut from "../components/Modals/AddShortcut";
import { useData } from "./DataProvider";
// import { DeviceEventEmitter } from "react-native";
type Props = {
  shortcuts: Shortcut[];
  showAddShortcutModal: (item?: Shortcut) => void;
};

const SchortcutContext = createContext<Props>({
  shortcuts: [],
  showAddShortcutModal: () => {},
});

export const useSchortcut = () => useContext(SchortcutContext);

const SchortcutProvider = ({ children }: { children: React.ReactNode }) => {
  const { category } = useData();
  // const realm = useRealm();
  const shortcuts = useMemo(() => [], []);

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
    // QuickActions.clearShortcutItems();
    // if (_shortcut.length > 0) {
    //   QuickActions.setShortcutItems(
    //     _shortcut.map((action, index) => ({
    //       type: "transaction",
    //       title: action.title ? action.title : "Shortcut",
    //       icon: action.icon, // Icons instructions below
    //       userInfo: {
    //         url: action._id.toHexString(),
    //       },
    //     }))
    //   );
    // }
  }, []);

  const addNewTransaction = useCallback(
    async (amount: number, currency: string, date: Date, note: string, category: Category) => {
      const img = "";
      // realm.write(() => {
      //   if (category) {
      //     realm.create("Transaction", Transaction.generate(amount, currency, date, note, category, false, img));
      //   }
      // });
    },
    []
  );

  // const handleQuickAction = useCallback((data: QuickActions.ShortcutItem) => {
  //   if (data) {
  //     console.log(data);
  //     if (data.type === "transaction") {
  //       const action = shortcut.find((sc) => sc._id.toHexString() === data.userInfo.url);
  //       if (action) addNewTransaction(action.amount, action.currency, new Date(), action.note, action.category);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    // DeviceEventEmitter.addListener("quickActionShortcut", handleQuickAction);
    // return DeviceEventEmitter.removeAllListeners;
  }, []);

  return (
    <SchortcutContext.Provider
      value={{
        shortcuts,
        showAddShortcutModal,
      }}
    >
      {/* <AddShortcut
        category={category}
        item={addShortcut.item}
        visible={addShortcut.visible}
        onDismiss={dismissAddShortcutModal}
      /> */}
      {children}
    </SchortcutContext.Provider>
  );
};

export default SchortcutProvider;
