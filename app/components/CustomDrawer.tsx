import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useCustomTheme } from "../providers/ThemeProvider";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { theme } = useCustomTheme();
  const { t } = useTranslation("", { keyPrefix: "navigator.drawer" });

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 80, height: 80, borderRadius: 4 * theme.roundness, marginBottom: 8 }}
        />
        <Text variant="labelSmall">Money Bracket</Text>
      </View>
      {props.state.routes.map((route, index) => (
        <DrawerItem
          key={route.key}
          label={t(route.name)}
          onPress={() => props.navigation.navigate(route.name)}
          labelStyle={theme.fonts.titleSmall}
          focused={index === props.state.index}
          style={{ borderRadius: 4 * theme.roundness, marginVertical: 4 }}
        />
      ))}
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
