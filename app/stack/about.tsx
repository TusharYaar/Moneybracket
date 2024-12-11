import React, { useEffect } from "react";

import { View, StyleSheet, Image, Text } from "react-native";
import { useTheme } from "providers/ThemeProvider";
import CollapsibleHeaderScrollView from "@components/CollapsibleHeaderScrollView";
import { useHeader } from "providers/HeaderProvider";
import { useTranslation } from "react-i18next";

const AboutScreen = () => {
  const { textStyle, colors } = useTheme();
  const { setHeaderRightButtons, setHeaderTitle} = useHeader();
  const { t } = useTranslation("", { keyPrefix: "app.stack.about" });
  useEffect(() => {
    setHeaderRightButtons([]);
    setHeaderTitle(t("title"))
  },[]);

  return (
    <View style={{flex: 1, backgroundColor: colors.screen}}>
    <CollapsibleHeaderScrollView
    contentContainerStyle={{ paddingHorizontal: 16 }}
    paddingVertical={8}
    tabbarVisible={false}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image source={require("assets/christmas-icon.png")} style={{ width: 100, height: 100, borderRadius: 8 }} />
      </View>
      <Text style={[{ marginTop: 8 }, textStyle.title]}>About The App</Text>
      <Text style={[textStyle.body, { marginVertical: 4 }]}>
        Our app is a powerful and simple tool to help you manage your personal finances. We understand how important it
        is to be in control of your money, and that's why we've created this app.
      </Text>
      <Text style={[textStyle.body, { marginVertical: 4 }]}>
        Our app is open source, which means that it's free for everyone to use and contribute to. You can access all of
        the code and make any changes you want, and you can use it for personal use without any restrictions.
      </Text>
      <Text style={[textStyle.body, { marginVertical: 4 }]}>
        Our app is also ad-free, meaning you won't be bombarded with annoying pop-ups or advertisements while using it.
        This makes for a clean and seamless experience, and it also ensures your privacy is protected.
      </Text>
      {/* <Text style={[textStyle.body, { marginVertical: 4 }]}>
        The only paid options we offer are customization options such as font and theme changes. This is to help support
        our ongoing development and maintenance of the app.
        </Text> */}
      <Text style={[textStyle.body, { marginVertical: 4 }]}>
        We hope you find our finance tracker app useful and that it helps you take control of your finances. If you have
        any questions or feedback, please don't hesitate to reach out to us.
      </Text>
      {/* <List.Accordion
        title="Libraries Used"
        >
        {Object.keys(file.dependencies).map((pack) => (
        <List.Item style={{ padding: 0, margin: 0 }} title={pack} key={pack} />
        ))}
        {Object.keys(file.devDependencies).map((pack) => (
        <List.Item style={{ padding: 0, margin: 0 }} title={pack} key={pack} />
        ))}
        </List.Accordion> */}
    </CollapsibleHeaderScrollView>
        </View>
  );
};
export default AboutScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
