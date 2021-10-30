import React from 'react';
import {StyleSheet, View, Image, TouchableNativeFeedback} from 'react-native';
import {Headline, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CategoryItem = ({item, onPress}) => {
  const handlePress = () => {
    onPress(item);
  };
  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Icon name="circle" size={30} color={item.color} />
        <View style={styles.textContainer}>
          <Headline category="h4">{item.category}</Headline>
          <Paragraph style={styles[item.type]}>{item.type}</Paragraph>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    marginHorizontal: 10,
  },
  income: {
    color: 'green',
  },
  expense: {
    color: 'red',
  },
  image: {
    width: 40,
    height: 40,
  },
});
