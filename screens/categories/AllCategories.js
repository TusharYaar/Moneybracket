import React, {useState, useEffect} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';

import {useSelector, useDispatch} from 'react-redux';

import CategoryItem from '../../components/CategoryItem';
import TranslateText from '../../components/TranslateText';
import FloatingButton from '../../components/FloatingButton';

import {deleteCategoryFromDB} from '../../helpers/asyncFunctions';
import {deleteCategory} from '../../store/actions/categories';

const Filters = ['All', 'Income', 'Expense'];

const AllCategories = ({navigation}) => {
  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();
  const [filterIndex, setFilterIndex] = useState(new IndexPath(0));
  const [filteredCategories, setFilteredCategories] = useState(categories);
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
  useEffect(() => {
    switch (filterIndex.row) {
      case 0:
        setFilteredCategories(categories);
        break;
      case 1:
        setFilteredCategories(
          categories.filter(category => category.type === 'income'),
        );
        break;
      case 2:
        setFilteredCategories(
          categories.filter(category => category.type === 'expense'),
        );
        break;
    }
  }, [categories, filterIndex]);
  return (
    <View style={styles.screen}>
      <Select
        label="Filter"
        value={Filters[filterIndex.row]}
        selectedIndex={filterIndex}
        onSelect={index => setFilterIndex(index)}>
        {Filters.map(filter => (
          <SelectItem key={filter} title={filter} />
        ))}
      </Select>
      <FlatList
        data={filteredCategories}
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
        <TranslateText category="h6">add_category</TranslateText>
      </FloatingButton>
    </View>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
