import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import TranslateText from '../../components/TranslateText';

import DropDown from 'react-native-paper-dropdown';

import {useSelector, useDispatch} from 'react-redux';
const Filters = [
  {
    label: 'Income',
    value: 'income',
  },
  {
    label: 'Expense',
    value: 'expense',
  },
];

const AddCategory = ({navigation}) => {
  const allCategories = useSelector(state => state.categories.categories);
  console.log(allCategories);
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [type, setType] = useState('income');

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
      <TextInput
        value={category}
        onChangeText={text => setCategory(text)}
        label="Category"
        placeholder="Add a category"
      />
      <DropDown
        label="Type"
        mode="filled"
        visible={filterVisible}
        showDropDown={() => setFilterVisible(true)}
        onDismiss={() => setFilterVisible(false)}
        value={type}
        setValue={type => setType(type)}
        list={Filters}
      />
      <Button onPress={() => navigation.navigate('ChooseColor')}>
        Choose Color
      </Button>
      <Button onPress={addCategoryHandler}>
        <TranslateText>add_category</TranslateText>
      </Button>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({});
