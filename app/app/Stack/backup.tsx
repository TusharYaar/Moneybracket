import { Platform, StyleSheet, View, Text, Pressable } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { BACKUP_DIRECTORY } from "data";
import { useData } from "providers/DataProvider";

import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { generateBackupFile, readBackupFile } from "utils/backup";
import { BackupFile, Category } from "types";
import { useTranslation } from "react-i18next";

const Backup = () => {
  const { category } = useData();
  const { t } = useTranslation("", { keyPrefix: "screens.settings.backup" });
  const [loading, setLoading] = useState(false);

  const checkFolder = useCallback(async () => {
    const { exists } = await FileSystem.getInfoAsync(BACKUP_DIRECTORY);
    if (!exists) {
      await FileSystem.makeDirectoryAsync(BACKUP_DIRECTORY, { intermediates: true });
    }
  }, []);

  useEffect(() => {
    checkFolder();
  }, []);

  const addNewCategories = useCallback(
    (values: BackupFile["category"], callback?: () => void) => {
      const categories: Category[] = [];
    //   return realm.write(() => {
    //     values.forEach((value) => {
    //       const category = realm.create(
    //         "Category",
    //         Category.generate(value.title, value.type, value.color, value.icon, value.isFavorite, value.createdAt)
    //       );
    //       categories.push(category as Category);
    //     });
    //     if (callback) callback();
    //     return categories;
    //   });
    },
    []
  );

  const addNewTransaction = useCallback(
    async (
      values: (Omit<BackupFile["transaction"][number], "category"> & { category: Category })[],
      callback?: () => {}
    ) => {
      // TODO: Add File support
    //   realm.write(() => {
    //     values.forEach((value) => {
    //       realm.create(
    //         "Transaction",
    //         Transaction.generate(
    //           value.amount,
    //           value.currency,
    //           new Date(value.date),
    //           value.note,
    //           value.category,
    //           false,
    //           value.image,
    //           value.createdAt
    //         )
    //       );
    //     }, []);

    //     if (callback) callback();
    //   });
    },
    []
  );

  const createBackup = useCallback(async () => {
    try {
      if (Platform.OS === "android" && Platform.Version >= 30) {
        const res = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (res.granted) {
          const location = await FileSystem.StorageAccessFramework.createFileAsync(
            res.directoryUri,
            `mbbackup_${new Date()}.json`,
            "application/json"
          );
          const content = generateBackupFile(category, [], {});
          await FileSystem.StorageAccessFramework.writeAsStringAsync(location, JSON.stringify(content, null, 4), {
            encoding: "utf8",
          });
          console.log("Done");
        } else {
          console.log("Operation Cancelled");
        }
        return;
      }

      const location = `${BACKUP_DIRECTORY}/backup_${new Date()}.json`;
      const content = generateBackupFile(category, [], {});
      await FileSystem.writeAsStringAsync(location, JSON.stringify(content, null, 4), {
        encoding: "utf8",
      });
      console.log(location);
      // TODO: Add a way to share the backup file
      console.log("Done");
    } catch (e) {
      console.log(e);
    }
  }, [category]);

  const chooseRestoreFile = useCallback(async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
      setLoading(true);

      if (!file.canceled && file.assets.length > 0) {
        let content = await FileSystem.readAsStringAsync(file.assets[0].uri);
        const data = await readBackupFile(content);
        const categories = addNewCategories(data.validCategories);

        const categoryMap = {};

        // categories.forEach((cat) => (categoryMap[cat.title] = cat));

        const transactions = data.validTransactions.map((trans) => ({
          ...trans,
          category: categoryMap[trans.category],
        }));
        // TODO: Check Memory Consumption
        addNewTransaction(transactions);
      }
    } catch (e) {
      console.log("ERROR", e);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <View style={styles.screen}>
      <Text>{t("text_1")}</Text>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Text>{t("backup_text")}</Text>
          <Pressable onPress={createBackup} disabled={category.length === 0}>
            <Text>
            {t("backup")}
            </Text>
          </Pressable>
        </View>
        <View style={styles.container}>
          <Text>{t("restore_text")}</Text>
          <Pressable onPress={chooseRestoreFile} disabled={category.length > 0}>
            <Text>
            {t("restore")}
            </Text>
          </Pressable>
        </View>
      </View>
      {/* <Loading visible={Boolean(loading)} text={t("restoring_backup")} /> */}
    </View>
  );
};

export default Backup;

const styles = StyleSheet.create({
  screen: {
    padding: 8,
    flex: 1,
  },
  outerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    gap: 8,
  },
  container: {
    maxWidth: "48%",
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 8,
  },
});
