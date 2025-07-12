import React, { useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTheme } from "providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { useFocusEffect, useNavigation } from "expo-router";
import { useHeader } from "providers/HeaderProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TermsOfServiceScreen = () => {
  const { textStyle, colors } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "app.termsOfService" });
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
        paddingTop: headerHeight + 8,
        paddingBottom: bottom + 8,
        backgroundColor: colors.screen,
      }}
    >
      <View style={{ paddingHorizontal: 8 }}>
      <Text style={[textStyle.title, { marginVertical: 8 }]}>PLACEHOLDER_TOS</Text>
        <Text style={[textStyle.body, { marginVertical: 8 }]}>{t("lastUpdated")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 4 }]}>{t("acceptance")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("acceptanceText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 4 }]}>{t("description")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("descriptionText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 4 }]}>{t("userResponsibilities")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("userResponsibilitiesText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 4 }]}>{t("dataOwnership")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("dataOwnershipText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 4 }]}>{t("appUsage")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("appUsageText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 4 }]}>{t("intellectualProperty")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("intellectualPropertyText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 4 }]}>{t("disclaimer")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("disclaimerText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 4 }]}>{t("limitationOfLiability")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("limitationOfLiabilityText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 4 }]}>{t("termination")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("terminationText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 4 }]}>{t("changesToTerms")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("changesToTermsText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 4 }]}>{t("governingLaw")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("governingLawText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 4 }]}>{t("contactUs")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("contactUsText")}</Text>
      </View>
    </ScrollView>
  );
};

export default TermsOfServiceScreen;
