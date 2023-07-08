import { ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { useSettings } from "../../providers/SettingsProvider";
import { useTranslation } from "react-i18next";

import { isEnrolledAsync, authenticateAsync } from "expo-local-authentication";
import SettingItem from "../../components/SettingItem";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigators/StackNavigators";
import { Switch, Text } from "react-native-paper";
import { useRealm } from "../../realm";
import { Category } from "../../realm/Category";
import { Dcategories } from "../../data/dummy";
import { Transaction } from "../../realm/Transaction";
import { useData } from "../../providers/DataProvider";
import { generateDummyTransaction } from "../../utils/dummy";

import { ALL_FONTS, ICONS, COLORS } from "../../data";

import DeleteDialog from "../../components/DeleteDialog";
import CurrencyModal from "../../components/CurrencyModal";
import LanguageModal from "../../components/LanguageModal";
import DateFormatModal from "../../components/DateFormatModal";
import { useCustomTheme } from "../../providers/ThemeProvider";

type Props = NativeStackScreenProps<StackParamList, "FontSetting">;

const Setting = ({ navigation }: Props) => {
  const { currency, language, appLock, dateFormat, updateCurrency, updateLanguage, updateDateFormat, updateLock } =
    useSettings();
  const { enqueueSnackbar, theme, currentFont } = useCustomTheme();
  const { t, i18n } = useTranslation("", { keyPrefix: "screens.settings.setting" });
  const { t: wt } = useTranslation();
  const [deleteModal, setDeleteModal] = useState(false);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);

  const realm = useRealm();

  const { category } = useData();

  const addDummyCategories = useCallback(() => {
    realm.write(() => {
      Dcategories.forEach((cat) => {
        realm.create(
          "Category",
          Category.generate(
            cat.title,
            cat.type,
            COLORS[Math.floor(Math.random() * COLORS.length)],
            ICONS[Math.floor(Math.random() * ICONS.length)]
          )
        );
      });
    });
  }, [realm]);

  const addDummy = useCallback(() => {
    realm.write(() => {
      const trans = generateDummyTransaction();
      trans.forEach((element) => {
        realm.create(
          "Transaction",
          Transaction.generate(
            element.amount,
            currency.code,
            element.date,
            "dummy transaction",
            category[Math.floor(Math.random() * category.length)]
          )
        );
      });
    });
  }, [realm]);

  const dismissModal = useCallback(() => {
    setDeleteModal(false);
  }, []);

  const deleteAllData = useCallback(() => {
    realm.write(() => {
      realm.deleteAll();
      dismissModal();
    });
  }, []);

  const handleUpdateLanguage = useCallback((lang: string) => {
    updateLanguage(lang);
    i18n.changeLanguage(lang);
    setLanguageModal(false);
  }, []);
  const handleUpdateDateFormat = useCallback((format: string) => {
    updateDateFormat(format);
    setDateModal(false);
  }, []);

  const handleToggleLock = useCallback(async (value: boolean) => {
    if (value) {
      const result = await isEnrolledAsync();
      if (result) {
        const valid = await authenticateAsync();
        if (valid.success === true) {
          enqueueSnackbar("APPLOCK_UPDATE_SUCCESS");
          return updateLock(true);
        } else {
          if (valid.error === "user_cancel") return enqueueSnackbar("APPLOCK_USER_CANCEL");
        }
      } else enqueueSnackbar("APPLOCK_DEVICE_NOT_ENROLL");
    }
    updateLock(false);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <SettingItem
        label={t("font")}
        leftIcon="text"
        onPress={() => navigation.navigate("FontSetting")}
        style={{ borderTopLeftRadius: theme.roundness * 4, borderTopRightRadius: theme.roundness * 4 }}
      >
        <Text>{ALL_FONTS.find((f) => f.id === currentFont)?.name}</Text>
      </SettingItem>
      <SettingItem label={t("theme")} leftIcon="color-fill-outline" onPress={() => navigation.navigate("ThemeSetting")}>
        <Text>{theme.name}</Text>
      </SettingItem>
      <SettingItem label={t("currency")} leftIcon="text" onPress={() => setCurrencyModal(true)}>
        <Text>{currency.name}</Text>
      </SettingItem>

      <SettingItem label={t("lock")} leftIcon="lock-open-outline">
        <Switch value={appLock === "ENABLE"} onValueChange={handleToggleLock} />
      </SettingItem>
      <SettingItem label={t("language")} leftIcon="language" onPress={() => setLanguageModal(true)}>
        <Text>{wt(`languages.${language}`)}</Text>
      </SettingItem>
      <SettingItem label={t("dateFormat")} leftIcon="calendar-outline" onPress={() => setDateModal(true)}>
        <Text>{dateFormat}</Text>
      </SettingItem>
      {__DEV__ && <SettingItem label={"dummy Categories"} leftIcon="text" onPress={addDummyCategories} />}
      {__DEV__ && category.length > 0 && <SettingItem label={"dummy Trans"} leftIcon="text" onPress={addDummy} />}
      <SettingItem label={t("deleteAllData")} leftIcon="text" onPress={() => setDeleteModal(true)} />
      <SettingItem label={t("export")} leftIcon="albums-outline" onPress={() => navigation.navigate("ExportScreen")} />
      <SettingItem
        label={t("backup")}
        leftIcon="archive-outline"
        onPress={() => navigation.navigate("BackupScreen")}
        style={{ borderBottomLeftRadius: theme.roundness * 4, borderBottomRightRadius: theme.roundness * 4 }}
      />
      <DeleteDialog
        visible={deleteModal}
        deleteAction={deleteAllData}
        cancelAction={dismissModal}
        body={t("confirmDeleteBody")}
        title={t("confirmDeleteTitle")}
      />
      <CurrencyModal
        visible={currencyModal}
        onDismiss={() => setCurrencyModal(false)}
        onItemSelect={(item) => updateCurrency(item)}
      />
      <LanguageModal
        visible={languageModal}
        onDismiss={() => setLanguageModal(false)}
        onItemSelect={handleUpdateLanguage}
        current={language}
      />
      <DateFormatModal
        visible={dateModal}
        onDismiss={() => setDateModal(false)}
        onItemSelect={handleUpdateDateFormat}
        current={dateFormat}
      />
    </ScrollView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 8,
  },
});
