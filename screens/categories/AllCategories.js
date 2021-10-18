import React, {useState, useEffect} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';

import {useSelector, useDispatch} from 'react-redux';

import CategoryItem from '../../components/CategoryItem';
import TranslateText from '../../components/TranslateText';
import FloatingButton from '../../components/FloatingButton';

const Filters = ['All', 'Income', 'Expense'];

const AllCategories = ({navigation}) => {
  const categories = useSelector(state => state.categories.categories);

  const [filterIndex, setFilterIndex] = useState(new IndexPath(0));
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const handleEdit = categoryItem => {
    navigation.navigate('ViewCategory', {...categoryItem});
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
          <CategoryItem item={item.item} onPress={handleEdit} />
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
