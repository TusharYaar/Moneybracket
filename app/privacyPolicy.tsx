import React, { useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTheme } from "providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { useFocusEffect, useNavigation } from "expo-router";
import { useHeader } from "providers/HeaderProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PrivacyPolicyScreen = () => {
  const { textStyle, colors } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "app.privacyPolicy" });
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
      <View style={{ paddingHorizontal: 8 }}>
        <Text style={[textStyle.title, { marginVertical: 8 }]}>PLACEHOLDER_POLICY</Text>

        <Text style={[textStyle.body, { marginVertical: 8 }]}>{t("lastUpdated")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 8 }]}>{t("informationWeCollect")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("informationWeCollectText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 8 }]}>{t("howWeUseInformation")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("howWeUseInformationText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 8 }]}>{t("dataStorage")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("dataStorageText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 8 }]}>{t("dataSharing")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("dataSharingText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 8 }]}>{t("yourRights")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("yourRightsText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 8 }]}>{t("security")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("securityText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 8 }]}>{t("changesToPolicy")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("changesToPolicyText")}</Text>

        <Text style={[textStyle.bodyBold, { marginTop: 16, marginBottom: 8 }]}>{t("contactUs")}</Text>
        <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("contactUsText")}</Text>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;
