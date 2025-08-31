import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePostHog } from "posthog-react-native";
import { useTranslation } from "react-i18next";
import { Link } from "expo-router";

import { useSettings } from "providers/SettingsProvider";
import { useTheme } from "providers/ThemeProvider";

const ForthScreen = () => {
  const { t } = useTranslation("", { keyPrefix: "app.onboarding.forth" });
  const { colors, textStyle } = useTheme();
  const { bottom, top } = useSafeAreaInsets();
  const { updateSettings } = useSettings();
  const posthog = usePostHog();

  const handleStart = () => {
    posthog.capture("onboarding_complete");
    updateSettings("isFirstLaunch", "false");
  };

  return (
    <View
      style={[styles.container, { paddingTop: top + 8, paddingBottom: bottom + 8, backgroundColor: colors.screen }]}
    >
      <Text style={[textStyle.display, { textAlign: "center", color: colors.text }]}>{t("thankyou")}</Text>
      <View style={{ flex: 1 }}>
        <Text style={textStyle.body}>{t("text1")}</Text>
        <Text style={textStyle.body}>{t("text2")}</Text>
      </View>
      <View style={styles.navBtnContainer}>
        <Link
          href="/(onboarding)/third"
          style={[styles.button, { backgroundColor: colors.headerBackground }]}
          asChild
          dismissTo={true}
        >
          <Pressable>
            <Text style={[textStyle.bodyBold, { color: colors.headerText }]}>{t("back")}</Text>
          </Pressable>
        </Link>
        <Pressable style={[styles.button, { backgroundColor: colors.headerBackground }]} onPress={handleStart}>
          <Text style={[textStyle.bodyBold, { color: colors.headerText }]}>{t("letStart")}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 8,
  },
  navBtnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
  },
});

export default ForthScreen;
