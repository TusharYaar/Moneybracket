import React from "react";
import App from "./App";
import ThemeProvider from "./themes";
import LockProvider from "./providers/LockProvider";
import RealmProvider from "./realm";
import DataProvider from "./providers/DataProvider";
const AppContainer = () => {
  return (
    <RealmProvider>
      <ThemeProvider>
        <DataProvider>
          <LockProvider>
            <App />
          </LockProvider>
        </DataProvider>
      </ThemeProvider>
    </RealmProvider>
  );
};

export default AppContainer;
