import React, { useCallback } from "react";

import { View, Image, Text, ScrollView } from "react-native";
import { useTheme } from "providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { Link, useFocusEffect, useNavigation } from "expo-router";
import { useHeader } from "providers/HeaderProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SettingItem from "@components/SettingItem";

const AboutScreen = () => {
  const { textStyle, colors } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "app.about" });
  const rootNavigation = useNavigation("/");
  const { headerHeight } = useHeader();
  const { bottom } = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({ title: t("title"), headerRightBtn: [] });
    }, [])
  );

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 8,
        paddingBottom: bottom + 8,
        paddingTop: headerHeight + 8,
        backgroundColor: colors.screen,
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image source={require("assets/christmas-icon.png")} style={{ width: 100, height: 100, borderRadius: 8 }} />
      </View>
      <View style={{ paddingHorizontal: 8 }}>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("description")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("openSource")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("adFree")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("paidOptions")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("support")}</Text>

        <Link href="privacyPolicy" asChild>
          <SettingItem label={t("privacyPolicy")} leftIcon="privacyPolicy" rightIcon="arrowRight" ></SettingItem>
        </Link>

        <Link href="termsOfService" asChild>
          <SettingItem label={t("termsOfService")} leftIcon="termsOfService" rightIcon="arrowRight"></SettingItem>
        </Link>
      </View>
    </ScrollView>
  );
};
export default AboutScreen;
