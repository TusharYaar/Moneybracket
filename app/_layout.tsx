// React Native & Expo imports
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import * as Sentry from "@sentry/react-native";

// Localization
import i18n from "../localization";
import { I18nextProvider } from "react-i18next";
import { SplashScreen } from "expo-router";

// Providers
import DataProvider from "providers/DataProvider";
import ThemeProvider, { useTheme } from "providers/ThemeProvider";
import SettingsProvider, { useSettings } from "providers/SettingsProvider";
// import ExchangeRatesProvider from "../providers/ExchangeRatesProvider";

// Components
import Header from "@components/Header";
import { HeaderProvider } from "providers/HeaderProvider";
import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useEffect, useState } from "react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: "https://1135924f6142df8d80fdd3b1cce06446@o4507986483085312.ingest.de.sentry.io/4507986484920400",
  profilesSampleRate: 1.0,
});



const expo = openDatabaseSync("MB.db");
const db = drizzle(expo);


function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  // const ref = useNavigationContainerRef();
  // const rootNavigationState = useRootNavigationState()
  // const { success, error } = useMigrations(db, migrations);
  // useEffect(() => {
  //   if (ref) {
  //     routingInstrumentation.registerNavigationContainer(ref);
  //   }
  // }, [ref]);
  const { colors } = useTheme();
  const { appLockType, isAppLocked, isFirstLaunch } = useSettings();
  // console.log(typeof isFirstLaunch, isFirstLaunch !== "true")
  return (
    <Stack screenOptions={{ header: (props) => <Header {...props} />, contentStyle: { backgroundColor: colors.screen } }}>
      {/* <Stack.Protected guard={isFirstLaunch === "true"} >
        <Stack.Screen name="(onboarding)/first" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)/second" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)/third" options={{ headerShown: false }} />
      </Stack.Protected> */}
      <Stack.Protected guard={true}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="addTransaction" />
          <Stack.Screen name="about" />
          <Stack.Screen name="help" />
          <Stack.Screen name="addCategory" />
          <Stack.Screen name="addGroup" />
          <Stack.Screen name="backup" />
          <Stack.Screen name="export" />
          <Stack.Screen name="addRecurring" />
        <Stack.Protected guard={false}>
          <Stack.Screen name="locked" />
        </Stack.Protected>
      </Stack.Protected>
       <Stack.Screen name="privacyPolicy" />
       <Stack.Screen name="termsOfService" />
    </Stack>
  );
}


function ProviderWrapper() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <SettingsProvider>
            <HeaderProvider>
              {/* <ExchangeRatesProvider> */}
              <DataProvider>
                <RootLayout />
              </DataProvider>
            </HeaderProvider>
          </SettingsProvider>
        </ThemeProvider>
      </I18nextProvider>
    </GestureHandlerRootView>
  )
}

export default ProviderWrapper;
