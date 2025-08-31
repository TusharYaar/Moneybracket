import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { Link } from "expo-router";

import { useSettings } from "providers/SettingsProvider";
import { useTheme } from "providers/ThemeProvider";

import CurrencyItem from "@components/CurrencyItem";

import { CURRENCIES } from "data";

const SecondScreen = () => {
  const { bottom, top } = useSafeAreaInsets();
  const { colors, textStyle } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "app.onboarding.second" });
  const { currency, updateSettings } = useSettings();

  return (
    <View style={[styles.screen, { paddingBottom: bottom + 8, paddingTop: top + 8, paddingHorizontal: 8 }]}>
      <Text style={[textStyle.display, { color: colors.text }]}>{t("now")}</Text>
      <Text style={[textStyle.title, { color: colors.text }]}>{t("header")}</Text>
      <FlashList
        renderItem={({ item }) => (
          <CurrencyItem
            selected={currency.code === item.code}
            item={item}
            onPress={(item) => updateSettings("currency", item.code)}
            style={{ marginVertical: 8 }}
            baseCurrency={currency.code}
          />
        )}
        data={Object.values(CURRENCIES)}
      />
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

export default SecondScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  navBtnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
  },
});
