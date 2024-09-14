import React, { useCallback, useState } from "react";
import { useSettings } from "../../../../providers/SettingsProvider";
import { useTranslation } from "react-i18next";

import { isEnrolledAsync, authenticateAsync } from "expo-local-authentication";
import SettingItem from "../../../../components/SettingItem";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../../../navigators/StackNavigators";
import { Switch, Text } from "react-native-paper";
// import { useRealm } from "@realm/react";
// import { Category } from "../../../../realm/Category";
import { Dcategories } from "../../../../data/dummy";
// import { Transaction } from "../../../../realm/Transaction";
import { useData } from "../../../../providers/DataProvider";
import { generateDummyTransaction } from "../../../../utils/dummy";

import { ALL_FONTS, ICONS, COLORS } from "../../../../data";

import DeleteDialog from "../../../../components/DeleteDialog";
import CurrencyModal from "../../../../components/Modals/CurrencyModal";
import LanguageModal from "../../../../components/Modals/LanguageModal";
import DateFormatModal from "../../../../components/Modals/DateFormatModal";
import { useCustomTheme } from "../../../../providers/ThemeProvider";
import CollapsibleHeaderScrollView from "@components/CollapsibleHeaderScrollView";
import { useRouter } from "expo-router";

type Props = NativeStackScreenProps<StackParamList, "FontSetting">;

const Setting = () => {
  const { currency, language, appLock, dateFormat, updateCurrency, updateLanguage, updateDateFormat, updateLock } =
    useSettings();
  const { theme, font } = useCustomTheme();
  const { category } = useData();
  const { t, i18n } = useTranslation("", { keyPrefix: "screens.settings.setting" });
  const { t: wt } = useTranslation();
  const [deleteModal, setDeleteModal] = useState(false);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);


  const router = useRouter();

  const addDummyCategories = useCallback(() => {
    // realm.write(() => {
    //   Dcategories.forEach((cat) => {
    //     realm.create(
    //       "Category",
    //       Category.generate(
    //         cat.title,
    //         cat.type,
    //         COLORS[Math.floor(Math.random() * COLORS.length)],
    //         ICONS[Math.floor(Math.random() * ICONS.length)]
    //       )
    //     );
    //   });
    // });
  }, []);

  const addDummy = useCallback(() => {
    // realm.write(() => {
    //   const trans = generateDummyTransaction();
    //   trans.forEach((element) => {
    //     realm.create(
    //       "Transaction",
    //       Transaction.generate(
    //         // element.amount,
    //         13,
    //         currency.code,
    //         new Date(),
    //         // element.date,
    //         "dummy transaction",
    //         category[Math.floor(Math.random() * category.length)]
    //       )
    //     );
    //   });
    // });
  }, []);

  const dismissModal = useCallback(() => {
    setDeleteModal(false);
  }, []);

  const handleDeleteAllData = useCallback(() => {
    // deleteAllData();
    dismissModal();
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
          // enqueueSnackbar("APPLOCK_UPDATE_SUCCESS");
          return updateLock(true);
        } else {
          // if (valid.error === "user_cancel") return enqueueSnackbar("APPLOCK_USER_CANCEL");
        }
      }
      //  else enqueueSnackbar("APPLOCK_DEVICE_NOT_ENROLL");
    }
    updateLock(false);
  }, []);

  return (
    <CollapsibleHeaderScrollView
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 112 }}
      title="Settings"
      paddingTop={16}
    >
      <SettingItem
        label={t("font")}
        leftIcon="text"
        onPress={() => router.push("font")}
        style={{ borderTopLeftRadius: theme.roundness * 4, borderTopRightRadius: theme.roundness * 4 }}
      >
        <Text>{ALL_FONTS.find((f) => f.id === font)?.name}</Text>
      </SettingItem>
      <SettingItem label={t("theme")} leftIcon="color-fill-outline" onPress={() => router.push("ThemeSetting")}>
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
      {__DEV__ && <SettingItem label={t("deleteAllData")} leftIcon="text" onPress={() => setDeleteModal(true)} />}
      {__DEV__ && (
        <SettingItem
          label={t("export")}
          leftIcon="albums-outline"
          onPress={() => router.push("ExportScreen")}
        />
      )}
      <SettingItem
        label={t("backup")}
        leftIcon="archive-outline"
        onPress={() => router.push("BackupScreen")}
        style={{ borderBottomLeftRadius: theme.roundness * 4, borderBottomRightRadius: theme.roundness * 4 }}
      />

      <DeleteDialog
        visible={deleteModal}
        deleteAction={handleDeleteAllData}
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
    </CollapsibleHeaderScrollView>
  );
};

export default Setting;
