import React, { useCallback, useRef, useState } from "react";
import { useSettings } from "providers/SettingsProvider";
import { useTranslation } from "react-i18next";

import { isEnrolledAsync, authenticateAsync } from "expo-local-authentication";
import SettingItem from "@components/SettingItem";

import { Dcategories } from "../../../../data/dummy";
import { useData } from "providers/DataProvider";

import { ALL_FONTS, ICONS, COLORS, DATE, CURRENCIES } from "data";
import {nativeBuildVersion,nativeApplicationVersion} from 'expo-application';

import { useTheme } from "providers/ThemeProvider";
import CollapsibleHeaderScrollView from "@components/CollapsibleHeaderScrollView";
import { useRouter } from "expo-router";
import { View, Switch, Text, StyleSheet, Pressable } from "react-native";
import BottomSheet, { BottomSheetFlatList, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const OPTIONS: Record<string, { label: string; value: string }[]> = {
  dateFormat: DATE.map((d) => ({ label: d, value: d })),
  font: ["lexend", "serif"].map((d) => ({ label: d, value: d })),
  theme: ["default", "dark"].map((d) => ({ label: d, value: d })),
  language: [],
  icon: [],
  currency: Object.values(CURRENCIES).map((cur) => ({ label: cur.code, value: cur.name })),
};

const Setting = () => {
  const { currency, language, appLock, dateFormat, updateCurrency, updateLanguage, updateDateFormat, updateLock } =
    useSettings();
  const { theme, textStyle, colors, font } = useTheme();
  const { category, addCategory } = useData();
  const { t, i18n } = useTranslation("", { keyPrefix: "screens.settings.setting" });
  const { t: wt } = useTranslation();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectList, setSelectList] = useState({
    visible: false,
    menu: "dateFormat",
    selected: "",
  });

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
          return updateLock(true);
        } else {
        }
      }
    }
    updateLock(false);
  }, []);

  const showSelectList = (menu: string) => {
    const len = OPTIONS[menu].length;
    selectListRef.current.snapToIndex(len > 4 ? (len > 10 ? 2 : 1) : 0);
    setSelectList({ visible: true, menu, selected: "" });
  };

  const handleItemSelect = (value: string) => {
    selectListRef.current.close();
    setSelectList((prev) => ({ ...prev, visible: false }));
    console.log(value);
  };

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />, []);
  return (
    <>
      <CollapsibleHeaderScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 84 }}
        title="Settings"
        paddingTop={0}
        hideBackButton={true}
      >
        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>Appearance</Text>
          <SettingItem label={t("font")} leftIcon="typography" onPress={() => showSelectList("font")}>
            <Text>{font}</Text>
          </SettingItem>
          <SettingItem label={t("theme")} leftIcon="paintbrush" onPress={() => showSelectList("theme")}>
            <Text>{theme}</Text>
          </SettingItem>
          <SettingItem label={t("icon")} leftIcon="apps" onPress={() => showSelectList("icon")}>
            <Text>{theme}</Text>
          </SettingItem>
        </View>

        {/* <SettingItem label={t("theme")} leftIcon="paintbrush" onPress={() => router.push("settings/theme")}> */}
        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>Preference</Text>
          <SettingItem label={t("currency")} leftIcon="globe" onPress={() => showSelectList("currency")}>
            <Text>{currency.name}</Text>
          </SettingItem>
          <SettingItem label={t("language")} leftIcon="comment-discussion" onPress={() => showSelectList("language")}>
            <Text>{wt(`languages.${language}`)}</Text>
          </SettingItem>

          <SettingItem label={t("dateFormat")} leftIcon="calendar" onPress={() => showSelectList("dateFormat")}>
            <Text>{dateFormat}</Text>
          </SettingItem>
        </View>
        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>Security</Text>
          <SettingItem label={t("lock")} leftIcon="lock">
            <Switch value={appLock === "ENABLE"} onValueChange={handleToggleLock} />
          </SettingItem>
        </View>
        {/* {__DEV__ && <SettingItem label={"dummy Categories"} leftIcon="trash" onPress={addDummyCategories} />} */}
        {/* {__DEV__ && category.length > 0 && <SettingItem label={"dummy Trans"} leftIcon="trash" onPress={addDummy} />} */}

        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>Data Management</Text>

          {__DEV__ && (
            <SettingItem label={t("export")} leftIcon="download" onPress={() => router.push("settings/export")} />
          )}
          <SettingItem label={t("backup")} leftIcon="duplicate" onPress={() => router.push("settings/backup")} />

          {/* <DeleteDialog
            visible={deleteModal}
            deleteAction={handleDeleteAllData}
            cancelAction={dismissModal}
            body={t("confirmDeleteBody")}
            title={t("confirmDeleteTitle")}
          /> */}
        {__DEV__ && <SettingItem label={t("deleteAllData")} leftIcon="trash" onPress={() => setDeleteModal(true)} />}
        </View>

        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>About</Text>

            <SettingItem label={t("help")} leftIcon="info" onPress={() => router.push("settings/help")} />

          <SettingItem label={t("about")} leftIcon="smiley" onPress={() => router.push("settings/about")} />

          {/* <DeleteDialog
            visible={deleteModal}
            deleteAction={handleDeleteAllData}
            cancelAction={dismissModal}
            body={t("confirmDeleteBody")}
            title={t("confirmDeleteTitle")}
          /> */}
        <SettingItem label={t("appVersion")} leftIcon="ellipsis" onPress={() => setDeleteModal(true)} >
          <Text>
            {nativeApplicationVersion}
          </Text>
          </SettingItem>

          <SettingItem label={t("buildVersion")} leftIcon="bug" onPress={() => setDeleteModal(true)} >
          <Text>
            {nativeBuildVersion}
          </Text>
          </SettingItem>
        </View>

      </CollapsibleHeaderScrollView>
      <BottomSheet
        ref={selectListRef}
        snapPoints={["40%", "69%", "100%"]}
        index={-1}
        backdropComponent={renderBackdrop}
        // onAnimate={(index, to) => to !== -1 && selectListRef.current.snapToIndex(index)}
      >
        <BottomSheetFlatList
          contentContainerStyle={{ padding: 16 }}
          data={OPTIONS[selectList.menu]}
          renderItem={({ item }) => (
            <Pressable
              key={item.value}
              onPress={() => handleItemSelect(item.value)}
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
