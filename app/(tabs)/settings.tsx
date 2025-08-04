import React, { useCallback, useEffect, useRef, useState } from "react";

// React Native & 3rd Party UI
import { View, Switch, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import BottomSheet, { BottomSheetFlatList, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

// Navigation
import { useFocusEffect, useNavigation, useRouter } from "expo-router";

// Providers & Hooks
import { useSettings } from "providers/SettingsProvider";
import { useTheme } from "providers/ThemeProvider";
import { useData } from "providers/DataProvider";
import { useHeader } from "providers/HeaderProvider";

// i18n
import { useTranslation } from "react-i18next";

// Expo APIs
import { authenticateAsync, getEnrolledLevelAsync } from "expo-local-authentication";
import { nativeBuildVersion, nativeApplicationVersion } from "expo-application";
import { getPermissionsAsync, requestPermissionsAsync } from "expo-notifications";

// Data & Constants
import { ALL_FONTS, ICONS, COLORS, DATE, CURRENCIES, ALL_THEMES, SETTING_KEYS } from "data";
import { Dcategories } from "data/dummy";

// Utils & Types
import { generateDummyTransaction } from "@utils/dummy";
import { startOfDay } from "date-fns";
import { Category, Transaction } from "types";

// Components
import SettingItem from "@components/SettingItem";
import DeleteContainer from "@components/DeleteContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CurrencyItem from "@components/CurrencyItem";

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
  // currency: Object.values(CURRENCIES).map((cur) => ({ label: cur.code, value: cur.name })),
};

const Setting = () => {
  // Hooks
  const { updateSettings, ...settings } = useSettings();
  const { textStyle, colors } = useTheme();
  const { addCategory, category, addTransaction, deleteAllData } = useData();
  const { t } = useTranslation("", { keyPrefix: "app.tabs.settings" });
  const { t: wt } = useTranslation();
  const router = useRouter();
  const rootNavigation = useNavigation("/");
  const { setHeaderVisible, setTabbarVisible, headerHeight, tabbarHeight } = useHeader();

  // State
  const [selectList, setSelectList] = useState({
    visible: false,
    menu: "dateFormat",
    selected: "",
  });
  const [hasBiometrics, setHasBiometrics] = useState(false);
  const { bottom } = useSafeAreaInsets();

  // Refs
  const selectListRef = useRef<BottomSheet>(null);

  // Effects
  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({ title: t("title"), headerRightBtn: [] });
      selectListRef.current?.close();
      return () => {
        setHeaderVisible(true);
        setTabbarVisible(true);
        setSelectList((prev) => ({ ...prev, visible: false }));
        selectListRef.current?.close();
      };
    }, [setSelectList, setHeaderVisible, setTabbarVisible, selectListRef, rootNavigation])
  );

  const addDummyCategories = useCallback(() => {
    const cats: Omit<Category, "_id">[] = [];
    Dcategories.forEach((cat) => {
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
  }, [deleteAllData, selectListRef]);

  const handleToggleLock = useCallback(
    async (value: boolean) => {
      updateSettings("isAppLocked", "false");
      if (value) {
        const result = await getEnrolledLevelAsync();
        if (result > 0) {
          const valid = await authenticateAsync({ promptMessage: "Authenticate to enable app lock" });
          if (valid.success === true) {
            updateSettings("appLockType", "PIN");
          }
        }
      } else {
        const valid = await authenticateAsync({ promptMessage: "Authenticate to disable app lock" });
        if (valid.success === true) {
          updateSettings("appLockType", "DISABLE");
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
        updateSettings("appLockType", "BIOMETRIC");
      } else {
        updateSettings("appLockType", "PIN");
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
      setTabbarVisible(false);
      if (menu === "delete") {
        selectListRef.current?.snapToIndex(0);
      } else {
        const len = menu === "currency" ? 37 : OPTIONS[menu].length;
        const snapIndex = len > 4 ? (len > 10 ? 3 : 2) : 1;
        if (snapIndex === 3) {
          setHeaderVisible(false);
        }
        selectListRef.current?.snapToIndex(snapIndex);
      }
      setSelectList({ visible: true, menu, selected });
    },
    [selectListRef, setSelectList, setTabbarVisible, setHeaderVisible]
  );

  const handleItemSelect = useCallback(
    (key: keyof typeof SETTING_KEYS, value: string) => {
      updateSettings(key, value);
      selectListRef.current?.close();
      setSelectList((prev) => ({ ...prev, visible: false }));
    },
    [updateSettings, setSelectList, selectListRef]
  );

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />, []);

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
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: tabbarHeight, paddingTop: headerHeight }}
        style={{ backgroundColor: colors.screen }}
      >
        <View style={[styles.section, { backgroundColor: colors.sectionBackground, marginTop: 8 }]}>
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
          <SettingItem label={t("reminderNotification")} leftIcon="notification">
            <Switch
              value={settings.reminderNotificationEnable === "ENABLE"}
              onValueChange={handleToggleReminderNotification}
            />
          </SettingItem>
        </View>

        {__DEV__ && (
          <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
            <Text style={textStyle.title}>{t("security")}</Text>
            <SettingItem label={t("lock")} leftIcon="lock">
              <Switch value={settings.appLockType !== "DISABLE"} onValueChange={handleToggleLock} />
            </SettingItem>

            <SettingItem label={t("biometricLock")} leftIcon="biometric">
              <Switch
                value={settings.appLockType === "BIOMETRIC"}
                disabled={!hasBiometrics || settings.appLockType === "DISABLE"}
                onValueChange={handleToggleBiometrics}
              />
            </SettingItem>
          </View>
        )}
        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>{t("dataManagement")}</Text>

          {__DEV__ && <SettingItem label={t("export")} leftIcon="export" onPress={() => router.push("export")} />}
          <SettingItem label={t("backup")} leftIcon="backup" onPress={() => router.push("backup")} />

          <SettingItem
            label={t("deleteAllData")}
            leftIcon="delete"
            onPress={() => showSelectList("delete", "")}
            testId="delete-all-data"
          />
        </View>

        <View style={[styles.section, { backgroundColor: colors.sectionBackground, marginBottom: 8 }]}>
          <Text style={textStyle.title}>{t("about")}</Text>

          <SettingItem label={t("help")} leftIcon="help" onPress={() => router.push("help")} />

          <SettingItem label={t("about")} leftIcon="about" onPress={() => router.push("about")} />

          <SettingItem label={t("appVersion")} leftIcon="appVersion">
            <Text style={textStyle.body}>{nativeApplicationVersion}</Text>
          </SettingItem>

          <SettingItem label={t("buildVersion")} leftIcon="buildVersion">
            <Text style={textStyle.body}>{nativeBuildVersion}</Text>
          </SettingItem>
        </View>
      </ScrollView>
      <BottomSheet
        ref={selectListRef}
        snapPoints={[225, "40%", "69%", "100%"]}
        index={-1}
        backdropComponent={renderBackdrop}
        style={{ backgroundColor: colors.screen, zIndex: 20 }}
        enableHandlePanningGesture={selectList.menu === "delete" ? false : true}
        handleComponent={selectList.menu === "delete" ? null : undefined}

        onChange={(index) => {
          if (index === -1) {
            setHeaderVisible(true);
            setTabbarVisible(true);
          }
        }}
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
        {selectList.menu === "currency" && (
          <BottomSheetFlatList
            style={{ backgroundColor: colors.screen }}
            contentContainerStyle={{ padding: 16, paddingBottom: bottom }}
            data={Object.values(CURRENCIES)}
            renderItem={({ item }) => (
              <CurrencyItem
                item={item}
                onPress={(cur) => handleItemSelect("currency", cur.code)}
                style={{ marginBottom: 8 }}
              />
            )}
          />
        )}
        {selectList.menu !== "delete" && selectList.menu !== "currency" && (
          <BottomSheetFlatList
            style={{ backgroundColor: colors.screen }}
            contentContainerStyle={{ padding: 16 }}
            data={OPTIONS[selectList.menu]}
            renderItem={({ item }) => (
              <Pressable
                key={item.value}
                onPress={() => handleItemSelect(selectList.menu as keyof typeof SETTING_KEYS, item.value)}
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
    marginVertical: 4,
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
