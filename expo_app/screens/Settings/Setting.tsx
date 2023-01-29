import { ScrollView, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { useSettings } from "../../providers/SettingsProvider";
// import {useTranslation} from "react-i18next";
import SettingItem from "../../components/SettingItem";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigators/StackNavigators";
import { Text } from "react-native-paper";
import { useRealm } from "../../realm";
import { Category } from "../../realm/Category";
import { Dcategories } from "../../data/dummy";
import COLORS from "../../data/colors";
import { ICONS } from "../../data";
import { Transaction } from "../../realm/Transaction";
import { useData } from "../../providers/DataProvider";
import { generateDummyTransaction } from "../../utils/dummy";

import AVALIBLE_FONTS from "../../themes/fonts/index";
import AVALIBLE_THEMES from "../../themes/themes";

type Props = NativeStackScreenProps<StackParamList, "FontSetting">;

const Setting = ({ navigation }: Props) => {
  const { currency, language, theme, appLock, font } = useSettings();
  // const {t} = useTranslation();
  const realm = useRealm();

  const { category, transaction } = useData();

  const addDummyCategories = useCallback(() => {
    realm.write(() => {
      Dcategories.forEach((cat) => {
        realm.create(
          "Category",
          Category.generate(
            cat.title,
            cat.type,
            COLORS[Math.floor(Math.random() * COLORS.length)],
            ICONS[Math.floor(Math.random() * ICONS.length)]
          )
        );
      });
    });
  }, [realm]);

  const addDummy = useCallback(() => {
    realm.write(() => {
      const trans = generateDummyTransaction();
      trans.forEach((element) => {
        realm.create(
          "Transaction",
          Transaction.generate(
            element.amount,
            currency.code,
            element.date,
            "dummy transaction",
            category[Math.floor(Math.random() * category.length)]
          )
        );
      });
    });
  }, [realm]);

  const deleteAllData = useCallback(() => {
    realm.write(() => {
      realm.deleteAll();
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <SettingItem label={"fontSettings"} leftIcon="text" onPress={() => navigation.navigate("FontSetting")}>
        <Text>{AVALIBLE_FONTS.find((f) => f.id === font)?.name}</Text>
      </SettingItem>
      <SettingItem label={"themeSettings"} leftIcon="text" onPress={() => navigation.navigate("ThemeSetting")}>
        <Text>{AVALIBLE_THEMES.find((t) => t.id === theme)?.name}</Text>
      </SettingItem>
      <SettingItem label={"currency"} leftIcon="text" onPress={() => navigation.navigate("FontSetting")}>
        <Text>{currency.name}</Text>
      </SettingItem>
      {__DEV__ && <SettingItem label={"dummy Categories"} leftIcon="text" onPress={addDummyCategories} />}
      {__DEV__ && category.length > 0 && <SettingItem label={"dummy Trans"} leftIcon="text" onPress={addDummy} />}
      <SettingItem label={"deleteAllData"} leftIcon="text" onPress={deleteAllData} />
      <SettingItem label={"export"} leftIcon="text" onPress={() => navigation.navigate("ExportScreen")} />
      <SettingItem label={"backup"} leftIcon="text" onPress={() => navigation.navigate("BackupScreen")} />
    </ScrollView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
});
