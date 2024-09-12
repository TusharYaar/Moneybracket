import React from "react";
import ThemeProvider from "./providers/ThemeProvider";
import LockProvider from "./providers/LockProvider";
import {RealmProvider} from '@realm/react';
import DataProvider from "./providers/DataProvider";
import ExchangeRatesProvider from "./providers/ExchangeRatesProvider";

import  Category from "./realm/Category";
import  Shortcut from "./realm/Shortcut";
import  Transaction  from "./realm/Transaction";

import SettingsProvider from "./providers/SettingsProvider";

import AppDrawer from "./navigators/DrawerNavigator";

import { I18nextProvider } from "react-i18next";

import i18n from "./localization";
// import Purchases from "react-native-purchases";
import SchortcutProvider from "./providers/ShortcutProvider";
// Purchases.configure({ apiKey: "goog_wIRwIfvMBTyFmwKDVlzuKXFyKCU" });
const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <RealmProvider schema={[Category, Shortcut, Transaction]}>
          <SettingsProvider>
            <ExchangeRatesProvider>
              <DataProvider>
                <SchortcutProvider>
                  <LockProvider>
                    <AppDrawer />
                  </LockProvider>
                </SchortcutProvider>
              </DataProvider>
            </ExchangeRatesProvider>
          </SettingsProvider>
        </RealmProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
