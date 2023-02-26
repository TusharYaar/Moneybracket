import React, { useEffect } from "react";
import ThemeProvider from "./themes";
import LockProvider from "./providers/LockProvider";
import RealmProvider from "./realm";
import DataProvider from "./providers/DataProvider";
import ExchangeRatesProvider from "./providers/ExchangeRatesProvider";
import SettingsProvider from "./providers/SettingsProvider";

import AppDrawer from "./navigators/DrawerNavigator";

import { I18nextProvider } from "react-i18next";

import i18n from "./localization";
import Purchases from "react-native-purchases";
import FontProvider from "./providers/FontProvider";
const App = () => {
  useEffect(() => {
    Purchases.configure({ apiKey: "goog_wIRwIfvMBTyFmwKDVlzuKXFyKCU" });
  }, []);
  return (
    <RealmProvider>
      <SettingsProvider>
        <FontProvider>
          <ExchangeRatesProvider>
            <I18nextProvider i18n={i18n}>
              <ThemeProvider>
                <DataProvider>
                  <LockProvider>
                    <AppDrawer />
                  </LockProvider>
                </DataProvider>
              </ThemeProvider>
            </I18nextProvider>
          </ExchangeRatesProvider>
        </FontProvider>
      </SettingsProvider>
    </RealmProvider>
  );
};

export default App;
