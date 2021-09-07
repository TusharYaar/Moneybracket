import React from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {Button, List} from '@ui-kitten/components';

import {removeCategories} from '../../helpers/asyncFunctions';

import {useSelector, useDispatch} from 'react-redux';

import CategoryItem from '../../components/CategoryItem';
import TranslateText from '../../components/TranslateText';
import FloatingButton from '../../components/FloatingButton';

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
      <FlatList
        data={categories}
        style={styles.flatlist}
        keyExtractor={item => item.category}
        renderItem={item => (
          <CategoryItem
            item={item.item}
            onDelete={onDeleteCategory}
            onPress={handleEdit}
            showDelete={true}
          />
        )}
      />
      <FloatingButton
        onPress={() => navigation.navigate('AddCategory')}
        icon={'plus-outline'}>
        <TranslateText category="h6">add_transaction</TranslateText>
      </FloatingButton>
    </View>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  flatlist: {
    height: '100%',
  },
});
