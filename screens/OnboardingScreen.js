import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const OnboardingScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Onboarding Screen</Text>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
