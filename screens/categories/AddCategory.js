import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Input, Button} from '@ui-kitten/components';

import TranslateText from '../../components/TranslateText';

import {useSelector, useDispatch} from 'react-redux';

const AddCategory = ({navigation}) => {
  const allCategories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');

  const addCategoryHandler = async () => {
    try {
      if (category === '') {
        Alert.alert('Error', 'Please enter a category');
        return;
      }
      if (allCategories.includes(category)) {
        Alert.alert('Error', 'Category already exists');
        return;
      }
      navigation.pop();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View>
      <Input
        value={category}
        onChangeText={text => setCategory(text)}
        label="Category"
        placeholder="Add a category"
      />
      <Button onPress={addCategoryHandler}>
        <TranslateText>add_category</TranslateText>
      </Button>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({});
