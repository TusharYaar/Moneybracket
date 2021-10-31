import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import TranslateText from '../../components/TranslateText';

import DropDown from 'react-native-paper-dropdown';

import {addCategoryToDB} from '../../helpers/asyncFunctions';
import {addCategory} from '../../store/actions/categories';
import Category from '../../models/category';

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

const AddCategory = ({navigation, route}) => {
  const allCategories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [type, setType] = useState('income');

  useEffect(() => {
    if (route.params?.color) {
      setColor(route.params.color);
    }
  }, [route.params?.color]);

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
      const newCategory = new Category(category, color, type);
      await addCategoryToDB(newCategory);
      dispatch(addCategory(newCategory));
      navigation.pop();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const navigateToColor = () => {
    navigation.navigate('ChooseColor', {
      returnScreen: 'AddCategory',
      key: 'color',
    });
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
      <Button onPress={navigateToColor}>Choose Color</Button>
      <Button onPress={addCategoryHandler}>
        <TranslateText>add_category</TranslateText>
      </Button>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({});
