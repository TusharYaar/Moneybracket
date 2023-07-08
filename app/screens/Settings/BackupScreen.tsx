import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { BACKUP_DIRECTORY } from "../../data";
import { useData } from "../../providers/DataProvider";
import { Button } from "react-native-paper";

import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { useRealm } from "../../realm";
import { generateBackupFile, readBackupFile } from "../../utils/backup";
import { useSettings } from "../../providers/SettingsProvider";
import { Category } from "../../realm/Category";

const Backup = () => {
  const realm = useRealm();
  const { category, transaction } = useData();
  // const { font } = useSettings();

  const createBackup = useCallback(async () => {
    const location = `${BACKUP_DIRECTORY}/backup_${new Date()}.json`;
    const content = generateBackupFile(category, transaction, {});
    await FileSystem.writeAsStringAsync(location, JSON.stringify(content, null, 4), {
      encoding: "utf8",
    });
  }, [category, transaction]);

  const chooseRestoreFile = useCallback(async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });

      if (file.type === "success") {
        let content = await FileSystem.readAsStringAsync(file.uri);
        const data = await readBackupFile(content);
        realm.write(() => {
          const allCategory: Category[] = [];
          data.categories.forEach((element) => {
            const cat = realm.create("Category", element);
            allCategory.push(cat as Category);
          });
          // data.transactions.forEach((element) => {
          //   const cat = allCategory.find((c) => c._id.equals(element.category));
          //   realm.create("Transaction", { ...element, category: cat });
          // });
        });
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  }, []);

  return (
    <View>
      <Button onPress={createBackup}>Backup</Button>
      <Button onPress={chooseRestoreFile}> Restore </Button>
      <Text>Backup</Text>
    </View>
  );
};

export default Backup;

const styles = StyleSheet.create({});
