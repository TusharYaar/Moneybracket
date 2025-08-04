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
import { useEffect, useMemo } from "react";
import migrations from "drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import ExchangeRatesProvider from "providers/ExchangeRatesProvider";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: "https://1135924f6142df8d80fdd3b1cce06446@o4507986483085312.ingest.de.sentry.io/4507986484920400",
  profilesSampleRate: 1.0,
});

const expo = openDatabaseSync("MB.db");
const db = drizzle(expo);

function RootLayout() {
  const { success } = useMigrations(db, migrations);
  useEffect(() => {
    if (success) {
      SplashScreen.hideAsync();
    }
  }, [success]);

  // useEffect(() => {
  //   if (ref) {
  //     routingInstrumentation.registerNavigationContainer(ref);
  //   }
  // }, [ref]);
  const { colors } = useTheme();
  const { appLockType, isAppLocked, isFirstLaunch } = useSettings();
  const guard = useMemo(() => {
    let showOnboarding = false;
    let showApp = false;
    let showLockScreen = false;
    if (isFirstLaunch === "true" && __DEV__) showOnboarding = true;
    else {
      if (isAppLocked === "true" && appLockType !== "DISABLE") {
        showLockScreen = true;
      } else {
        showApp = true;
      }
    }
    return {
      showOnboarding,
      showLockScreen,
      showApp,
    };
  }, [appLockType, isAppLocked, isFirstLaunch]);
  return (
    <Stack
      screenOptions={{ header: (props) => <Header {...props} />, contentStyle: { backgroundColor: colors.screen } }}
    >
      <Stack.Protected guard={guard.showOnboarding}>
        <Stack.Screen name="(onboarding)/first" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)/second" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)/third" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={guard.showApp}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="addTransaction" />
        <Stack.Screen name="about" />
        <Stack.Screen name="help" />
        <Stack.Screen name="addCategory" />
        <Stack.Screen name="addGroup" />
        <Stack.Screen name="backup" />
        <Stack.Screen name="export" />
        <Stack.Screen name="addRecurring" />
        <Stack.Screen name="listTransactions" />
      </Stack.Protected>
      <Stack.Protected guard={guard.showLockScreen}>
        <Stack.Screen name="locked" options={{ headerShown: false }}/>
      </Stack.Protected>
      <Stack.Protected guard={__DEV__}>
        {/* TODO: remove this guard */}
        <Stack.Screen name="privacyPolicy" />
        <Stack.Screen name="termsOfService" />
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
            <HeaderProvider>
              <ExchangeRatesProvider>
              <DataProvider>
                <RootLayout />
              </DataProvider>
              </ExchangeRatesProvider>
            </HeaderProvider>
          </SettingsProvider>
        </ThemeProvider>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}

export default ProviderWrapper;
