import React from "react";
import App from "./App";
import ThemeProvider from "./themes";
import LockProvider from "./providers/LockProvider";
import RealmProvider from "./realm";
import DataProvider from "./providers/DataProvider";
import ExchangeRatesProvider from "./providers/ExchangeRatesProvider";
import SettingsProvider from "./providers/SettingsProvider";
// import {I18nextProvider} from "react-i18next";

import i18n from "./localization";
import { View, Text } from "react-native";
let AppContainer = () => {
  return (
    <RealmProvider>
      <SettingsProvider>
        <ExchangeRatesProvider>
          {/* <I18nextProvider i18n={i18n}> */}
          <ThemeProvider>
            <DataProvider>
              <LockProvider>
                <App />
              </LockProvider>
            </DataProvider>
          </ThemeProvider>
          {/* </I18nextProvider> */}
        </ExchangeRatesProvider>
      </SettingsProvider>
    </RealmProvider>
  );
};

export default AppContainer;
