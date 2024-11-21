import { GestureHandlerRootView } from "react-native-gesture-handler";

import i18n from "../localization";
import { I18nextProvider } from "react-i18next";
import DataProvider from "providers/DataProvider";
// import ExchangeRatesProvider from "../providers/ExchangeRatesProvider";
import ThemeProvider from "providers/ThemeProvider";

import { Slot, useNavigationContainerRef } from "expo-router";
// import * as Sentry from "@sentry/react-native";
import { isRunningInExpoGo } from "expo";
import { useEffect } from "react";
import SettingsProvider from "providers/SettingsProvider";
import HeaderProvider from "providers/HeaderProvider";

// import { drizzle } from "drizzle-orm/expo-sqlite";
// import { openDatabaseSync } from "expo-sqlite/next";
// import migrations from '../drizzle/migrations';
// import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
// import { View } from "react-native";

// const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();
// Sentry.init({
//   dsn: "https://1135924f6142df8d80fdd3b1cce06446@o4507986483085312.ingest.de.sentry.io/4507986484920400",
//   debug: !__DEV__, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
//   integrations: [
//     new Sentry.ReactNativeTracing({
//       // Pass instrumentation to be used as `routingInstrumentation`
//       routingInstrumentation,
//       enableNativeFramesTracking: !isRunningInExpoGo(),
//       // ...
//     }),
//   ],
// });



// const expo = openDatabaseSync("MB.db");
// const db = drizzle(expo);

function RootLayout() {
  const ref = useNavigationContainerRef();
  // const { success, error } = useMigrations(db, migrations);
  useEffect(() => {
    if (ref) {
      // routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <SettingsProvider>
            {/* <ExchangeRatesProvider> */}
            <DataProvider>
              <HeaderProvider>
                <Slot />
              </HeaderProvider>
            </DataProvider>
            {/* </ExchangeRatesProvider> */}
          </SettingsProvider>
        </ThemeProvider>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}

export default RootLayout;

// export default Sentry.wrap(RootLayout);
