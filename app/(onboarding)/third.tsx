import { Link } from "expo-router";
import { useSettings } from "providers/SettingsProvider";
import { useTheme } from "providers/ThemeProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ThirdScreen = () => {
  const { t } = useTranslation("", { keyPrefix: "app.onboarding.third" });
  const { colors, textStyle } = useTheme();
  const { bottom, top } = useSafeAreaInsets();
  const { updateSettings } = useSettings();

  return (
    <View
      style={[styles.container, { paddingTop: top + 8, paddingBottom: bottom + 8, backgroundColor: colors.screen }]}
    >
      <Text>DEVELOPMENT SCREEN</Text>
      <View style={{ flex: 1 }}>
        <Text style={textStyle.body}>{t("text")}</Text>
      </View>
      <View style={styles.navBtnContainer}>
        <Link
          href="/(onboarding)/second"
          style={[styles.button, { backgroundColor: colors.headerBackground }]}
          asChild
          dismissTo={true}
        >
          <Pressable>
            <Text style={[textStyle.bodyBold, { color: colors.headerText }]}>{t("back")}</Text>
          </Pressable>
        </Link>
        <Pressable
          style={[styles.button, { backgroundColor: colors.headerBackground }]}
          onPress={() => updateSettings("isFirstLaunch", "false")}
        >
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

export default ThirdScreen;
