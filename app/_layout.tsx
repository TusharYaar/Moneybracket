// React Native & Expo imports
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack, useNavigationContainerRef } from "expo-router";
import * as Sentry from "@sentry/react-native";
import { PostHogProvider, usePostHog } from "posthog-react-native";
import { Platform } from "react-native";

// Localization
import i18n from "../localization";
import { I18nextProvider } from "react-i18next";
import { SplashScreen } from "expo-router";

// Providers
import { HeaderProvider } from "providers/HeaderProvider";
import DataProvider, { useData } from "providers/DataProvider";
import ThemeProvider, { useTheme } from "providers/ThemeProvider";
import SettingsProvider, { useSettings } from "providers/SettingsProvider";
import ExchangeRatesProvider from "providers/ExchangeRatesProvider";
import { nativeApplicationVersion } from "expo-application";
// Components
import Header from "@components/Header";
import { useEffect, useMemo } from "react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const navigationIntegration = Sentry.reactNavigationIntegration();
Sentry.init({
  dsn: "https://1135924f6142df8d80fdd3b1cce06446@o4507986483085312.ingest.de.sentry.io/4507986484920400",
  profilesSampleRate: 1.0,
  debug: __DEV__,
  enabled: !__DEV__,
  environment: __DEV__ ? "development" : "production",
});

function RootLayout() {
  const {migration_success, migration_error, fetchData} = useData();
  const posthog = usePostHog();
  useEffect(() => {
    if (migration_success) {
      SplashScreen.hideAsync();
      fetchData();
      // Send this if app active for more than 15sec
      const timeout = setTimeout(() => {
        posthog.capture("app_loaded", {
          app_version: nativeApplicationVersion,
          platform: Platform.OS,
          platform_version: Platform.Version,
        });
      },10000)
      return () => clearInterval(timeout)
    }
    if (migration_error) {
      Sentry.captureException(migration_error, {
        level: "fatal",
        tags: {
          location: "root_layout",
          file: "_layout.tsx",
          action: "migration-error",
          timestamp: Date.now(),
        },
      });
    }
  }, [migration_success, migration_error]);

  const ref = useNavigationContainerRef();
  useEffect(() => {
    if (ref) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

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
        <Stack.Screen name="locked" options={{ headerShown: false }} />
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
                  <PostHogProvider
                    apiKey="phc_5BtmQjQRUCikOwM1ZDXmjlVHjnC2OgJPncdj0IO8t0D"
                    options={{
                      host: "https://us.i.posthog.com",
                      disabled: __DEV__,
                    }}
                  >
                    <RootLayout />
                  </PostHogProvider>
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
