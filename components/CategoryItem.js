import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';
import {Text, Button} from '@ui-kitten/components';

const CategoryItem = ({item, onDelete, onPress, showDelete}) => {
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
  const handlePress = () => {
    onPress(item);
  };
  return (
    <TouchableNativeFeedback onPress={handlePress}>
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
        {showDelete && (
          <Button onPress={handleDelete} style={styles.margin}>
            Delete
          </Button>
        )}
      </View>
    </TouchableNativeFeedback>
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
