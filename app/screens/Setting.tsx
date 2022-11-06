import {ScrollView, Text, View} from "react-native";
import React from "react";
import {useSettings} from "../providers/SettingsProvider";
import {RadioButton} from "react-native-paper";
import AVALIBLE_FONTS from "../themes/fonts";
import {useCustomTheme} from "../themes";

const Setting = () => {
  const {currency, language, theme, appLock, font} = useSettings();
  const {changeFont} = useCustomTheme();
  return (
    <ScrollView>
      <Text>Font</Text>
      <RadioButton.Group
        onValueChange={value =>
          changeFont(value as keyof typeof AVALIBLE_FONTS)
        }
        value={font}
      >
        {Object.keys(AVALIBLE_FONTS).map(_font => (
          <View>
            <Text>{_font}</Text>
            <RadioButton value={_font} />
          </View>
        ))}
      </RadioButton.Group>
    </ScrollView>
  );
};

export default Setting;
