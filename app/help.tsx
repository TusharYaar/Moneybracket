// React & React Native
import { useCallback } from "react";
import { View, Text, ScrollView } from "react-native";

// Navigation
import { useFocusEffect, useNavigation } from "expo-router";

// Providers & Hooks
import { useTheme } from "providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { useHeader } from "providers/HeaderProvider";

const HelpScreen = () => {
  const { textStyle, colors } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "app.help" });
  const rootNavigation = useNavigation("/");
  const { headerHeight } = useHeader();

  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({ title: t("title"), headerRightBtn: [] });
    }, [])
  );

  return (
    <ScrollView
    contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 8, paddingTop: headerHeight + 8, backgroundColor: colors.screen }}
    >
      <Text style={textStyle.title}>{t("title")}</Text>
      <Text style={[textStyle.body, { marginVertical: 4 }]}>{t("transaction")}</Text>
    </ScrollView>
  );
};
export default HelpScreen;
