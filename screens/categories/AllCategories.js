import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@ui-kitten/components';
import {removeCategories} from '../../helpers/asyncFunctions';
const AllCategories = () => {
  return (
    <View>
      <Text>All Categories</Text>
      <Button onPress={removeCategories}>Remove Categories</Button>
    </View>
  );
};

export default AllCategories;

const styles = StyleSheet.create({});
