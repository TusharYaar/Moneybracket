import { Link } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SecondScreen = () => {
  const { t } = useTranslation("", { keyPrefix: "app.onboarding.second" });
  const { colors, textStyle } = useTheme();
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingTop: top + 8, paddingBottom: bottom + 8, backgroundColor: colors.screen }]}
    >
      <Text>DEVELOPMENT SCREEN</Text>
      <View style={{ flex: 1 }}>
        <Text style={textStyle.title}>{t("underDevelopment")}</Text>
        <Text style={textStyle.body}>{t("text")}</Text>
      </View>
      <View style={styles.navBtnContainer}>
        <Link
          href="/(onboarding)/first"
          style={[styles.button, { backgroundColor: colors.headerBackground }]}
          asChild
          dismissTo={true}
        >
          <Pressable>
            <Text style={[textStyle.bodyBold, { color: colors.headerText }]}>{t("back")}</Text>
          </Pressable>
        </Link>
        <Link href="/(onboarding)/third" style={[styles.button, { backgroundColor: colors.headerBackground }]} asChild>
          <Pressable>
            <Text style={[textStyle.bodyBold, { color: colors.headerText }]}>{t("next")}</Text>
          </Pressable>
        </Link>
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

export default SecondScreen;
