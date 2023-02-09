import React from "react";

import { View, StyleSheet } from "react-native";

import { Text } from "react-native-paper";

const AboutScreen = () => {
  return (
    <View style={styles.screen}>
      <Text variant="titleLarge">About The App</Text>
      <Text>
        The project is open-source, i.e. entire code of the app is avalible on Github for free. Anyone can have a look
        at it, and make your own app. All the features of the app are free to use.
      </Text>

      <Text variant="titleLarge">About The Developer</Text>
      <Text>Hello, my name is Tushar S Agrawal. 4th Year Student.</Text>
    </View>
  );
};
export default AboutScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 8,
  },
});
