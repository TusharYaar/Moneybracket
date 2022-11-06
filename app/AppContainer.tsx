import React from "react";
import App from "./App";
import ThemeProvider from "./themes";
import LockProvider from "./providers/LockProvider";
import RealmProvider from "./realm";
import DataProvider from "./providers/DataProvider";
import ExchangeRatesProvider from "./providers/ExchangeRatesProvider";
const AppContainer = () => {
  return (
    <ExchangeRatesProvider>
      <RealmProvider>
        <ThemeProvider>
          <DataProvider>
            <LockProvider>
              <App />
            </LockProvider>
          </DataProvider>
        </ThemeProvider>
      </RealmProvider>
    </ExchangeRatesProvider>
  );
};

export default AppContainer;
