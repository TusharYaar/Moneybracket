import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {withTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';

import CategoryItem from '../../components/CategoryItem';
import FloatingButton from '../../components/FloatingButton';

import DropDown from 'react-native-paper-dropdown';

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

const AllCategories = ({navigation, theme}) => {
  const {colors} = theme;
  console.log(colors);
  const categories = useSelector(state => state.categories.categories);

  const [filters, setFilters] = useState('income,expense');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleEdit = categoryItem => {
    navigation.navigate('ViewCategory', {...categoryItem});
  };

  useEffect(() => {
    const appliedFilters = filters.split(',');
    setFilteredCategories(
      categories.filter(category => appliedFilters.includes(category.type)),
    );
  }, [categories, filters]);
  return (
    <View style={[styles.screen, {backgroundColor: colors.background}]}>
      <DropDown
        label="Type"
        mode="filled"
        visible={filterVisible}
        showDropDown={() => setFilterVisible(true)}
        onDismiss={() => setFilterVisible(false)}
        value={filters}
        setValue={setFilters}
        list={Filters}
        multiSelect
      />
      <FlatList
        data={filteredCategories}
        keyExtractor={item => item.category}
        renderItem={item => (
          <CategoryItem item={item.item} onPress={handleEdit} />
        )}
      />
      <FloatingButton
        onPress={() => navigation.navigate('AddCategory')}
        label="add_category"
      />
    </View>
  );
};

export default withTheme(AllCategories);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
});
