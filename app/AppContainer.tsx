import React from "react";
import App from "./App";
import ThemeProvider from "./themes";
import {store} from "./store";
import {Provider as StoreProvider} from "react-redux";
import LockProvider from "./providers/LockProvider";
import RealmProvider from "./realm";
const AppContainer = () => {
  return (
    // <SettingProvider>
    <RealmProvider>
      <StoreProvider store={store}>
        <ThemeProvider>
          <LockProvider>
            <App />
          </LockProvider>
        </ThemeProvider>
      </StoreProvider>
    </RealmProvider>
  );
};

export default AppContainer;
