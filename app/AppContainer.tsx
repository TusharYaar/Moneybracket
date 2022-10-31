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
      <ThemeProvider>
        <DataProvider>
          <StoreProvider store={store}>
            <LockProvider>
              <App />
            </LockProvider>
          </StoreProvider>
        </DataProvider>
      </ThemeProvider>
    </RealmProvider>
  );
};

export default AppContainer;
