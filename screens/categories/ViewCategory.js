import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Headline, IconButton} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';

import {deleteCategoryFromDB} from '../../helpers/asyncFunctions';
import {deleteCategory} from '../../store/actions/categories';

const ViewCategory = ({navigation, route}) => {
  const {category} = route.params;
  const dispatch = useDispatch();

  const onDeleteCategory = async () => {
    try {
      //! uncomment the following line to delete the category from the database
      await deleteCategoryFromDB(category);
      dispatch(deleteCategory(category));
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      navigation.goBack();
    }
  };
  const handleDelete = () => {
    Alert.alert(
      'Delete',
      `Are you sure you want to delete ${category} category`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Delete', onPress: onDeleteCategory},
      ],
    );
  };

  return (
    <View>
      <Headline>{category}</Headline>
      <IconButton icon="delete" onPress={handleDelete} />
    </View>
  );
};

export default ViewCategory;

const styles = StyleSheet.create({});
