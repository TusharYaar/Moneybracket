import { Link } from "expo-router";
import { useTheme } from "providers/ThemeProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OnboardingScreen = () => {
  const { t } = useTranslation("", { keyPrefix: "app.onboarding.first" });
  const { colors, textStyle } = useTheme();
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingTop: top + 8, paddingBottom: bottom + 8, backgroundColor: colors.screen }]}
    >
        <Text>DEVELOPMENT SCREEN</Text>
        <Image source={require("assets/christmas-icon.png")} style={styles.image} />
        <View style={{ flex: 1 }}>
          <Text style={textStyle.title}>{t("welcome")}</Text>
          <Text style={textStyle.body}>{t("chooseLang")}</Text>
        </View>
      <Link href="/(onboarding)/second" style={[styles.button, { backgroundColor: colors.headerBackground }]} asChild>
        <Pressable>
          <Text style={[textStyle.bodyBold, { color: colors.headerText }]}>{t("start")}</Text>
        </Pressable>
      </Link>
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
  button: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
  },
});

export default OnboardingScreen;
