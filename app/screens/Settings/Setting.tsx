import { ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { useSettings } from "../../providers/SettingsProvider";
import { useTranslation } from "react-i18next";
import SettingItem from "../../components/SettingItem";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigators/StackNavigators";
import { Text } from "react-native-paper";
import { useRealm } from "../../realm";
import { Category } from "../../realm/Category";
import { Dcategories } from "../../data/dummy";
import COLORS from "../../data/colors";
import { ICONS } from "../../data";
import { Transaction } from "../../realm/Transaction";
import { useData } from "../../providers/DataProvider";
import { generateDummyTransaction } from "../../utils/dummy";

import AVALIBLE_FONTS from "../../themes/fonts/index";
import AVALIBLE_THEMES from "../../themes/themes";
import DeleteDialog from "../../components/DeleteDialog";
import CurrencyModal from "../../components/CurrencyModal";
import LanguageModal from "../../components/LanguageModal";
import DateFormatModal from "../../components/DateFormatModal";

type Props = NativeStackScreenProps<StackParamList, "FontSetting">;

const Setting = ({ navigation }: Props) => {
  const { currency, language, theme, appLock, font, dateFormat, updateCurrency, updateLanguage, updateDateFormat } =
    useSettings();
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

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <SettingItem label={t("font")} leftIcon="text" onPress={() => navigation.navigate("FontSetting")}>
        <Text>{AVALIBLE_FONTS.find((f) => f.id === font)?.name}</Text>
      </SettingItem>
      <SettingItem label={t("theme")} leftIcon="color-fill-outline" onPress={() => navigation.navigate("ThemeSetting")}>
        <Text>{AVALIBLE_THEMES.find((t) => t.id === theme)?.name}</Text>
      </SettingItem>
      <SettingItem label={t("currency")} leftIcon="text" onPress={() => setCurrencyModal(true)}>
        <Text>{currency.name}</Text>
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
      <SettingItem label={t("backup")} leftIcon="archive-outline" onPress={() => navigation.navigate("BackupScreen")} />
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
      />
      <DateFormatModal
        visible={dateModal}
        onDismiss={() => setDateModal(false)}
        onItemSelect={handleUpdateDateFormat}
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
