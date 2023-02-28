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
import { getInfoAsync, makeDirectoryAsync } from "expo-file-system";
import { BACKUP_DIRECTORY, EXPORTS_DIRECTORY, FONTS_DIRECTORY, IMAGES_DIRECTORY } from "./data";
// import FontProvider from "./providers/FontProvider";
Purchases.configure({ apiKey: "goog_wIRwIfvMBTyFmwKDVlzuKXFyKCU" });
const App = () => {
  useEffect(() => {
    const validateDirectoryExists = async (dir: string) => {
      const { exists } = await getInfoAsync(dir);
      if (!exists) {
        await makeDirectoryAsync(dir, { intermediates: true });
      }
      // return;
    };

    [EXPORTS_DIRECTORY, FONTS_DIRECTORY, BACKUP_DIRECTORY, IMAGES_DIRECTORY].every((dir) =>
      validateDirectoryExists(dir)
    );
  }, []);

  return (
    <ThemeProvider>
      {/* <FontProvider> */}
      <RealmProvider>
        <SettingsProvider>
          <ExchangeRatesProvider>
            <I18nextProvider i18n={i18n}>
              <DataProvider>
                <LockProvider>
                  <AppDrawer />
                </LockProvider>
              </DataProvider>
            </I18nextProvider>
          </ExchangeRatesProvider>
        </SettingsProvider>
      </RealmProvider>
      {/* </FontProvider> */}
    </ThemeProvider>
  );
};

export default App;
