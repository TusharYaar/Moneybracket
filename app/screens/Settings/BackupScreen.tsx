import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { BACKUP_DIRECTORY } from "../../data";
import { useData } from "../../providers/DataProvider";
import { Button, Surface, Text } from "react-native-paper";

import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { useRealm } from "../../realm";
import { generateBackupFile, readBackupFile } from "../../utils/backup";
import { Category } from "../../realm/Category";
import { BackupFile } from "../../types";
import { Transaction } from "../../realm/Transaction";
import Loading from "../../components/Modals/Loading";
import { useTranslation } from "react-i18next";

// type RestoreValues = {
//   invalidCategories: number;
//   invalidTransactions: number;
//   validCategories: Category[];
//   validTransactions: BackupFile["transaction"];
//   viewModal: "category" | "transaction" | null;
// };

const Backup = () => {
  const realm = useRealm();
  const { category, transaction } = useData();
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
      return realm.write(() => {
        values.forEach((value) => {
          const category = realm.create(
            "Category",
            Category.generate(value.title, value.type, value.color, value.icon, value.isFavorite, value.createdAt)
          );
          categories.push(category as Category);
        });
        if (callback) callback();
        return categories;
      });
    },
    [realm]
  );

  const addNewTransaction = useCallback(
    async (
      values: (Omit<BackupFile["transaction"][number], "category"> & { category: Category })[],
      callback?: () => {}
    ) => {
      // TODO: Add File support
      realm.write(() => {
        values.forEach((value) => {
          realm.create(
            "Transaction",
            Transaction.generate(
              value.amount,
              value.currency,
              new Date(value.date),
              value.note,
              value.category,
              false,
              value.image,
              value.createdAt
            )
          );
        }, []);

        if (callback) callback();
      });
    },
    [realm]
  );

  const createBackup = useCallback(async () => {
    try {
      const location = `${BACKUP_DIRECTORY}/backup_${new Date()}.json`;
      const content = generateBackupFile(category, transaction, {});
      await FileSystem.writeAsStringAsync(location, JSON.stringify(content, null, 4), {
        encoding: "utf8",
      });
      // TODO: Add a way to share the backup file
      console.log("Done");
    } catch (e) {
      console.log(e);
    }
  }, [category, transaction]);

  const chooseRestoreFile = useCallback(async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
      setLoading(true);

      if (file.type === "success") {
        let content = await FileSystem.readAsStringAsync(file.uri);
        const data = await readBackupFile(content);
        const categories = addNewCategories(data.validCategories);

        const categoryMap = {};

        categories.forEach((cat) => (categoryMap[cat.title] = cat));

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
        <Surface style={styles.container}>
          <Text variant="bodyMedium">{t("backup_text")}</Text>
          <Button onPress={createBackup} mode="contained" disabled={category.length === 0}>
            {t("backup")}
          </Button>
        </Surface>
        <Surface style={styles.container}>
          <Text variant="bodyMedium">{t("restore_text")}</Text>
          <Button onPress={chooseRestoreFile} mode="contained" disabled={category.length > 0}>
            {t("restore")}
          </Button>
        </Surface>
      </View>
      <Loading visible={Boolean(loading)} text={t("restoring_backup")} />
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
