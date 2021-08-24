import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@ui-kitten/components';

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('AddTransaction')}>
        Button
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
