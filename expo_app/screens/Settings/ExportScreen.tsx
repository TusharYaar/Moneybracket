import { StyleSheet, View, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

import { createCSV, createHTML, createJSON } from "../../utils/exports";
import { useData } from "../../providers/DataProvider";
import { Button, Text } from "react-native-paper";

import { EXPORTS_DIRECTORY } from "../../data";

const Exports = () => {
  const { transaction } = useData();
  const [files, setFiles] = useState([]);
  // TODO: Define Types for include Fields
  const [includeFields, setIncludeFields] = useState(["createdAt", "category", "note", "amount"]);

  const getFiles = useCallback(async () => {
    const { exists } = await FileSystem.getInfoAsync(EXPORTS_DIRECTORY);
    if (!exists) {
      await FileSystem.makeDirectoryAsync(EXPORTS_DIRECTORY, { intermediates: true });
    }
    const files = await FileSystem.readDirectoryAsync(EXPORTS_DIRECTORY);
    setFiles(files);
  }, []);

  useEffect(() => {
    getFiles();
  }, []);

  const exportPDF = useCallback(async () => {
    const html = createHTML(transaction);
    const { uri } = await Print.printToFileAsync({ html });
    const location = `${EXPORTS_DIRECTORY}/${new Date().toTimeString()}-export.pdf`;
    await FileSystem.moveAsync({
      from: uri,
      to: location,
    });

    setFiles((prev) => [location, ...prev]);
  }, [transaction]);

  const exportCSV = useCallback(async () => {
    const data = createCSV(transaction);
    const location = `${EXPORTS_DIRECTORY}/${new Date()}_csv-export.csv`;
    FileSystem.writeAsStringAsync(location, data, {
      encoding: "utf8",
    });
    setFiles((prev) => [location, ...prev]);
  }, [transaction]);

  const exportJSON = useCallback(() => {
    const data = createJSON(transaction);
    const location = `${EXPORTS_DIRECTORY}/${new Date()}_json-export.json`;
    FileSystem.writeAsStringAsync(location, JSON.stringify(data, null, 4), {
      encoding: "utf8",
    });
    setFiles((prev) => [location, ...prev]);
  }, [transaction]);

  return (
    <ScrollView>
      <Button onPress={exportPDF}>Export PDF</Button>
      <Button onPress={exportCSV}>Create CSV</Button>
      <Button onPress={exportJSON}>Export JSON</Button>
      <View>
        <Text>{JSON.stringify(files)}</Text>
      </View>
    </ScrollView>
  );
};

export default Exports;

const styles = StyleSheet.create({});
