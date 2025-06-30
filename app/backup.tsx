import { StyleSheet, View, Text, Switch, ScrollView } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { BACKUP_DIRECTORY } from "data";
import { useData } from "providers/DataProvider";
import { getDocumentAsync } from "expo-document-picker";
import { Directory, File } from "expo-file-system/next";
import { generateBackupFile, readBackupFile } from "utils/backup";
import { Category, Group, Transaction } from "types";
import { useTranslation } from "react-i18next";
import { useTheme } from "providers/ThemeProvider";
import SettingItem from "@components/SettingItem";
import { useSettings } from "providers/SettingsProvider";
import { format, startOfDay } from "date-fns";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { shareAsync } from "expo-sharing";
import OptionContainer from "@components/OptionContainer";
import SuccessContainer from "@components/SuccessContainer";
import { useFocusEffect, useNavigation } from "expo-router";

type backupItem = { name: string; uri: string };
const Backup = () => {
  const { category, transaction, group, addCategory, addGroup, addTransaction, deleteAllData } = useData();
  const settings = useSettings();
  const { colors, textStyle } = useTheme();
  const { t } = useTranslation("", { keyPrefix: "app.stack.backup" });
  const [loading, setLoading] = useState(false);
  const [backupList, setBackupList] = useState<backupItem[]>([]);
  const [selectedFile, setSelectedFile] = useState({ view: "", uri: "", message: "", buttons: [] as any });
  const selectListRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();

  function listBackups(directory: Directory, indent: number = 0) {
    const contents = directory.list();
    const list: backupItem[] = [];
    for (const item of contents) {
      if (item instanceof File) {
        list.push({ name: item.name, uri: item.uri });
      }
    }
    setBackupList(list);
  }

  const checkFolder = useCallback(async () => {
    try {
      const directory = new Directory(BACKUP_DIRECTORY);
      if (!directory.exists) directory.create();
      listBackups(directory);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkFolder();
      navigation.setOptions({ title: t("title"), headerRightBtn: [] });
    }, [])
    
  );

  const createBackup = useCallback(async () => {
    try {
      setLoading(true);
      const fileName = `mb_backup_${format(new Date(), "dd_MM_yy_HH_mm")}.json`;
      const uri = BACKUP_DIRECTORY + fileName;
      const file = new File(uri);
      file.create();
      const content = generateBackupFile(category, transaction, group, {});
      file.write(JSON.stringify(content, null, 4));
      setBackupList((prev) => prev.concat({ name: fileName, uri }));
      // TODO: Add a way to share the backup file
      setSelectedFile((prev) => ({ ...prev, view: "success", message: t("backupSuccess") }));
      shareAsync(uri);
    } catch (e) {
      console.log(e);
    }
  }, [category]);

  const restoreFile = useCallback(async (uri: string) => {
    try {
      setLoading(true);
      const file = new File(uri);
      const data = file.text();
      const restoreData = readBackupFile(data);
      await deleteAllData();
      // selectListRef.current?.snapToIndex(0);
      // setSelectedFile((prev) => ({ ...prev, view: "option", data: restoreData }));

      const _category: Category[] = restoreData.category.map((cat) => ({
        ...cat,
        createdAt: startOfDay(new Date()),
        updatedAt: startOfDay(new Date()),
      }));
      const _transaction: Transaction[] = restoreData.transaction.map((trans) => ({
        ...trans,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      const _group: Group[] = restoreData.group.map((grp) => ({
        ...grp,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      let category: Category[] = [];
      if (_category.length > 0) {
        const result = await addCategory(_category);
        if (result) category = result;
      }
      if (_group.length > 0 && category.length > 0) await addGroup(_group);
      if (_transaction.length > 0 && category.length > 0) await addTransaction(_transaction);
      setSelectedFile((prev) => ({ ...prev, view: "success", message: t("restoreSuccess") }));
      selectListRef.current?.snapToIndex(0);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const chooseRestoreFile = useCallback(async () => {
    try {
      setLoading(true);
      const { assets, canceled } = await getDocumentAsync({ copyToCacheDirectory: true, multiple: false });
      if (canceled || assets.length !== 1) return;
      const { uri, name } = assets[0];
      selectListRef.current?.snapToIndex(1);
      setSelectedFile({
        view: "option",
        uri,
        message: t("options"),
        buttons: [
          {
            onPress: () => selectListRef.current?.close(),
            text: t("cancel"),
            variant: "outlined",
          },
          {
            onPress: () => restoreFile(uri),
            text: t("restore"),
            variant: "primary",
          },
        ],
      });
    } catch (e) {
      console.log("ERROR", e);
    } finally {
      setLoading(false);
    }
  }, [restoreFile, setLoading]);

  const deleteFile = useCallback((uri: string) => {
    const file = new File(uri);
    file.delete();
    selectListRef.current?.close();
    setBackupList((prev) => prev.filter((i) => i.uri !== uri));
  }, []);

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />, []);
  const selectFile = useCallback(
    (file: string) => {
      setSelectedFile({
        view: "option",
        uri: file,
        message: t("options"),
        buttons: [
          {
            onPress: () => deleteFile(file),
            text: t("delete"),
            variant: "outlined",
          },
          {
            onPress: () => restoreFile(file),
            text: t("restore"),
            variant: "primary",
          },
        ],
      });
      selectListRef.current?.snapToIndex(1);
    },
    [selectListRef, setSelectedFile]
  );

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 8 }}
        style={{ backgroundColor: colors.screen }}
      >
        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>{t("options")}</Text>
          <SettingItem label={t("restoreFromFile")} leftIcon="restore" onPress={chooseRestoreFile} />
          {/* <SettingItem label={t("enableBackup")} leftIcon="lock">
            <Switch value={settings.backupEnable !== "DISABLE"} onValueChange={handleToggleLock} />
            </SettingItem> */}

          {/* <SettingItem label={t("enableDailyAutoBackup")} leftIcon="lock">
          <Switch value={settings.dailyAutoBackup === "ENABLE"} onValueChange={() => {}} />
          </SettingItem> */}
          {__DEV__ && (
            <SettingItem label={t("deleteOldBackup")} leftIcon="backup">
              <Switch value={settings.deleteOldBackup === "ENABLE"} onValueChange={() => {}} />
            </SettingItem>
          )}
          <SettingItem label={t("backup")} leftIcon="backup" onPress={createBackup}></SettingItem>
        </View>

        <View style={[styles.section, { backgroundColor: colors.sectionBackground }]}>
          <Text style={textStyle.title}>{t("backupList")}</Text>
          {backupList.map((item) => (
            <SettingItem label={item.name} leftIcon="backup" onPress={() => selectFile(item.uri)} key={item.name} />
          ))}
          {backupList.length === 0 && <SettingItem label={t("noBackup")} leftIcon="backup" />}
        </View>
      </ScrollView>
      <BottomSheet
        ref={selectListRef}
        snapPoints={[150, 225, "90%"]}
        index={-1}
        backdropComponent={renderBackdrop}
        style={{ backgroundColor: colors.screen }}
        enableDynamicSizing={false}
        // onAnimate={handleOnAnimate}
        enableHandlePanningGesture={false}
      >
        {selectedFile.view === "option" && (
          <OptionContainer
            title={selectedFile.message}
            buttons={selectedFile.buttons}
            color={colors.headerIconActive}
          />
        )}
        {selectedFile.view === "success" && (
          <SuccessContainer
            title={selectedFile.message}
            onComfirm={() => selectListRef.current?.close()}
            color={colors.headerIconActive}
            confirm={t("done")}
          />
        )}
      </BottomSheet>
    </>
  );
};

export default Backup;

const styles = StyleSheet.create({
  section: {
    marginVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  list: {
    padding: 16,
    rowGap: 16,
  },
  listItem: {
    borderRadius: 8,
    borderWidth: 2,
    height: 64,
  },
  button: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
