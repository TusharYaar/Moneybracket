import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSettings } from "providers/SettingsProvider";
import { useTranslation } from "react-i18next";

import { authenticateAsync, getEnrolledLevelAsync } from "expo-local-authentication";
import SettingItem from "@components/SettingItem";

import { Dcategories } from "data/dummy";
import { useData } from "providers/DataProvider";

import { ALL_FONTS, ICONS, COLORS, DATE, CURRENCIES, ALL_THEMES } from "data";
import { nativeBuildVersion, nativeApplicationVersion } from "expo-application";

import { useTheme } from "providers/ThemeProvider";
import CollapsibleHeaderScrollView from "@components/CollapsibleHeaderScrollView";
import { useFocusEffect, useRouter } from "expo-router";
import { View, Switch, Text, StyleSheet, Pressable } from "react-native";
import BottomSheet, { BottomSheetFlatList, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useHeader } from "providers/HeaderProvider";
import { generateDummyTransaction } from "@utils/dummy";
import { Category, Transaction } from "types";
import DeleteContainer from "@components/DeleteContainer";
import { startOfDay } from "date-fns";
import { getPermissionsAsync, requestPermissionsAsync } from "expo-notifications";

const OPTIONS: Record<string, { label: string; value: string }[]> = {
  dateFormat: DATE.map((d) => ({ label: d, value: d })),
  font: ALL_FONTS.filter((d) => d.isVisible).map((d) => ({ label: d.name, value: d.id })),
  theme: ALL_THEMES.filter((d) => d.isVisible).map((d) => ({ label: d.name, value: d.id })),
  language: [
    { label: "English", value: "en" },
    { label: "Hindi", value: "hi" },
    { label: "Spanish", value: "es" },
  ],
  icon: Object.keys(ICONS).map((k) => ({ label: k, value: k })),
  currency: Object.values(CURRENCIES).map((cur) => ({ label: cur.code, value: cur.name })),
};

const Setting = () => {
  const { updateSettings, ...settings } = useSettings();
  const { textStyle, colors } = useTheme();
  const { addCategory, category, addTransaction, deleteAllData } = useData();
  const { t } = useTranslation("", { keyPrefix: "app.stack.tabs.settings" });
  const { t: wt } = useTranslation();
  const { header, tabbar, setHeaderRightButtons, setHeaderTitle } = useHeader();
  const [selectList, setSelectList] = useState({
    visible: false,
    menu: "dateFormat",
    selected: "",
  });
  const [hasBiometrics, setHasBiometrics] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setHeaderRightButtons([]);
      setHeaderTitle(t("title"));
    }, [])
  );
  const router = useRouter();
  const selectListRef = useRef<BottomSheet>(null);

  const addDummyCategories = useCallback(() => {
    const cats: Omit<Category, "_id">[] = [];
    Dcategories.forEach((cat, index) => {
      const date = startOfDay(new Date());
      cats.push({
        ...cat,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        createdAt: date,
        updatedAt: date,
        isFavorite: false,
        icon: `icon_${Math.floor(Math.random() * 98)}`,
      });
    });
    addCategory(cats);
  }, [addCategory]);

  const addDummyTransactions = useCallback(() => {
    const trans = generateDummyTransaction();
    let _trans = trans.map((element) => ({
      ...element,
      category: category[Math.floor(Math.random() * category.length)]._id,
    })) as Omit<Transaction, "_id">[];
    addTransaction(_trans);
  }, [addTransaction]);

  const handleDeleteAllData = useCallback(() => {
    selectListRef.current?.close();
    setSelectList((prev) => ({ ...prev, visible: false }));
    deleteAllData();
  }, [deleteAllData]);

  const handleToggleLock = useCallback(
    async (value: boolean) => {
      if (value) {
        const result = await getEnrolledLevelAsync();
        if (result > 0) {
          const valid = await authenticateAsync({ promptMessage: "Authenticate to enable app lock" });
          if (valid.success === true) {
            updateSettings("appLock", "PIN");
          }
        }
      } else {
        const valid = await authenticateAsync({ promptMessage: "Authenticate to disable app lock" });
        if (valid.success === true) {
          updateSettings("appLock", "DISABLE");
        }
      }
    },
    [updateSettings]
  );

  const handleToggleBiometrics = useCallback(async (value: boolean) => {
    const valid = await authenticateAsync({
      promptMessage: "Authenticate to enable app lock",
      biometricsSecurityLevel: "strong",
      disableDeviceFallback: true,
      cancelLabel: "Cancel",
    });
    if (valid.success) {
      if (value) {
        updateSettings("appLock", "BIOMETRIC");
      } else {
        updateSettings("appLock", "PIN");
      }
    }
  }, []);
  useEffect(() => {
    getEnrolledLevelAsync().then((result) => {
      setHasBiometrics(result === 3);
    });
  }, []);

  const showSelectList = useCallback(
    (menu: string, selected: string) => {
      if (menu === "delete") {
        selectListRef.current?.snapToIndex(0);
      } else {
        const len = OPTIONS[menu].length;
        selectListRef.current?.snapToIndex(len > 4 ? (len > 10 ? 3 : 2) : 1);
      }
      setSelectList({ visible: true, menu, selected });
    },
    [selectListRef, setSelectList]
  );

  const handleItemSelect = useCallback(
    (key: string, value: string) => {
      updateSettings(key, value);
      selectListRef.current?.close();
      setSelectList((prev) => ({ ...prev, visible: false }));
    },
    [updateSettings, setSelectList, selectListRef]
  );

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />, []);

  const handleOnAnimate = useCallback(
    (_, to: number) => {
      if (to === 3) header.hide();
      else header.show();
      if (to === -1) tabbar.show();
      else tabbar.hide();
    },
    [header]
  );

  const hasNotificationPermission = useCallback(async () => {
    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus === "granted") {
      return true;
    }
    return false;
  }, []);

  const handleToggleNotification = useCallback(
    async (value: boolean) => {
      if (value) {
        const perm = await hasNotificationPermission();
        if (perm) {
          updateSettings("notificationEnable", "ENABLE");
        }
      } else {
        updateSettings("notificationEnable", "DISABLE");
      }
    },
    [updateSettings]
  );

  const handleToggleReminderNotification = useCallback(async (value: boolean) => {
    if (value) {
      const perm = await hasNotificationPermission();
      if (perm) {
        updateSettings("reminderNotificationEnable", "ENABLE");
      }
    } else {
      updateSettings("reminderNotificationEnable", "DISABLE");
    }
  }, []);

  return (
    <>
      <CollapsibleHeaderScrollView
        contentContainerStyle={{ paddingHorizontal: 8 }}
        paddingVertical={0}
        style={{ backgroundColor: colors.screen }}
      >
        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>{t("appearance")}</Text>
          <SettingItem label={t("font")} leftIcon="font" onPress={() => showSelectList("font", settings.font)}>
            <Text style={textStyle.body}>{OPTIONS.font.find((f) => f.value === settings.font)?.label}</Text>
          </SettingItem>
          <SettingItem label={t("theme")} leftIcon="theme" onPress={() => showSelectList("theme", settings.theme)}>
            <Text style={textStyle.body}>{OPTIONS.theme.find((f) => f.value === settings.theme)?.label}</Text>
          </SettingItem>
          <SettingItem label={t("icon")} leftIcon="icon" onPress={() => showSelectList("icon", settings.icon)}>
            <Text style={textStyle.body}>{settings.icon}</Text>
          </SettingItem>
        </View>

        {__DEV__ && (
          <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
            <Text style={textStyle.title}>{t("developer")}</Text>
            <SettingItem label="add dummy category" leftIcon="buildVersion" onPress={addDummyCategories}></SettingItem>

            <SettingItem
              label="add dummy transactions"
              leftIcon="buildVersion"
              onPress={addDummyTransactions}
            ></SettingItem>

            <SettingItem label={t("siteMap")} leftIcon="about" onPress={() => router.push("_sitemap")} />
          </View>
        )}
        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>{t("preference")}</Text>
          <SettingItem
            label={t("currency")}
            leftIcon="currency"
            onPress={() => showSelectList("currency", settings.currency.code)}
          >
            <Text style={textStyle.body}>{settings.currency.name}</Text>
          </SettingItem>
          <SettingItem
            label={t("language")}
            leftIcon="language"
            onPress={() => showSelectList("language", settings.language)}
          >
            <Text style={textStyle.body}>{wt(`languages.${settings.language}`)}</Text>
          </SettingItem>

          <SettingItem
            label={t("dateFormat")}
            leftIcon="date"
            onPress={() => showSelectList("dateFormat", settings.dateFormat)}
          >
            <Text style={textStyle.body}>{settings.dateFormat}</Text>
          </SettingItem>
          {/* <SettingItem
            label={t("enableNotification")}
            leftIcon="date"
            onPress={() => showSelectList("dateFormat", settings.dateFormat)}
          >
            <Switch value={settings.notificationEnable === "ENABLE"} onValueChange={handleToggleNotification} />
          </SettingItem> */}
          <SettingItem label={t("reminderNotification")} leftIcon="notification">
            <Switch
              value={settings.reminderNotificationEnable === "ENABLE"}
              onValueChange={handleToggleReminderNotification}
            />
          </SettingItem>
        </View>

        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>{t("security")}</Text>
          <SettingItem label={t("lock")} leftIcon="lock">
            <Switch value={settings.appLock !== "DISABLE"} onValueChange={handleToggleLock} />
          </SettingItem>

          <SettingItem label={t("biometricLock")} leftIcon="lock">
            <Switch
              value={settings.appLock === "BIOMETRIC"}
              disabled={!hasBiometrics || settings.appLock === "DISABLE"}
              onValueChange={handleToggleBiometrics}
            />
          </SettingItem>
        </View>
        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>{t("dataManagement")}</Text>

          {__DEV__ && <SettingItem label={t("export")} leftIcon="export" onPress={() => router.push("stack/export")} />}
          <SettingItem label={t("backup")} leftIcon="backup" onPress={() => router.push("stack/backup")} />

          <SettingItem
            label={t("deleteAllData")}
            leftIcon="delete"
            onPress={() => showSelectList("delete", "")}
            testId="delete-all-data"
          />
        </View>

        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>{t("about")}</Text>

          {__DEV__ && <SettingItem label={t("help")} leftIcon="help" onPress={() => router.push("stack/help")} />}

          <SettingItem label={t("about")} leftIcon="about" onPress={() => console.log("About")} />

          <SettingItem label={t("appVersion")} leftIcon="appVersion">
            <Text style={textStyle.body}>{nativeApplicationVersion}</Text>
          </SettingItem>

          <SettingItem label={t("buildVersion")} leftIcon="buildVersion">
            <Text style={textStyle.body}>{nativeBuildVersion}</Text>
          </SettingItem>
        </View>
      </CollapsibleHeaderScrollView>
      <BottomSheet
        ref={selectListRef}
        snapPoints={[225, "40%", "69%", "100%"]}
        index={-1}
        backdropComponent={renderBackdrop}
        style={{ backgroundColor: colors.screen }}
        onAnimate={handleOnAnimate}
        enableHandlePanningGesture={selectList.menu === "delete" ? false : true}
      >
        {selectList.menu === "delete" && (
          <DeleteContainer
            text={t("deleteText")}
            title={t("deleteTitle")}
            onComfirm={handleDeleteAllData}
            onCancel={() => selectListRef.current?.close()}
            cancel={t("cancel")}
            color={colors.sectionBackground}
            confirm={t("confirm")}
          />
        )}
        {selectList.menu !== "delete" && (
          <BottomSheetFlatList
            style={{ backgroundColor: colors.screen }}
            contentContainerStyle={{ padding: 16 }}
            data={OPTIONS[selectList.menu]}
            renderItem={({ item }) => (
              <Pressable
                key={item.value}
                onPress={() => handleItemSelect(selectList.menu, item.value)}
                style={[
                  styles.selectItem,
                  {
                    backgroundColor: selectList.selected === item.value ? colors.sectionBackground : undefined,
                    borderColor: colors.sectionBackground,
                  },
                ]}
              >
                <View>
                  <Text style={textStyle.title}>{item.label}</Text>
                </View>
              </Pressable>
            )}
          />
        )}
      </BottomSheet>
    </>
  );
};

export default Setting;

const styles = StyleSheet.create({
  section: {
    marginVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  selectItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    marginVertical: 8,
  },
});
