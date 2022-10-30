import React from "react";
import App from "./App";
import ThemeProvider from "./themes";
import {store} from "./store";
import {Provider as StoreProvider} from "react-redux";
import LockProvider from "./providers/LockProvider";
import RealmProvider from "./realm";
import DataProvider from "./providers/DataProvider";
const AppContainer = () => {
  return (
    <RealmProvider>
      <DataProvider>
        <StoreProvider store={store}>
          <ThemeProvider>
            <LockProvider>
              <App />
            </LockProvider>
          </ThemeProvider>
        </StoreProvider>
      </DataProvider>
    </RealmProvider>
  );
};

export default AppContainer;
