import { GestureHandlerRootView } from "react-native-gesture-handler";

import i18n from "../localization";
import { I18nextProvider } from "react-i18next";
import DataProvider from "providers/DataProvider";
// import ExchangeRatesProvider from "../providers/ExchangeRatesProvider";
import ThemeProvider from "providers/ThemeProvider";

import { Slot, SplashScreen } from "expo-router";
import * as Sentry from "@sentry/react-native";
import SettingsProvider from "providers/SettingsProvider";
import HeaderProvider from "providers/HeaderProvider";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: "https://1135924f6142df8d80fdd3b1cce06446@o4507986483085312.ingest.de.sentry.io/4507986484920400",
  profilesSampleRate: 1.0,
});



// const expo = openDatabaseSync("MB.db");
// const db = drizzle(expo);

function RootLayout() {
  // const ref = useNavigationContainerRef();
  // const { success, error } = useMigrations(db, migrations);
  // useEffect(() => {
  //   if (ref) {
  //     routingInstrumentation.registerNavigationContainer(ref);
  //   }
  // }, [ref]);
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

export default Sentry.wrap(RootLayout);
