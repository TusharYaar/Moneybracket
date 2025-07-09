// React & React Native
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

// Expo APIs
import * as FileSystem from "expo-file-system";
import { startActivityAsync } from "expo-intent-launcher";
import { useFocusEffect, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";

// Providers & Hooks
import { useData } from "providers/DataProvider";
import { useTheme } from "providers/ThemeProvider";
import { useHeader } from "providers/HeaderProvider";

// Data & Utils
import { EXPORTS_DIRECTORY } from "data";


const Exports = () => {
  const { t } = useTranslation("", { keyPrefix: "app.export" });
  const { textStyle, colors } = useTheme();
  const rootNavigation = useNavigation("/");
  const { headerHeight } = useHeader();

  useFocusEffect(
    useCallback(() => {
      rootNavigation.setOptions({ title: t("title"), headerRightBtn: [] });
    }, [])
  );
  // const { transaction } = useData();
  const [files, setFiles] = useState([]);
  // TODO: Define Types for include Fields
  const [includeFields, setIncludeFields] = useState(["createdAt", "category", "note", "amount"]);

  const getFiles = useCallback(async () => {
    const { exists } = await FileSystem.getInfoAsync(EXPORTS_DIRECTORY);
    if (!exists) {
      await FileSystem.makeDirectoryAsync(EXPORTS_DIRECTORY, { intermediates: true });
    }
    const files = await FileSystem.readDirectoryAsync(EXPORTS_DIRECTORY);
    // setFiles(files);
  }, []);

  useEffect(() => {
    getFiles();
  }, []);

  // const exportPDF = useCallback(async () => {
  //   const html = createHTML(transaction);
  //   const { uri } = await Print.printToFileAsync({ html });
  //   const location = `${EXPORTS_DIRECTORY}/${new Date().toTimeString()}-export.pdf`;
  //   await FileSystem.moveAsync({
  //     from: uri,
  //     to: location,
  //   });

  //   setFiles((prev) => [location, ...prev]);
  //   const curi = await FileSystem.getContentUriAsync(location);
  //   try {
  //     startActivityAsync("android.intent.action.VIEW", {
  //       data: curi,
  //       flags: 1,
  //       type: "application/pdf",
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }  
  // }, [transaction]);

  // const exportCSV = useCallback(async () => {
  //   const data = createCSV(transaction);
  //   const location = `${EXPORTS_DIRECTORY}/${new Date()}_csv-export.csv`;
  //   FileSystem.writeAsStringAsync(location, data, {
  //     encoding: "utf8",
  //   });

  //   setFiles((prev) => [location, ...prev]);
  // }, [transaction]);

  // const exportJSON = useCallback(() => {
  //   const data = createJSON(transaction);
  //   const location = `${EXPORTS_DIRECTORY}/${new Date()}_json-export.json`;
  //   FileSystem.writeAsStringAsync(location, JSON.stringify(data, null, 4), {
  //     encoding: "utf8",
  //   });
  //   setFiles((prev) => [location, ...prev]);
  // }, [transaction]);

  // const openFile = useCallback(async (file: string) => {
  //   try {
  //     const location = `${EXPORTS_DIRECTORY}/${file}`;
  //     const curi = await FileSystem.getContentUriAsync(location);
  //     console.log(location);
  //     console.log(curi);
  //     return;
  //     startActivityAsync("android.intent.action.VIEW", {
  //       data: curi,
  //       flags: 1,
  //       type: getType(file),
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     console.log("unable to open the file: No app Installed");
  //   }
  // }, []);

  return (
    <ScrollView
    contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 8, paddingTop: headerHeight + 8, backgroundColor: colors.screen }}
    >
        <Text style={textStyle.title}>{t("exportAs")}</Text>
        <View style={styles.btnContainer}>
          {/* <Button onPress={exportPDF} style={styles.btn}>
            {t("pdf")}
          </Button>
          <Button onPress={exportCSV} style={styles.btn}>
            {t("csv")}
          </Button>
          <Button onPress={exportJSON} style={styles.btn}>
            {t("json")}
          </Button>
          <Button onPress={exportJSON} style={styles.btn} disabled={true}>
            {t("excel")}
          </Button> */}
        </View>
    </ScrollView>
  );
};

export default Exports;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  btn: {
    width: "50%",
  },
});
