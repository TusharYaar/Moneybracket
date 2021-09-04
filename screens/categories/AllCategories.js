import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Button, List} from '@ui-kitten/components';

import {removeCategories} from '../../helpers/asyncFunctions';

import {useSelector, useDispatch} from 'react-redux';

import CategoryItem from '../../components/CategoryItem';
import TranslateText from '../../components/TranslateText';

import {deleteCategoryFromDB} from '../../helpers/asyncFunctions';
import {deleteCategory} from '../../store/actions/categories';

const AllCategories = ({navigation}) => {
  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();
  const onDeleteCategory = async category => {
    try {
      await deleteCategoryFromDB(category);
      dispatch(deleteCategory(category));
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };
  const handleEdit = categoryItem => {
    navigation.navigate('EditCategory', {category: categoryItem});
  };
  return (
    <View>
      <Text>All Categories</Text>
      <List
        data={categories}
        keyExtractor={item => item.category}
        renderItem={item => (
          <CategoryItem
            item={item.item}
            onDelete={onDeleteCategory}
            onEdit={handleEdit}
          />
        )}
      />
    </View>
  );
};

export default AllCategories;

const styles = StyleSheet.create({});
