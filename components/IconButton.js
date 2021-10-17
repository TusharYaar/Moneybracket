// expects a onPress function
// and icon name
// fill color is optional and dafault is black
// also accepts optional style object

import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';

import {Icon} from '@ui-kitten/components';

const IconButton = props => {
  const TouchComp =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <View style={styles.container}>
      <TouchComp onPress={props.onPress}>
        <View>
          <Icon
            style={[styles.icon, props.style]}
            fill={props.color ? props.color : 'black'}
            name={props.name}
          />
        </View>
      </TouchComp>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  icon: {
    margin: 2,
    height: 24,
    width: 24,
  },
});
