import React, { useCallback, useRef, useState } from "react";
import { useSettings } from "providers/SettingsProvider";
import { useTranslation } from "react-i18next";

import { isEnrolledAsync, authenticateAsync } from "expo-local-authentication";
import SettingItem from "@components/SettingItem";

import { Dcategories } from "data/dummy";
import { useData } from "providers/DataProvider";

import { ALL_FONTS, ICONS, COLORS, DATE, CURRENCIES, ALL_THEMES } from "data";
import { nativeBuildVersion, nativeApplicationVersion } from "expo-application";

import { useTheme } from "providers/ThemeProvider";
import CollapsibleHeaderScrollView from "@components/CollapsibleHeaderScrollView";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { View, Switch, Text, StyleSheet, Pressable } from "react-native";
import BottomSheet, { BottomSheetFlatList, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useHeader } from "providers/HeaderProvider";

const OPTIONS: Record<string, { label: string; value: string }[]> = {
  dateFormat: DATE.map((d) => ({ label: d, value: d })),
  font: ALL_FONTS.filter((d) => d.isVisible).map((d) => ({ label: d.name, value: d.id })),
  theme: ALL_THEMES.filter((d) => d.isVisible).map((d) => ({ label: d.name, value: d.id })),
  language: [{ label: "English", value: "en" }],
  icon: Object.keys(ICONS).map(k => ({label: k, value: k})),
  currency: Object.values(CURRENCIES).map((cur) => ({ label: cur.code, value: cur.name })),
};

const Setting = () => {
  const { updateSettings, ...settings } = useSettings();
  const { textStyle, colors } = useTheme();
  const { addCategory } = useData();
  const { t, i18n } = useTranslation("", { keyPrefix: "screens.settings.setting" });
  const { t: wt } = useTranslation();
  const { showHeader, showTabbar, hideHeader, hideTabbar, setRightHeaderBtn } = useHeader();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectList, setSelectList] = useState({
    visible: false,
    menu: "dateFormat",
    selected: "",
  });

  const navigation = useNavigation("/Stack");
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ title: "settings", headerRightBtn: [] });
      showTabbar();

    }, [])
  );
  const router = useRouter();
  const selectListRef = useRef<BottomSheet>();

  const addDummyCategories = useCallback(() => {
    Dcategories.forEach((cat, index) => {
      const date = new Date().toISOString();
      setTimeout(() => {
        addCategory({
          ...cat,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          createdAt: date,
          updatedAt: date,
          isFavorite: false,
          icon: "feed-tag",
        });
      }, index * 200);
    });
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

  const handleToggleLock = useCallback(async (value: boolean) => {
    if (value) {
      const result = await isEnrolledAsync();
      if (result) {
        const valid = await authenticateAsync();
        if (valid.success === true) {
          // return updateLock(true);
        } else {
        }
      }
    }
    // updateLock(false);
  }, []);

  const showSelectList = (menu: string, selected: string) => {
    const len = OPTIONS[menu].length;
    selectListRef.current.snapToIndex(len > 4 ? (len > 10 ? 2 : 1) : 0);
    setSelectList({ visible: true, menu, selected });
  };

  const handleItemSelect = useCallback(
    (key: string, value: string) => {
      updateSettings(key, value);
      selectListRef.current.close();
      setSelectList((prev) => ({ ...prev, visible: false }));
    },
    [updateSettings, setSelectList, selectListRef]
  );

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />, []);

  const handleOnAnimate = (_, to: number) => {
    if (to === 2) hideHeader();
    else showHeader();
    if (to === -1) showTabbar();
    else hideTabbar();
  };
  return (
    <>
      <CollapsibleHeaderScrollView
        contentContainerStyle={{ paddingHorizontal: 16 }}
        title="Settings"
        paddingTop={0}
        hideBackButton={true}
        style={{ backgroundColor: colors.screen }}
      >
        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>Appearance</Text>
          <SettingItem label={t("font")} leftIcon="font" onPress={() => showSelectList("font", settings.font)}>
            <Text style={textStyle.body}>{OPTIONS.font.find((f) => f.value === settings.font).label}</Text>
          </SettingItem>
          <SettingItem label={t("theme")} leftIcon="theme" onPress={() => showSelectList("theme", settings.theme)}>
            <Text style={textStyle.body}>{OPTIONS.theme.find((f) => f.value === settings.theme).label}</Text>
          </SettingItem>
          {__DEV__ && (
            <SettingItem label={t("icon")} leftIcon="icon" onPress={() => showSelectList("icon", settings.icon)}>
              <Text style={textStyle.body}>{settings.icon}</Text>
            </SettingItem>
          )}

          <SettingItem label={t("about")} leftIcon="about" onPress={() => router.push("_sitemap")} />
        </View>

        {/* <SettingItem label={t("theme")} leftIcon="paintbrush" onPress={() => router.push("settings/theme")}> */}
        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>Preference</Text>
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
        </View>
        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>Security</Text>
          <SettingItem label={t("lock")} leftIcon="lock">
            <Switch value={settings.appLock === "ENABLE"} onValueChange={handleToggleLock} />
          </SettingItem>
        </View>
        {/* {__DEV__ && <SettingItem label={"dummy Categories"} leftIcon="trash" onPress={addDummyCategories} />} */}
        {/* {__DEV__ && category.length > 0 && <SettingItem label={"dummy Trans"} leftIcon="trash" onPress={addDummy} />} */}

        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>Data Management</Text>

          {__DEV__ && (
            <SettingItem label={t("export")} leftIcon="export" onPress={() => router.push("Stack/export")} />
          )}
          <SettingItem label={t("backup")} leftIcon="backup" onPress={() => router.push("Stack/backup")} />

          {/* <DeleteDialog
            visible={deleteModal}
            deleteAction={handleDeleteAllData}
            cancelAction={dismissModal}
            body={t("confirmDeleteBody")}
            title={t("confirmDeleteTitle")}
          /> */}
          {__DEV__ && <SettingItem label={t("deleteAllData")} leftIcon="delete" onPress={() => setDeleteModal(true)} />}
        </View>

        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>About</Text>

          <SettingItem label={t("help")} leftIcon="help" onPress={() => router.push("Stack/help")} />

          <SettingItem label={t("about")} leftIcon="about" onPress={() => router.push("Stack/about")} />

          <SettingItem label={t("appVersion")} leftIcon="appVersion" onPress={() => setDeleteModal(true)}>
            <Text style={textStyle.body}>{nativeApplicationVersion}</Text>
          </SettingItem>

          <SettingItem label={t("buildVersion")} leftIcon="buildVersion" onPress={() => setDeleteModal(true)}>
            <Text style={textStyle.body}>{nativeBuildVersion}</Text>
          </SettingItem>
        </View>
      </CollapsibleHeaderScrollView>
      <BottomSheet
        ref={selectListRef}
        snapPoints={["40%", "69%", "100%"]}
        index={-1}
        backdropComponent={renderBackdrop}
        style={{ backgroundColor: colors.screen }}
        onAnimate={handleOnAnimate}
        // onAnimate={(index, to) => to !== -1 && selectListRef.current.snapToIndex(index)}
      >
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
