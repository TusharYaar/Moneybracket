import { ScrollView, Text, View } from "react-native";
import React from "react";
import { useSettings } from "../providers/SettingsProvider";

const Setting = () => {
  const { currency, language, theme, appLock } = useSettings();
  console.log(currency, language, theme, appLock)
  return (
    <ScrollView>
      <Text>Setting</Text>
    </ScrollView>
  );
};

export default Setting;
