import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

import i18n from "../localization";
import { I18nextProvider } from "react-i18next";

import DataProvider from "../providers/DataProvider";
import ExchangeRatesProvider from "../providers/ExchangeRatesProvider";
import ThemeProvider from "../providers/ThemeProvider";

// Realm
import { Category } from "../realm/Category";
import { Shortcut } from "../realm/Shortcut";
import { Transaction } from "../realm/Transaction";
import { RealmProvider } from "@realm/react";
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <RealmProvider schema={[Category, Shortcut, Transaction]} closeOnUnmount={false}>
            {/* <ExchangeRatesProvider> */}
              <DataProvider>
                <SafeAreaProvider>
                  <Slot />
                </SafeAreaProvider>
              </DataProvider>
            {/* </ExchangeRatesProvider> */}
          </RealmProvider>
        </ThemeProvider>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}