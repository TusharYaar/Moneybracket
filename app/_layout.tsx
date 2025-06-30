import { GestureHandlerRootView } from "react-native-gesture-handler";

import i18n from "../localization";
import { I18nextProvider } from "react-i18next";
import DataProvider from "providers/DataProvider";
// import ExchangeRatesProvider from "../providers/ExchangeRatesProvider";
import ThemeProvider from "providers/ThemeProvider";

import { SplashScreen, Stack } from "expo-router";
import * as Sentry from "@sentry/react-native";
import SettingsProvider, { useSettings } from "providers/SettingsProvider";
import Header from "@components/Header";
import { useState } from "react";
// import HeaderProvider from "providers/HeaderProvider";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: "https://1135924f6142df8d80fdd3b1cce06446@o4507986483085312.ingest.de.sentry.io/4507986484920400",
  profilesSampleRate: 1.0,
});



// const expo = openDatabaseSync("MB.db");
// const db = drizzle(expo);

let isFirstLaunch = "false";

function RootLayout() {
  // const ref = useNavigationContainerRef();
  // const rootNavigationState = useRootNavigationState()
  // const { success, error } = useMigrations(db, migrations);
  // useEffect(() => {
  //   if (ref) {
  //     routingInstrumentation.registerNavigationContainer(ref);
  //   }
  // }, [ref]);
  const { appLock } = useSettings();
  const [unlocked, setUnlocked] = useState(appLock === "DISABLE");
  return (

    <Stack screenOptions={{ header: (props) => <Header {...props} /> }}>
      {/* TODO: Change guard to isFirstLaunch !== "true" */}
      <Stack.Protected guard={true}>
        <Stack.Protected guard={true}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="addTransaction" />
          <Stack.Screen name="about" />
          <Stack.Screen name="help" />
          <Stack.Screen name="addCategory" />
          <Stack.Screen name="addGroup" />
          <Stack.Screen name="backup" />
          <Stack.Screen name="export" />
        </Stack.Protected>
        <Stack.Protected guard={!unlocked}>
          <Stack.Screen name="locked" />
        </Stack.Protected>
      </Stack.Protected>
      <Stack.Protected guard={__DEV__}>
        <Stack.Protected guard={isFirstLaunch === "true"} >
          <Stack.Screen name="(onboarding)/first" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)/second" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)/third" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Screen name="addRecurring" />
      </Stack.Protected>
    </Stack>
  );
}


function ProviderWrapper() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <SettingsProvider>
            {/* <ExchangeRatesProvider> */}
            <DataProvider>
              <RootLayout />
            </DataProvider>
          </SettingsProvider>
        </ThemeProvider>
      </I18nextProvider>
    </GestureHandlerRootView>
  )
}

export default ProviderWrapper;
