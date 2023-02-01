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

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const App = () => {
  const [fontsLoaded] = useFonts({
    "Caveat-Bold": require("./assets/fonts/Caveat-Bold.ttf"),
    "Caveat-Medium": require("./assets/fonts/Caveat-Medium.ttf"),
    "FiraCode-Medium": require("./assets/fonts/FiraCode-Medium.ttf"),
    "FiraCode-Regular": require("./assets/fonts/FiraCode-Regular.ttf"),
    "Lexend-Regular": require("./assets/fonts/Lexend-Regular.ttf"),
    "Lexend-SemiBold": require("./assets/fonts/Lexend-SemiBold.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "NotoSans-Bold": require("./assets/fonts/NotoSans-Bold.ttf"),
    "NotoSans-Medium": require("./assets/fonts/NotoSans-Medium.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "ZillaSlab-Medium": require("./assets/fonts/ZillaSlab-Medium.ttf"),
    "ZillaSlab-Regular": require("./assets/fonts/ZillaSlab-Regular.ttf"),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) await SplashScreen.hideAsync();
    };
    hideSplashScreen();
  }, [fontsLoaded]);
  return (
    <RealmProvider>
      <SettingsProvider>
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
      </SettingsProvider>
    </RealmProvider>
  );
};

export default App;
