import {ScrollView, StyleSheet} from "react-native";
import React from "react";
import {useSettings} from "../providers/SettingsProvider";
import {useTranslation} from "react-i18next";
import SettingItem from "../components/SettingItem";

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackParamList} from "../navigators/StackNavigators";
import {Caption} from "react-native-paper";

type Props = NativeStackScreenProps<StackParamList, "FontSetting">;

const Setting = ({navigation}: Props) => {
  const {currency, language, theme, appLock, font} = useSettings();
  const {t} = useTranslation();
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <SettingItem
        label={t("fontSettings")}
        leftIcon="text"
        onPress={() => navigation.navigate("FontSetting")}
      >
        <Caption>{font}</Caption>
      </SettingItem>
      <SettingItem
        label={t("themeSettings")}
        leftIcon="text"
        onPress={() => navigation.navigate("ThemeSetting")}
      >
        <Caption>{theme}</Caption>
      </SettingItem>
      <SettingItem
        label={t("currency")}
        leftIcon="text"
        onPress={() => navigation.navigate("FontSetting")}
      >
        <Caption>{currency}</Caption>
      </SettingItem>
    </ScrollView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
});
