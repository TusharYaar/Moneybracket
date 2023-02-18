import React from "react";

import { View, StyleSheet, Image, ScrollView } from "react-native";

import { Text } from "react-native-paper";

const AboutScreen = () => {
  return (
    <ScrollView style={styles.screen}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image source={require("../assets/icon.png")} style={{ width: 100, height: 100 }} />
      </View>
      <Text variant="titleLarge">About The App</Text>
      <Text variant="bodyLarge">
        Our app is a powerful and simple tool to help you manage your personal finances. We understand how important it
        is to be in control of your money, and that's why we've created this app.
      </Text>
      <Text variant="bodyLarge">
        Our app is open source, which means that it's free for everyone to use and contribute to. You can access all of
        the code and make any changes you want, and you can use it for personal use without any restrictions.
      </Text>
      <Text variant="bodyLarge">
        Our app is also ad-free, meaning you won't be bombarded with annoying pop-ups or advertisements while using it.
        This makes for a clean and seamless experience, and it also ensures your privacy is protected.
      </Text>
      <Text variant="bodyLarge">
        The only paid options we offer are customization options such as font and theme changes. This is to help support
        our ongoing development and maintenance of the app.
      </Text>
      <Text variant="bodyLarge">
        We hope you find our finance tracker app useful and that it helps you take control of your finances. If you have
        any questions or feedback, please don't hesitate to reach out to us.
      </Text>
      <Text variant="bodyLarge">
        We hope you find our finance tracker app useful and that it helps you take control of your finances. If you have
        any questions or feedback, please don't hesitate to reach out to us.
      </Text>
      <Text variant="bodyLarge">
        We hope you find our finance tracker app useful and that it helps you take control of your finances. If you have
        any questions or feedback, please don't hesitate to reach out to us.
      </Text>
      <Text variant="bodyLarge" style={{ marginBottom: 8 }}>
        We hope you find our finance tracker app useful and that it helps you take control of your finances. If you have
        any questions or feedback, please don't hesitate to reach out to us.
      </Text>
    </ScrollView>
  );
};
export default AboutScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 8,
  },
});
