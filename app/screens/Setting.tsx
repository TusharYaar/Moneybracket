import {ScrollView, StyleSheet} from "react-native";
import React, {useCallback} from "react";
import {useSettings} from "../providers/SettingsProvider";
import {useTranslation} from "react-i18next";
import SettingItem from "../components/SettingItem";

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackParamList} from "../navigators/StackNavigators";
import {Caption} from "react-native-paper";
import {useRealm} from "../realm";
import {Category} from "../realm/Category";
import {Dcategories} from "../data/dummy";
import COLORS from "../data/colors";
import {ICONS} from "../data";
import {Transaction} from "../realm/Transaction";
import {useData} from "../providers/DataProvider";
import {generateDummyTransaction} from "../utils/dummy";

type Props = NativeStackScreenProps<StackParamList, "FontSetting">;

const Setting = ({navigation}: Props) => {
  const {currency, language, theme, appLock, font} = useSettings();
  const {t} = useTranslation();
  const realm = useRealm();

  const {category} = useData();

  const addDummyCategories = useCallback(() => {
    realm.write(() => {
      Dcategories.forEach(cat => {
        realm.create(
          "Category",
          Category.generate(
            cat.title,
            cat.type,
            COLORS[Math.floor(Math.random() * COLORS.length)],
            ICONS[Math.floor(Math.random() * ICONS.length)],
          ),
        );
      });
    });
  }, [realm]);

  const addDummy = useCallback(() => {
    realm.write(() => {
      const trans = generateDummyTransaction();
      trans.forEach(element => {
        realm.create(
          "Transaction",
          Transaction.generate(
            element.amount,
            currency,
            element.date,
            "",
            category[Math.floor(Math.random() * category.length)],
          ),
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
      <SettingItem
        label={t("fontSettings")}
        leftIcon="text"
        onPress={() => navigation.navigate("FontSetting")}
      >
        <Caption>{font}</Caption>
      </SettingItem>
      <SettingItem
        label={t("themeSettings")}
        leftIcon="text"
        onPress={() => navigation.navigate("ThemeSetting")}
      >
        <Caption>{theme}</Caption>
      </SettingItem>
      <SettingItem
        label={t("currency")}
        leftIcon="text"
        onPress={() => navigation.navigate("FontSetting")}
      >
        <Caption>{currency}</Caption>
      </SettingItem>
      {__DEV__ && (
        <SettingItem
          label={t("dummy Categories")}
          leftIcon="text"
          onPress={addDummyCategories}
        />
      )}
      {__DEV__ && (
        <SettingItem
          label={t("dummy Trans")}
          leftIcon="text"
          onPress={addDummy}
        />
      )}
      <SettingItem
        label={t("deleteAllData")}
        leftIcon="text"
        onPress={deleteAllData}
      />
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
