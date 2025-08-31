import Icon from "@components/Icon";
import { Link } from "expo-router";
import { useSettings } from "providers/SettingsProvider";
import { useTheme } from "providers/ThemeProvider";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OnboardingScreen = () => {
  const { t } = useTranslation("", { keyPrefix: "app.onboarding.first" });
  const { t: wt } = useTranslation();
  const { colors, textStyle } = useTheme();
  const { updateSettings, theme, language } = useSettings();
  const { bottom, top } = useSafeAreaInsets();

  const changeLanguage = useCallback((lang: string) => {
    updateSettings("language", lang);
  }, []);
  return (
    <View style={[styles.screen, { paddingTop: top + 8, paddingBottom: bottom + 8, backgroundColor: colors.screen }]}>
      <Pressable
        onPress={() => updateSettings("theme", theme === "default" ? "dark" : "default")}
        style={{
          backgroundColor: colors.tabbarBackgroundSecondary,
          padding: 8,
          borderRadius: 4,
          alignSelf: "flex-end",
          aspectRatio: 1,
        }}
      >
        <Icon name={theme === "default" ? "themeLight" : "themeDark"} size={36} />
      </Pressable>
      <View style={[styles.container, { justifyContent: "flex-start", alignItems: "center" }]}>
        <Image source={require("assets/christmas-icon.png")} style={styles.image} />
        <Text style={[textStyle.display, { color: colors.text, marginVertical: 16 }]}>{t("welcome")}</Text>
        <Text style={[textStyle.body, { textAlign: "center" }]}>{t("text1")}</Text>
      </View>
      <View style={[styles.container, { justifyContent: "flex-end", alignItems: "center" }]}>
        <Text style={[textStyle.title, { marginVertical: 8 }]}>{t("chooseLang")}</Text>
        <Pressable
          style={[
            styles.option,
            {
              backgroundColor: language === "en" ? colors.tabbarBackgroundSecondary : colors.screen,
              marginVertical: 4,
              borderColor: colors.tabbarBackgroundSecondary,
            },
          ]}
          onPress={() => changeLanguage("en")}
        >
          <Text style={[textStyle.bodyBold, { color: colors.text }]}>{wt("english")}</Text>
        </Pressable>
        <Pressable
          style={[
            styles.option,
            {
              backgroundColor: language === "hi" ? colors.tabbarBackgroundSecondary : colors.screen,
              marginVertical: 4,
              borderColor: colors.tabbarBackgroundSecondary,
              borderWidth: 4,
            },
          ]}
          onPress={() => changeLanguage("hi")}
        >
          <Text style={[textStyle.bodyBold, { color: colors.text }]}>{wt("hindi")}</Text>
        </Pressable>
        <Pressable
          style={[
            styles.option,
            {
              backgroundColor: language === "es" ? colors.tabbarBackgroundSecondary : colors.screen,
              marginVertical: 4,
              marginBottom: 40,
              borderColor: colors.tabbarBackgroundSecondary,
            },
          ]}
          onPress={() => changeLanguage("es")}
        >
          <Text style={[textStyle.bodyBold, { color: colors.text }]}>{wt("spanish")}</Text>
        </Pressable>
      </View>
      <View style={{ width: "100%", justifyContent: "flex-end", flexDirection: "row" }}>
        <Link
          href="/(onboarding)/second"
          style={[styles.button, { backgroundColor: colors.headerBackground, width: "50%" }]}
          asChild
        >
          <Pressable>
            <Text style={[textStyle.bodyBold, { color: colors.headerText }]}>{t("next")}</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    flexDirection: "column",
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
  option: {
    borderRadius: 8,
    borderWidth: 4,
    padding: 10,
    width: "100%",
  },
});

export default OnboardingScreen;
