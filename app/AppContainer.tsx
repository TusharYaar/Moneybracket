import React, {useEffect} from "react";
import App from "./App";
import ThemeProvider from "./themes";
import LockProvider from "./providers/LockProvider";
import RealmProvider from "./realm";
import DataProvider from "./providers/DataProvider";
import ExchangeRatesProvider from "./providers/ExchangeRatesProvider";
import SettingsProvider from "./providers/SettingsProvider";
import {I18nextProvider} from "react-i18next";

import i18n from "./localization";
import codePush, {DownloadProgress} from "react-native-code-push";
let AppContainer = () => {
  // useEffect(() => {
  //   const codePushStatusDidChange = (status: any) => {
  //     switch (status) {
  //       case codePush.SyncStatus.CHECKING_FOR_UPDATE:
  //         console.log("Checking for updates.");
  //         break;
  //       case codePush.SyncStatus.DOWNLOADING_PACKAGE:
  //         console.log("Downloading package.");
  //         break;
  //       case codePush.SyncStatus.INSTALLING_UPDATE:
  //         console.log("Installing update.");
  //         break;
  //       case codePush.SyncStatus.UP_TO_DATE:
  //         console.log("Up-to-date.");
  //         break;
  //       case codePush.SyncStatus.UPDATE_INSTALLED:
  //         console.log("Update installed.");
  //         break;
  //     }
  //   };

  //   const codePushDownloadDidProgress = (progress: DownloadProgress) => {
  //     console.log(
  //       progress.receivedBytes + " of " + progress.totalBytes + " received.",
  //     );
  //   };
  //   const syncImmediate = () => {
  //     console.log("synced");
  //     codePush.sync(
  //       {
  //         installMode: codePush.InstallMode.IMMEDIATE,
  //         updateDialog: {
  //           appendReleaseDescription: true,
  //           optionalUpdateMessage: "Updates here..",
  //           title: "New Updates",
  //           optionalInstallButtonLabel: "Yes",
  //           optionalIgnoreButtonLabel: "No",
  //         },
  //       },
  //       codePushStatusDidChange,
  //       codePushDownloadDidProgress,
  //     );
  //   };
  //   syncImmediate();
  // }, []);
  return (
    <RealmProvider>
      <SettingsProvider>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <DataProvider>
              <ExchangeRatesProvider>
                <LockProvider>
                  <App />
                </LockProvider>
              </ExchangeRatesProvider>
            </DataProvider>
          </ThemeProvider>
        </I18nextProvider>
      </SettingsProvider>
    </RealmProvider>
  );
};

AppContainer = codePush(AppContainer);

export default AppContainer;
