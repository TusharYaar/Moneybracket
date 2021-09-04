import React from 'react';
import {StyleSheet, View, Image, Alert} from 'react-native';
import {Text, Button} from '@ui-kitten/components';

import IconButton from './IconButton';
const CategoryItem = ({item, onDelete, onEdit}) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete',
      `Are you sure you want to delete ${item.category}  category`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => onDelete(item.category)},
      ],
    );
  };
  const handleEdit = () => {
    onEdit(item);
  };
  return (
    <View style={styles.item}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: item.imageUri}} />
        <View style={styles.textContainer}>
          <Text style={styles[item.type]} category="c1">
            {item.type}
          </Text>
          <Text category="h4">{item.category}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Button onPress={handleEdit} style={styles.margin}>
          Edit
        </Button>
        <IconButton
          name="trash-2-outline"
          onPress={handleDelete}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: 10,
  },
  margin: {
    marginHorizontal: 10,
  },
  income: {
    color: 'green',
  },
  expense: {
    color: 'red',
  },
  icon: {
    margin: 0,
    padding: 0,
  },
  image: {
    width: 40,
    height: 40,
  },
});
