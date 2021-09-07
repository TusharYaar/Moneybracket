import {Icon} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
// import

const FloatingButton = props => {
  return (
    <View style={styles.button}>
      <TouchableNativeFeedback onPress={props.onPress}>
        <View style={styles.touchable}>
          <Icon
            name={props.icon}
            fill={props.color ? props.color : 'black'}
            style={styles.icon}
          />
          <Text>{props.children}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
    right: 20,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'orange',
  },
  touchable: {
    borderRadius: 30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
